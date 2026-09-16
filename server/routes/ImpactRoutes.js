const ImpactRouter = require("express").Router();
const { impactUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/ImpactController");

ImpactRouter.post("", verifyAdmin, impactUploader.fields([{ name: "icon", maxCount: 1 }, { name: "image", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.icon?.[0] || req.files.image?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

ImpactRouter.get("", getRecord);
ImpactRouter.get("/:_id", getSingleRecord);

ImpactRouter.put("/:_id", verifyAdmin, impactUploader.fields([{ name: "icon", maxCount: 1 }, { name: "image", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.icon?.[0] || req.files.image?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

ImpactRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = ImpactRouter;
