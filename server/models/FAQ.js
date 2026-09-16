const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
      maxlength: [300, 'Question cannot exceed 300 characters'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: [
          'General',
          'Donations',
          'Volunteering',
          'Projects',
          'Events',
          'Tax & 80G',
          'Other',
        ],
        message: '{VALUE} is not a valid FAQ category',
      },
      default: 'General',
      index: true,
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

module.exports = mongoose.model('FAQ', faqSchema);
