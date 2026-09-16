const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    ngoName: {
      type: String,
      required: [true, 'NGO Name is required'],
      trim: true,
      maxlength: [150, 'NGO Name cannot exceed 150 characters'],
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: [250, 'Tagline cannot exceed 250 characters'],
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    mission: {
      type: String,
      required: [true, 'Mission statement is required'],
      trim: true,
    },
    vision: {
      type: String,
      required: [true, 'Vision statement is required'],
      trim: true,
    },
    objectives: [
      {
        type: String,
        trim: true,
      },
    ],
    logo: {
      type: String,
      default: '',
      trim: true,
    },
    aboutImage: {
      type: String,
      default: '',
      trim: true,
    },
    establishedYear: {
      type: Number,
      min: [1800, 'Year must be after 1800'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    address: {
      street: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
      state: { type: String, trim: true, default: '' },
      country: { type: String, trim: true, default: 'India' },
      pincode: { type: String, trim: true, default: '' },
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('About', aboutSchema);
