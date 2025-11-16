const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a group name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['owner', 'admin', 'member'],
          default: 'member',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    trips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
    chatRoom: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate chat room ID before saving
groupSchema.pre('save', function (next) {
  if (!this.chatRoom) {
    this.chatRoom = `room-${this._id}`;
  }
  next();
});

module.exports = mongoose.model('Group', groupSchema);

