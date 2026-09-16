const GalleryRouter = require("express").Router();
const { galleryUploader } = require("../middleware/fileuploader");
const { verifyAdmin } = require("../middleware/authorization");
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controller/GalleryController");

GalleryRouter.post("", verifyAdmin, galleryUploader.fields([{ name: "mediaUrl", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.mediaUrl?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, createRecord);

GalleryRouter.get("", getRecord);
GalleryRouter.get("/:_id", getSingleRecord);

GalleryRouter.put("/:_id", verifyAdmin, galleryUploader.fields([{ name: "mediaUrl", maxCount: 1 }, { name: "pic", maxCount: 1 }]), (req, res, next) => {
    if (!req.file && req.files) {
        req.file = req.files.mediaUrl?.[0] || req.files.pic?.[0] || (Array.isArray(req.files) ? req.files[0] : null);
    }
    next();
}, updateRecord);

GalleryRouter.delete("/:_id", verifyAdmin, deleteRecord);

module.exports = GalleryRouter;
