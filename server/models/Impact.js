const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Metric title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    value: {
      type: String,
      required: [true, 'Metric value is required'],
      trim: true,
      maxlength: [50, 'Value cannot exceed 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      default: '',
    },
    icon: {
      type: String,
      trim: true,
      default: 'heart',
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

module.exports = mongoose.model('Impact', impactSchema);
