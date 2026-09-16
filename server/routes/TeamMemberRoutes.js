const TeamMemberRouter = require("express").Router();
const { teamMemberUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/TeamMemberController");

TeamMemberRouter.post("", verifyAdmin, teamMemberUploader.fields([{ name: "profileImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.profileImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

TeamMemberRouter.get("", getRecord);
TeamMemberRouter.get("/:_id", getSingleRecord);

TeamMemberRouter.put("/:_id", verifyAdmin, teamMemberUploader.fields([{ name: "profileImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.profileImage?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

TeamMemberRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = TeamMemberRouter;
