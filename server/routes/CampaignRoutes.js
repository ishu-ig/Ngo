const CampaignRouter = require("express").Router();
const { campaignUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/CampaignController");

CampaignRouter.post("", verifyAdmin, campaignUploader.fields([{ name: "image", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.image?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

CampaignRouter.get("", getRecord);
CampaignRouter.get("/:_id", getSingleRecord);

CampaignRouter.put("/:_id", verifyAdmin, campaignUploader.fields([{ name: "image", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.image?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

CampaignRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = CampaignRouter;
