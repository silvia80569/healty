const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: { type: String, required: true },
  weight: { type: Number, required: true },
  calories: { type: Number, required: true },
  groupBloodNotAllowed: { type: [Boolean], required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Nutrition', nutritionSchema);