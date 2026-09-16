const About = require("../models/About");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        if (req.body.address && typeof req.body.address === "string") {
            try {
                req.body.address = JSON.parse(req.body.address);
            } catch (e) {}
        }

        let data = new About(req.body);

        if (req.files) {
            if (req.files.logo && req.files.logo[0]) {
                data.logo = req.files.logo[0].path;
            }
            if (req.files.aboutImage && req.files.aboutImage[0]) {
                data.aboutImage = req.files.aboutImage[0].path;
            }
        } else if (req.file) {
            if (req.body.fileType === "logo") {
                data.logo = req.file.path;
            } else {
                data.aboutImage = req.file.path;
            }
        }

        await data.save();
        res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        if (req.files) {
            if (req.files.logo && req.files.logo[0]) await deleteFromCloudinary(req.files.logo[0].path);
            if (req.files.aboutImage && req.files.aboutImage[0]) await deleteFromCloudinary(req.files.aboutImage[0].path);
        } else if (req.file) {
            await deleteFromCloudinary(req.file.path);
        }

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `About with this ${key} already exists`;
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
        let data = await About.find().sort({ _id: -1 });
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
        let data = await About.findOne({ _id: req.params._id });
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
    let newLogoPath = null;
    let newAboutImagePath = null;

    try {
        let data = await About.findById(req.params._id);

        if (!data) {
            if (req.files) {
                if (req.files.logo && req.files.logo[0]) await deleteFromCloudinary(req.files.logo[0].path);
                if (req.files.aboutImage && req.files.aboutImage[0]) await deleteFromCloudinary(req.files.aboutImage[0].path);
            } else if (req.file) {
                await deleteFromCloudinary(req.file.path);
            }
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldLogo = data.logo;
        const oldAboutImage = data.aboutImage;

        data.ngoName = req.body.ngoName ?? data.ngoName;
        data.tagline = req.body.tagline ?? data.tagline;
        data.description = req.body.description ?? data.description;
        data.mission = req.body.mission ?? data.mission;
        data.vision = req.body.vision ?? data.vision;
        data.objectives = req.body.objectives ?? data.objectives;
        data.establishedYear = req.body.establishedYear ?? data.establishedYear;
        if (req.body.address) {
            let addr = req.body.address;
            if (typeof addr === "string") {
                try {
                    addr = JSON.parse(addr);
                } catch (e) {}
            }
            data.address = addr;
        }
        data.contactEmail = req.body.contactEmail ?? data.contactEmail;
        data.contactPhone = req.body.contactPhone ?? data.contactPhone;

        if (req.files) {
            if (req.files.logo && req.files.logo[0]) {
                newLogoPath = req.files.logo[0].path;
                data.logo = newLogoPath;
            }
            if (req.files.aboutImage && req.files.aboutImage[0]) {
                newAboutImagePath = req.files.aboutImage[0].path;
                data.aboutImage = newAboutImagePath;
            }
        } else if (req.file) {
            if (req.body.fileType === "logo") {
                newLogoPath = req.file.path;
                data.logo = newLogoPath;
            } else {
                newAboutImagePath = req.file.path;
                data.aboutImage = newAboutImagePath;
            }
        }

        await data.save();

        if (newLogoPath && oldLogo) {
            await deleteFromCloudinary(oldLogo);
        }
        if (newAboutImagePath && oldAboutImage) {
            await deleteFromCloudinary(oldAboutImage);
        }

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        if (newLogoPath) await deleteFromCloudinary(newLogoPath);
        if (newAboutImagePath) await deleteFromCloudinary(newAboutImagePath);
        if (req.file) await deleteFromCloudinary(req.file.path);

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `About with this ${key} already exists`;
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
        let data = await About.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.logo) {
            await deleteFromCloudinary(data.logo);
        }
        if (data.aboutImage) {
            await deleteFromCloudinary(data.aboutImage);
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
