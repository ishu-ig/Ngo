const PartnerRouter = require("express").Router();
const { partnerUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/PartnerController");

PartnerRouter.post("", partnerUploader.fields([{ name: "logo", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.logo?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

PartnerRouter.get("", getRecord);
PartnerRouter.get("/:_id", getSingleRecord);

PartnerRouter.put("/:_id", verifyAdmin, partnerUploader.fields([{ name: "logo", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.logo?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

PartnerRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = PartnerRouter;
