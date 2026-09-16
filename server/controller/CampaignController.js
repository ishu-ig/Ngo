const Campaign = require("../models/Campaign");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        let data = new Campaign(req.body);

        if (req.file) {
            data.image = req.file.path;
        }

        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
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
            errorMessage[key] = `Campaign with this ${key} already exists`;
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
        let data = await Campaign.find()
            .populate("project", "title category status")
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
        let query = {};
        if (req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: req.params._id };
        } else {
            query = { slug: req.params._id };
        }

        let data = await Campaign.findOne(query).populate("project", "title category status");
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
        let data = await Campaign.findById(req.params._id);

        if (!data) {
            if (req.file) await deleteFromCloudinary(req.file.path);
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldPic = data.image;

        data.title = req.body.title ?? data.title;
        data.slug = req.body.slug ?? data.slug;
        data.description = req.body.description ?? data.description;
        data.project = req.body.project !== undefined ? req.body.project : data.project;
        data.targetAmount = req.body.targetAmount !== undefined ? req.body.targetAmount : data.targetAmount;
        data.collectedAmount = req.body.collectedAmount !== undefined ? req.body.collectedAmount : data.collectedAmount;
        data.startDate = req.body.startDate ?? data.startDate;
        data.endDate = req.body.endDate ?? data.endDate;
        data.status = req.body.status ?? data.status;
        data.featured = req.body.featured !== undefined ? req.body.featured : data.featured;
        data.isActive = req.body.isActive !== undefined ? req.body.isActive : data.isActive;

        if (req.file) {
            data.image = req.file.path;
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
            errorMessage[key] = `Campaign with this ${key} already exists`;
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
        let data = await Campaign.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.image) {
            await deleteFromCloudinary(data.image);
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
