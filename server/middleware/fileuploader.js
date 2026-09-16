const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

/**
 * Creates a Multer uploader instance targeting a specific Cloudinary folder.
 * @param {string} folder - Sub-folder name under NGO assets.
 * @param {Object} options - Custom options (e.g., allowedFormats, limits).
 */
function createUploader(folder, options = {}) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const cleanName = file.originalname
        .replace(/\s+/g, '_')
        .replace(/[()]/g, '')
        .replace(/[^a-zA-Z0-9._-]/g, '');

      const isPdf = file.mimetype === 'application/pdf';
      const isVideo = file.mimetype.startsWith('video/');

      let resourceType = 'image';
      if (isPdf) {
        resourceType = 'raw';
      } else if (isVideo) {
        resourceType = 'video';
      }

      return {
        folder: `NGO/${folder}`,
        allowed_formats: options.allowedFormats || [
          'jpg',
          'jpeg',
          'png',
          'webp',
          'svg',
          'gif',
          'pdf',
          'mp4',
          'mov',
          'webm',
        ],
        resource_type: resourceType,
        public_id: `${Date.now()}_${cleanName.split('.')[0]}`,
      };
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: options.fileSize || 15 * 1024 * 1024, // 15MB limit
    },
  });

  return upload;
}

// Uploaders configured for each NGO model
const userUploader = createUploader('users');
const aboutUploader = createUploader('about');
const teamMemberUploader = createUploader('team');
const teamUploader = teamMemberUploader;
const projectUploader = createUploader('projects');
const programUploader = createUploader('projects');
const campaignUploader = createUploader('campaigns');
const eventUploader = createUploader('events');
const galleryUploader = createUploader('gallery');
const blogUploader = createUploader('blogs');
const testimonialUploader = createUploader('testimonials');
const partnerUploader = createUploader('partners');
const impactUploader = createUploader('impact');
const volunteerUploader = createUploader('volunteers');
const bannerUploader = createUploader('banners');
const documentUploader = createUploader('documents', {
  allowedFormats: ['pdf', 'doc', 'docx', 'jpg', 'png'],
});

module.exports = {
  createUploader,
  userUploader,
  aboutUploader,
  teamMemberUploader,
  teamUploader,
  projectUploader,
  programUploader,
  campaignUploader,
  eventUploader,
  galleryUploader,
  blogUploader,
  testimonialUploader,
  partnerUploader,
  impactUploader,
  volunteerUploader,
  bannerUploader,
  documentUploader,
};
