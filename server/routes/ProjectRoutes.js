const ProjectRouter = require("express").Router();
const { projectUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/ProjectController");

ProjectRouter.post("", verifyAdmin, projectUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files && req.files.pic) {
        req.file = req.files.pic[0];
    }
    next();
}, createRecord);

ProjectRouter.get("", getRecord);
ProjectRouter.get("/:_id", getSingleRecord);

ProjectRouter.put("/:_id", verifyAdmin, projectUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files && req.files.pic) {
        req.file = req.files.pic[0];
    }
    next();
}, updateRecord);

ProjectRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = ProjectRouter;
