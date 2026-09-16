const ContactMessageRouter = require("express").Router();
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/ContactMessageController");

// Public can submit contact messages
ContactMessageRouter.post("", createRecord);
// Admin can view, update status, and delete messages
ContactMessageRouter.get("", verifyAdmin, getRecord);
ContactMessageRouter.get("/:_id", verifyAdmin, getSingleRecord);
ContactMessageRouter.put("/:_id", verifyAdmin, updateRecord);
ContactMessageRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = ContactMessageRouter;
