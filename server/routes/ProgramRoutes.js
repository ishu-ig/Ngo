const ProgramRouter = require("express").Router();
const { programUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/ProgramController");

ProgramRouter.post("", verifyAdmin, programUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files && req.files.pic) {
        req.file = req.files.pic[0];
    }
    next();
}, createRecord);

ProgramRouter.get("", getRecord);
ProgramRouter.get("/:_id", getSingleRecord);

ProgramRouter.put("/:_id", verifyAdmin, programUploader.fields([{ name: "featuredImage", maxCount: 1 }, { name: "galleryImages", maxCount: 10 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files && req.files.pic) {
        req.file = req.files.pic[0];
    }
    next();
}, updateRecord);

ProgramRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = ProgramRouter;
