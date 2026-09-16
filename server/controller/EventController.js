const Event = require("../models/Event");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        let data = new Event(req.body);

        if (req.file) {
            data.featuredImage = req.file.path;
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
            errorMessage[key] = `Event with this ${key} already exists`;
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
        let data = await Event.find().sort({ _id: -1 });
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

        let data = await Event.findOne(query);
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
        let data = await Event.findById(req.params._id);

        if (!data) {
            if (req.file) await deleteFromCloudinary(req.file.path);
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldPic = data.featuredImage;

        data.title = req.body.title ?? data.title;
        data.slug = req.body.slug ?? data.slug;
        data.description = req.body.description ?? data.description;
        data.eventDate = req.body.eventDate ?? data.eventDate;
        data.startTime = req.body.startTime ?? data.startTime;
        data.endTime = req.body.endTime ?? data.endTime;
        data.venue = req.body.venue ?? data.venue;
        data.location = req.body.location ?? data.location;
        data.organizer = req.body.organizer ?? data.organizer;
        data.registrationRequired = req.body.registrationRequired !== undefined ? req.body.registrationRequired : data.registrationRequired;
        data.registrationDeadline = req.body.registrationDeadline ?? data.registrationDeadline;
        data.maxParticipants = req.body.maxParticipants !== undefined ? req.body.maxParticipants : data.maxParticipants;
        data.registeredCount = req.body.registeredCount !== undefined ? req.body.registeredCount : data.registeredCount;
        data.status = req.body.status ?? data.status;
        data.isActive = req.body.isActive !== undefined ? req.body.isActive : data.isActive;

        if (req.file) {
            data.featuredImage = req.file.path;
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
            errorMessage[key] = `Event with this ${key} already exists`;
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
        let data = await Event.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.featuredImage) {
            await deleteFromCloudinary(data.featuredImage);
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
