const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [500, 'Short description cannot exceed 500 characters'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required'],
      trim: true,
    },
    galleryImages: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: [
          'Education',
          'Healthcare',
          'Environment',
          'Women Empowerment',
          'Child Welfare',
          'Disaster Relief',
          'Poverty Alleviation',
          'Animal Welfare',
          'Skill Development',
          'Community Development',
          'Other',
        ],
        message: '{VALUE} is not a supported category',
      },
      index: true,
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ['planned', 'ongoing', 'completed', 'on-hold'],
        message: '{VALUE} is not a valid status',
      },
      default: 'ongoing',
      index: true,
    },
    beneficiaries: {
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
      targetGroup: {
        type: String,
        trim: true,
        default: '',
      },
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

module.exports = mongoose.model('Project', projectSchema);
