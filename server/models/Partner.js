const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
      maxlength: [150, 'Organization name cannot exceed 150 characters'],
    },
    logo: {
      type: String,
      required: [true, 'Partner logo URL is required'],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    partnerType: {
      type: String,
      enum: {
        values: [
          'Corporate',
          'NGO Partner',
          'Government',
          'Academic',
          'Donor',
          'Sponsor',
          'Media Partner',
          'Other',
        ],
        message: '{VALUE} is not a valid partner type',
      },
      default: 'Corporate',
      index: true,
    },
    contactPerson: {
      name: { type: String, trim: true, default: '' },
      email: { type: String, trim: true, lowercase: true, default: '' },
      phone: { type: String, trim: true, default: '' },
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

module.exports = mongoose.model('Partner', partnerSchema);
