const ContactMessage = require("../models/ContactMessage");

async function createRecord(req, res) {
    try {
        let data = new ContactMessage(req.body);
        await data.save();
        res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Contact message with this ${key} already exists`;
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
        let data = await ContactMessage.find()
            .populate("adminReply.repliedBy", "name email")
            .sort({ _id: -1 });

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
        let data = await ContactMessage.findOne({ _id: req.params._id })
            .populate("adminReply.repliedBy", "name email");

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
        let data = await ContactMessage.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        data.name = req.body.name ?? data.name;
        data.email = req.body.email ?? data.email;
        data.phone = req.body.phone ?? data.phone;
        data.subject = req.body.subject ?? data.subject;
        data.message = req.body.message ?? data.message;
        data.status = req.body.status ?? data.status;

        if (req.body.adminReply) {
            data.adminReply = {
                repliedBy: req.body.adminReply.repliedBy ?? data.adminReply?.repliedBy,
                replyMessage: req.body.adminReply.replyMessage ?? data.adminReply?.replyMessage,
                repliedAt: req.body.adminReply.repliedAt ?? new Date()
            };
        }

        await data.save();

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Contact message with this ${key} already exists`;
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
        let data = await ContactMessage.findById(req.params._id);

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
    deleteRecord: deleteRecord
};
