const EventRouter = require("express").Router();
const { eventUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/EventController");

EventRouter.post("", verifyAdmin, eventUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.featuredImage?.[0] || req.files.bannerImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

EventRouter.get("", getRecord);
EventRouter.get("/:_id", getSingleRecord);

EventRouter.put("/:_id", verifyAdmin, eventUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.featuredImage?.[0] || req.files.bannerImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

EventRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = EventRouter;
