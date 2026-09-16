const UserRouter = require("express").Router();
const { userUploader } = require("../middleware/fileuploader");
const { verifyAdmin, verifyUser } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    login,
    forgetPassword1,
    forgetPassword2,
    forgetPassword3,
    checkEmail,
    checkUsername,
    otpSend,
    validateOtp
} = require("../controller/UserController");

// Auth & Password routes
UserRouter.post("/login", login);
UserRouter.post("/forgetPassword-1", forgetPassword1);
UserRouter.post("/forgetPassword-2", forgetPassword2);
UserRouter.post("/forgetPassword-3", forgetPassword3);
UserRouter.get("/check-email", checkEmail);
UserRouter.get("/check-username", checkUsername);
UserRouter.post("/otp-send", otpSend);
UserRouter.post("/validate-otp", validateOtp);

// User CRUD
UserRouter.post("", userUploader.fields([{ name: "profilePicture", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.profilePicture?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

UserRouter.get("", verifyAdmin, getRecord);
UserRouter.get("/:_id", verifyUser, getSingleRecord);

UserRouter.put("/:_id", verifyUser, userUploader.fields([{ name: "profilePicture", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.profilePicture?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

UserRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = UserRouter;
