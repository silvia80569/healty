const mongoose = require('mongoose');

const dailyIntakeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
      default: Date.now,
    },
    kcal: {
      type: Number,
      required: true,
      min: 0,
    },
    notAllowedProducts: {
      type: [String],
      default: [],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Referință la modelul Product
          required: true,
        },
        calories: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referință la modelul User
      required: true,
    },
  },
  { timestamps: true }

);

const DailyIntake = mongoose.model('DailyIntake', dailyIntakeSchema);

module.exports = DailyIntake;