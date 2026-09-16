const DonationRouter = require("express").Router()

const { verifyAdmin } = require("../middleware/authorization")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    donation,
    verifyDonation
} = require("../controller/DonationController")

DonationRouter.post("", createRecord)
DonationRouter.get("", getRecord)
DonationRouter.get("/:_id", getSingleRecord)
DonationRouter.put("/:_id", verifyAdmin, updateRecord)
DonationRouter.delete("/:_id", verifyAdmin, deleteRecord)
DonationRouter.post("/donation", donation)
DonationRouter.post("/verify", verifyDonation)

module.exports = DonationRouter