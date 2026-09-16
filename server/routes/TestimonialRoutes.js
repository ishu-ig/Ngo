const TestimonialRouter = require("express").Router();
const { testimonialUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/TestimonialController");

TestimonialRouter.post("", verifyAdmin, testimonialUploader.fields([{ name: "profileImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.profileImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

TestimonialRouter.get("", getRecord);
TestimonialRouter.get("/:_id", getSingleRecord);

TestimonialRouter.put("/:_id", verifyAdmin, testimonialUploader.fields([{ name: "profileImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.profileImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

TestimonialRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = TestimonialRouter;
