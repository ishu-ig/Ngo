const Blog = require("../models/Blog");
const { deleteFromCloudinary } = require("../cloudinaryMethods");

async function createRecord(req, res) {
    try {
        if ((!req.body.author || req.body.author === "") && req.user && req.user._id) {
            req.body.author = req.user._id;
        } else if (req.body.author === "") {
            delete req.body.author;
        }

        let data = new Blog(req.body);

        if (req.file) {
            data.featuredImage = req.file.path;
        }

        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
        }

        await data.save();
        res.send({
            result: "Done",
            data: data
        });
    } catch (error) {
        if (req.file) await deleteFromCloudinary(req.file.path);

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Blog with this ${key} already exists`;
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
        let data = await Blog.find()
            .populate("author", "name email role profilePic")
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
        let query = {};
        if (req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: req.params._id };
        } else {
            query = { slug: req.params._id };
        }

        let data = await Blog.findOne(query).populate("author", "name email role profilePic");
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
        let data = await Blog.findById(req.params._id);

        if (!data) {
            if (req.file) await deleteFromCloudinary(req.file.path);
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        const oldPic = data.featuredImage;

        data.title = req.body.title ?? data.title;
        data.slug = req.body.slug ?? data.slug;
        data.shortDescription = req.body.shortDescription ?? data.shortDescription;
        data.content = req.body.content ?? data.content;
        data.author = req.body.author ?? data.author;
        data.category = req.body.category ?? data.category;
        data.tags = req.body.tags ?? data.tags;
        data.publishedStatus = req.body.publishedStatus ?? data.publishedStatus;
        data.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : data.isPublished;
        data.publishedDate = req.body.publishedDate ?? data.publishedDate;
        data.views = req.body.views !== undefined ? req.body.views : data.views;

        if (req.file) {
            data.featuredImage = req.file.path;
        }

        await data.save();

        if (req.file && oldPic) {
            await deleteFromCloudinary(oldPic);
        }

        res.send({
            result: "Done",
            data
        });
    } catch (error) {
        if (req.file) {
            await deleteFromCloudinary(req.file.path);
        }

        let errorMessage = {};
        if (error.keyValue) {
            let key = Object.keys(error.keyValue)[0];
            errorMessage[key] = `Blog with this ${key} already exists`;
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
        let data = await Blog.findById(req.params._id);

        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        if (data.featuredImage) {
            await deleteFromCloudinary(data.featuredImage);
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
