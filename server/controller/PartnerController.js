const Partner = require("../models/Partner");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        let data = new Partner(req.body);

        if (req.file) {
            data.logo = req.file.path;
        }

        if (req.body.contactPerson && typeof req.body.contactPerson === "string") {
            try {
                data.contactPerson = JSON.parse(req.body.contactPerson);
            } catch (e) {}
        }

        await data.save();
        res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        if (req.file) await deleteFromCloudinary(req.file.path);

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Partner with this ${key} already exists`;
        }
        if (error.errors) {
            Object.keys(error.errors).forEach((key) => {
                errorMessage[key] = error.errors[key].message;
            });
        }

        if (Object.values(errorMessage).length === 0) {
            res.status(500).send({
                result: "Fail",
                reason: "Internal Server Error"
            });
        } else {
            res.status(400).send({
                result: "Fail",
                reason: errorMessage
            });
        }
    }
}

async function getRecord(req, res) {
    try {
        let data = await Partner.find().sort({ _id: -1 });
        res.send({
            result: "Done",
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Partner.findOne({ _id: req.params._id });
        if (data) {
            res.send({
                result: "Done",
                data: data
            });
        } else {
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function updateRecord(req, res) {
    try {
        let data = await Partner.findById(req.params._id);

        if (!data) {
            if (req.file) await deleteFromCloudinary(req.file.path);
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldPic = data.logo;

        data.organizationName = req.body.organizationName ?? data.organizationName;
        data.website = req.body.website ?? data.website;
        data.description = req.body.description ?? data.description;
        data.partnerType = req.body.partnerType ?? data.partnerType;
        data.isActive = req.body.isActive !== undefined ? req.body.isActive : data.isActive;

        if (req.body.contactPerson) {
            let cp = req.body.contactPerson;
            if (typeof cp === "string") {
                try {
                    cp = JSON.parse(cp);
                } catch (e) {}
            }
            data.contactPerson = {
                name: cp.name ?? data.contactPerson?.name,
                email: cp.email ?? data.contactPerson?.email,
                phone: cp.phone ?? data.contactPerson?.phone
            };
        }

        if (req.file) {
            data.logo = req.file.path;
        }

        await data.save();

        if (req.file && oldPic) {
            await deleteFromCloudinary(oldPic);
        }

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        if (req.file) {
            await deleteFromCloudinary(req.file.path);
        }

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Partner with this ${key} already exists`;
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
        let data = await Partner.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.logo) {
            await deleteFromCloudinary(data.logo);
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
    deleteRecord: deleteRecord
};
