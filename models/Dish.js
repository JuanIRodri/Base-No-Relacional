const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 1000 },
    ingredients: [{ type: String, trim: true }],
    price: { type: Number, required: true, min: 0 },
    celiacFriendly: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    diabeticFriendly: { type: Boolean, default: false },
    calories: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dish', dishSchema);
