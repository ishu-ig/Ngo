const FAQRouter = require("express").Router();
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/FAQController");

FAQRouter.post("", verifyAdmin, createRecord);
FAQRouter.get("", getRecord);
FAQRouter.get("/:_id", getSingleRecord);
FAQRouter.put("/:_id", verifyAdmin, updateRecord);
FAQRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = FAQRouter;
