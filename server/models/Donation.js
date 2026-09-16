const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: [true, 'Donor name is required'],
      trim: true,
      maxlength: [100, 'Donor name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Donor email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Donation amount must be greater than 0'],
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
      trim: true,
    },
    paymentId: {
      type: String,
      trim: true,
      index: true,
      default: '',
    },
    transactionId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    orderId: {
      type: String,
      trim: true,
      default: '',
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'completed', 'failed', 'refunded', 'Pending', 'Completed', 'Failed', 'Refunded', 'Done'],
        message: '{VALUE} is not a valid payment status',
      },
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: [
          'Razorpay',
          'Stripe',
          'PayPal',
          'UPI',
          'Bank Transfer',
          'Cash',
          'Card',
          'Net Banking',
          'Other',
        ],
        message: '{VALUE} is not a valid payment method',
      },
      default: 'Razorpay',
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      default: null,
      index: true,
    },
    cause: {
      type: String,
      trim: true,
      default: '',
    },
    frequency: {
      type: String,
      default: 'one-time',
    },
    taxReceiptRequired: {
      type: Boolean,
      default: true,
    },
    panOrTaxId: {
      type: String,
      trim: true,
      default: '',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: '',
    },
    address: {
      street: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
      state: { type: String, trim: true, default: '' },
      country: { type: String, trim: true, default: 'India' },
      pincode: { type: String, trim: true, default: '' },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
    },
    donationDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    rppid: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', donationSchema);
