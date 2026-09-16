const Volunteer = require("../models/Volunteer");

async function createRecord(req, res) {
    try {
        let data = new Volunteer(req.body);

        if (req.body.skills && typeof req.body.skills === "string") {
            try {
                data.skills = JSON.parse(req.body.skills);
            } catch (e) {
                data.skills = req.body.skills.split(",").map((s) => s.trim());
            }
        }

        if (req.body.areasOfInterest && typeof req.body.areasOfInterest === "string") {
            try {
                data.areasOfInterest = JSON.parse(req.body.areasOfInterest);
            } catch (e) {
                data.areasOfInterest = req.body.areasOfInterest.split(",").map((s) => s.trim());
            }
        }

        await data.save();
        res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Volunteer with this ${key} already exists`;
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
        let data = await Volunteer.find()
            .populate("user", "name email phone role")
            .sort({ _id: -1 });

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
        let data = await Volunteer.findOne({ _id: req.params._id })
            .populate("user", "name email phone role");

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
    try {
        let data = await Volunteer.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        data.name = req.body.name ?? data.name;
        data.email = req.body.email ?? data.email;
        data.phone = req.body.phone ?? data.phone;
        data.dateOfBirth = req.body.dateOfBirth ?? data.dateOfBirth;
        data.address = req.body.address ?? data.address;
        data.city = req.body.city ?? data.city;
        data.state = req.body.state ?? data.state;
        data.occupation = req.body.occupation ?? data.occupation;

        if (req.body.skills) {
            if (typeof req.body.skills === "string") {
                try {
                    data.skills = JSON.parse(req.body.skills);
                } catch (e) {
                    data.skills = req.body.skills.split(",").map((s) => s.trim());
                }
            } else {
                data.skills = req.body.skills;
            }
        }

        if (req.body.areasOfInterest) {
            if (typeof req.body.areasOfInterest === "string") {
                try {
                    data.areasOfInterest = JSON.parse(req.body.areasOfInterest);
                } catch (e) {
                    data.areasOfInterest = req.body.areasOfInterest.split(",").map((s) => s.trim());
                }
            } else {
                data.areasOfInterest = req.body.areasOfInterest;
            }
        }

        data.availability = req.body.availability ?? data.availability;
        data.message = req.body.message ?? data.message;
        data.user = req.body.user !== undefined ? req.body.user : data.user;
        data.applicationStatus = req.body.applicationStatus ?? data.applicationStatus;
        data.isActive = req.body.isActive !== undefined ? req.body.isActive : data.isActive;

        await data.save();

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Volunteer with this ${key} already exists`;
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
        let data = await Volunteer.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
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
