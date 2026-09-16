const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    designation: {
      type: String,
      required: [true, 'Designation / role is required'],
      trim: true,
      maxlength: [100, 'Designation cannot exceed 100 characters'],
    },
    profileImage: {
      type: String,
      required: [true, 'Profile image URL is required'],
      trim: true,
    },
    shortBio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: '',
    },
    socialLinks: {
      linkedin: { type: String, trim: true, default: '' },
      twitter: { type: String, trim: true, default: '' },
      facebook: { type: String, trim: true, default: '' },
      instagram: { type: String, trim: true, default: '' },
      github: { type: String, trim: true, default: '' },
      website: { type: String, trim: true, default: '' },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Team || mongoose.model('Team', teamSchema);
