const AboutRouter = require("express").Router();
const { aboutUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/AboutController");

AboutRouter.post("", verifyAdmin, aboutUploader.fields([{ name: "logo", maxCount: 1 }, { name: "aboutImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), createRecord);
AboutRouter.get("", getRecord);
AboutRouter.get("/:_id", getSingleRecord);
AboutRouter.put("/:_id", verifyAdmin, aboutUploader.fields([{ name: "logo", maxCount: 1 }, { name: "aboutImage", maxCount: 1 }, { name: "pic", maxCount: 1 }]), updateRecord);
AboutRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = AboutRouter;
