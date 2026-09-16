const Gallery = require("../models/Gallery");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        let data = new Gallery(req.body);

        if (req.file) {
            data.mediaUrl = req.file.path;
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
            errorMessage[key] = `Gallery with this ${key} already exists`;
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
        let data = await Gallery.find()
            .populate("event", "title eventDate")
            .populate("project", "title category")
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
        let data = await Gallery.findOne({ _id: req.params._id })
            .populate("event", "title eventDate")
            .populate("project", "title category");

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
        let data = await Gallery.findById(req.params._id);

        if (!data) {
            if (req.file) await deleteFromCloudinary(req.file.path);
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldPic = data.mediaUrl;

        data.title = req.body.title ?? data.title;
        data.description = req.body.description ?? data.description;
        data.mediaType = req.body.mediaType ?? data.mediaType;
        data.category = req.body.category ?? data.category;
        data.event = req.body.event !== undefined ? req.body.event : data.event;
        data.project = req.body.project !== undefined ? req.body.project : data.project;
        data.isActive = req.body.isActive !== undefined ? req.body.isActive : data.isActive;

        if (req.file) {
            data.mediaUrl = req.file.path;
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
            errorMessage[key] = `Gallery with this ${key} already exists`;
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
        let data = await Gallery.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.mediaUrl) {
            await deleteFromCloudinary(data.mediaUrl);
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
