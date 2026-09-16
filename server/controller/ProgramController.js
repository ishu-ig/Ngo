const Program = require("../models/Program");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        let data = new Program(req.body);

        if (req.files) {
            if (req.files.featuredImage && req.files.featuredImage[0]) {
                data.featuredImage = req.files.featuredImage[0].path;
            }
            if (req.files.galleryImages) {
                data.galleryImages = req.files.galleryImages.map((f) => f.path);
            }
        } else if (req.file) {
            data.featuredImage = req.file.path;
        }

        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
        }

        if (req.body.beneficiaries && typeof req.body.beneficiaries === "string") {
            try {
                data.beneficiaries = JSON.parse(req.body.beneficiaries);
            } catch (e) {}
        }

        await data.save();
        res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        if (req.files) {
            if (req.files.featuredImage && req.files.featuredImage[0]) {
                await deleteFromCloudinary(req.files.featuredImage[0].path);
            }
            if (req.files.galleryImages) {
                for (let f of req.files.galleryImages) {
                    await deleteFromCloudinary(f.path);
                }
            }
        } else if (req.file) {
            await deleteFromCloudinary(req.file.path);
        }

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Program with this ${key} already exists`;
        }
        if (error.errors) {
            Object.keys(error.errors).forEach((key) => {
                errorMessage[key] = error.errors[key].message;
            });
        }

        if (Object.values(errorMessage).length === 0) {
            res.status(500).send({
                result: "Fail",
                reason: "Internal Server Error"
            });
        } else {
            res.status(400).send({
                result: "Fail",
                reason: errorMessage
            });
        }
    }
}

async function getRecord(req, res) {
    try {
        let data = await Program.find().sort({ _id: -1 });
        res.send({
            result: "Done",
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function getSingleRecord(req, res) {
    try {
        let query = {};
        if (req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: req.params._id };
        } else {
            query = { slug: req.params._id };
        }

        let data = await Program.findOne(query);
        if (data) {
            res.send({
                result: "Done",
                data: data
            });
        } else {
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function updateRecord(req, res) {
    let newFeaturedImagePath = null;
    let newGalleryImagePaths = [];

    try {
        let data = await Program.findById(req.params._id);

        if (!data) {
            if (req.files) {
                if (req.files.featuredImage && req.files.featuredImage[0]) {
                    await deleteFromCloudinary(req.files.featuredImage[0].path);
                }
                if (req.files.galleryImages) {
                    for (let f of req.files.galleryImages) {
                        await deleteFromCloudinary(f.path);
                    }
                }
            } else if (req.file) {
                await deleteFromCloudinary(req.file.path);
            }
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldFeaturedImage = data.featuredImage;

        data.title = req.body.title ?? data.title;
        data.slug = req.body.slug ?? data.slug;
        data.shortDescription = req.body.shortDescription ?? data.shortDescription;
        data.fullDescription = req.body.fullDescription ?? data.fullDescription;
        data.category = req.body.category ?? data.category;
        data.location = req.body.location ?? data.location;
        data.startDate = req.body.startDate ?? data.startDate;
        data.endDate = req.body.endDate !== undefined ? req.body.endDate : data.endDate;
        data.status = req.body.status ?? data.status;
        data.isActive = req.body.isActive !== undefined ? req.body.isActive : data.isActive;

        if (req.body.beneficiaries) {
            let ben = req.body.beneficiaries;
            if (typeof ben === "string") {
                try {
                    ben = JSON.parse(ben);
                } catch (e) {}
            }
            data.beneficiaries = {
                count: ben.count !== undefined ? ben.count : data.beneficiaries?.count,
                targetGroup: ben.targetGroup ?? data.beneficiaries?.targetGroup
            };
        }

        if (req.files) {
            if (req.files.featuredImage && req.files.featuredImage[0]) {
                newFeaturedImagePath = req.files.featuredImage[0].path;
                data.featuredImage = newFeaturedImagePath;
            }
            if (req.files.galleryImages && req.files.galleryImages.length > 0) {
                newGalleryImagePaths = req.files.galleryImages.map((f) => f.path);
                data.galleryImages = [...(data.galleryImages || []), ...newGalleryImagePaths];
            }
        } else if (req.file) {
            newFeaturedImagePath = req.file.path;
            data.featuredImage = newFeaturedImagePath;
        }

        await data.save();

        if (newFeaturedImagePath && oldFeaturedImage) {
            await deleteFromCloudinary(oldFeaturedImage);
        }

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        if (newFeaturedImagePath) await deleteFromCloudinary(newFeaturedImagePath);
        if (newGalleryImagePaths.length > 0) {
            for (let img of newGalleryImagePaths) {
                await deleteFromCloudinary(img);
            }
        }
        if (req.file) await deleteFromCloudinary(req.file.path);

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Program with this ${key} already exists`;
        }
        if (error.errors) {
            Object.keys(error.errors).forEach((key) => {
                errorMessage[key] = error.errors[key].message;
            });
        }

        res.status(Object.keys(errorMessage).length ? 400 : 500).send({
            result: "Fail",
            reason: Object.keys(errorMessage).length ? errorMessage : "Internal Server Error"
        });
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Program.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.featuredImage) {
            await deleteFromCloudinary(data.featuredImage);
        }
        if (data.galleryImages && data.galleryImages.length > 0) {
            for (let img of data.galleryImages) {
                await deleteFromCloudinary(img);
            }
        }

        await data.deleteOne();

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
};
