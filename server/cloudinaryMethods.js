const cloudinary = require('./cloudinary');

const deleteFromCloudinary = async (fileUrl) => {
    try {
        if (!fileUrl) return;
        if (typeof fileUrl === 'string' && fileUrl.includes('cloudinary.com')) {
            const splitUrl = fileUrl.split('/');
            const uploadIndex = splitUrl.indexOf('upload');
            if (uploadIndex !== -1) {
                let publicIdParts = splitUrl.slice(uploadIndex + 1);
                if (publicIdParts[0] && /^v\d+$/.test(publicIdParts[0])) {
                    publicIdParts = publicIdParts.slice(1);
                }
                const publicIdWithExt = publicIdParts.join('/');
                const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.')) || publicIdWithExt;
                await cloudinary.uploader.destroy(publicId);
                return;
            }
        }
        await cloudinary.uploader.destroy(fileUrl);
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
    }
};

module.exports = {
    deleteFromCloudinary
};
