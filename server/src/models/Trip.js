const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: [true, 'Please provide a destination'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    budget: {
      type: Number,
      required: [true, 'Please provide a budget'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
    status: {
      type: String,
      enum: ['planned', 'ongoing', 'completed', 'cancelled'],
      default: 'planned',
    },
    activities: [
      {
        name: String,
        date: Date,
        location: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trip', tripSchema);

