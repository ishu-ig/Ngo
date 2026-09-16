const BlogRouter = require("express").Router();
const { blogUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    updateRecord,
    getSingleRecord,
    deleteRecord
} = require("../controller/BlogController");

BlogRouter.post("", verifyAdmin, blogUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.featuredImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

BlogRouter.get("", getRecord);
BlogRouter.get("/:_id", getSingleRecord);

BlogRouter.put("/:_id", verifyAdmin, blogUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.featuredImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

BlogRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = BlogRouter;