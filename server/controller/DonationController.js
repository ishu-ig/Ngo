const Donation = require("../models/Donation");
const Razorpay = require("razorpay");

async function donation(req, res) {
    try {
        const instance = new Razorpay({
            key_id: process.env.RPKEYID || "rzp_test_hPWsSLPsp2DADQ",
            key_secret: process.env.RPSECRETKEY || "test_secret",
        });

        const options = {
            amount: Math.round(Number(req.body.amount || 100) * 100),
            currency: req.body.currency || "INR"
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log("Razorpay Order Create Error:", error);
                return res.status(500).json({ message: "Something Went Wrong!", error });
            }
            res.json({ data: order });
        });
    } catch (error) {
        console.log("Donation Controller Error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

// In verifyDonation — after payment success, update status to completed
async function verifyDonation(req, res) {
    try {
        var check = await Donation.findOne({ _id: req.body.checkid });
        if (!check) {
            return res.status(404).json({ message: "Donation record not found!" });
        }

        // Verify Razorpay signature if secret is configured
        const crypto = require("crypto");
        const secret = process.env.RPSECRETKEY;

        if (secret) {
            const generated_signature = crypto
                .createHmac("sha256", secret)
                .update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id)
                .digest("hex");

            if (generated_signature !== req.body.razorpay_signature) {
                // Payment failed
                check.paymentStatus = "failed";
                await check.save();
                return res.status(400).json({ result: "Fail", message: "Payment verification failed!" });
            }
        }

        // Payment success
        check.rppid = req.body.razorpay_payment_id;
        check.paymentId = req.body.razorpay_payment_id;
        check.orderId = req.body.razorpay_order_id;
        check.paymentStatus = "completed";
        check.paymentMethod = "Razorpay";
        await check.save();

        res.send({ result: "Done", message: "Payment Successful", data: check });

    } catch (error) {
        console.log("Verify Donation Error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
async function createRecord(req, res) {
    try {
        const mongoose = require("mongoose");
        const payload = { ...req.body };

        if (!payload.donorName && payload.name) {
            payload.donorName = payload.name;
        }
        if (!payload.email && payload.donorEmail) {
            payload.email = payload.donorEmail;
        }
        if (!payload.phone && payload.donorPhone) {
            payload.phone = payload.donorPhone;
        }
        if (!payload.cause && payload.message) {
            payload.cause = payload.message;
        }
        if (payload.campaign && !mongoose.Types.ObjectId.isValid(payload.campaign)) {
            if (!payload.cause) payload.cause = String(payload.campaign);
            delete payload.campaign;
        }

        let data = new Donation(payload);
        await data.save();
        return res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        console.log("Create Donation Error:", error);
        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Donation with this ${key} already exists`;
        }
        if (error.errors) {
            Object.keys(error.errors).forEach((key) => {
                errorMessage[key] = error.errors[key].message;
            });
        }

        if (Object.values(errorMessage).length === 0) {
            return res.status(500).send({
                result: "Fail",
                reason: "Internal Server Error"
            });
        } else {
            return res.status(400).send({
                result: "Fail",
                reason: errorMessage
            });
        }
    }
}

async function getRecord(req, res) {
    try {
        let data = await Donation.find()
            .populate("campaign", "title targetAmount collectedAmount")
            .sort({ _id: -1 });

        return res.send({
            result: "Done",
            count: data.length,
            data: data
        });
    } catch (error) {
        console.log("Get Donations Error:", error);
        return res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function getSingleRecord(req, res) {
    try {
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(404).send({
                result: "Fail",
                reason: "Invalid Donation Id"
            });
        }

        let data = await Donation.findOne({ _id: req.params._id })
            .populate("campaign", "title targetAmount collectedAmount");

        if (data) {
            return res.send({
                result: "Done",
                data: data
            });
        } else {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        console.log("Get Single Donation Error:", error);
        return res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function updateRecord(req, res) {
    try {
        let data = await Donation.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        data.donorName = req.body.donorName ?? data.donorName;
        data.email = req.body.email ?? data.email;
        data.phone = req.body.phone ?? data.phone;
        data.amount = req.body.amount !== undefined ? req.body.amount : data.amount;
        data.currency = req.body.currency ?? data.currency;
        data.paymentId = req.body.paymentId ?? data.paymentId;
        data.transactionId = req.body.transactionId ?? data.transactionId;
        data.orderId = req.body.orderId ?? data.orderId;
        data.paymentStatus = req.body.paymentStatus ?? data.paymentStatus;
        data.paymentMethod = req.body.paymentMethod ?? data.paymentMethod;
        if (req.body.campaign !== undefined) {
            const mongoose = require("mongoose");
            if (mongoose.Types.ObjectId.isValid(req.body.campaign)) {
                data.campaign = req.body.campaign;
            } else if (!req.body.campaign) {
                data.campaign = null;
            } else {
                data.cause = String(req.body.campaign);
            }
        }
        if (req.body.cause !== undefined) data.cause = req.body.cause;
        if (req.body.frequency !== undefined) data.frequency = req.body.frequency;
        if (req.body.taxReceiptRequired !== undefined) data.taxReceiptRequired = req.body.taxReceiptRequired;
        if (req.body.panOrTaxId !== undefined) data.panOrTaxId = req.body.panOrTaxId;
        data.isAnonymous = req.body.isAnonymous !== undefined ? req.body.isAnonymous : data.isAnonymous;
        data.panNumber = req.body.panNumber ?? data.panNumber;
        data.address = req.body.address ?? data.address;
        data.message = req.body.message ?? data.message;
        data.donationDate = req.body.donationDate ?? data.donationDate;

        await data.save();

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Donation with this ${key} already exists`;
        }
        if (error.errors) {
            Object.keys(error.errors).forEach((key) => {
                errorMessage[key] = error.errors[key].message;
            });
        }

        res.status(Object.keys(errorMessage).length ? 400 : 500).send({
            result: "Fail",
            reason: Object.keys(errorMessage).length ? errorMessage : "Internal Server Error"
        });
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Donation.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        await data.deleteOne();

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    donation: donation,
    verifyDonation: verifyDonation
};
