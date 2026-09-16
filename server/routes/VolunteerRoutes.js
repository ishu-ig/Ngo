const VolunteerRouter = require("express").Router();
const { volunteerUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/VolunteerController");

// Public registration for volunteers
VolunteerRouter.post("", volunteerUploader.fields([{ name: "resume", maxCount: 1 }, { name: "profileImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), createRecord);

// Volunteers listing & review
VolunteerRouter.get("", getRecord);
VolunteerRouter.get("/:_id", verifyAdmin, getSingleRecord);
VolunteerRouter.put("/:_id", verifyAdmin, volunteerUploader.fields([{ name: "resume", maxCount: 1 }, { name: "profileImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), updateRecord);
VolunteerRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = VolunteerRouter;
