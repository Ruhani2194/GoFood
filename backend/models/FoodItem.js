const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  halfPrice: { type: Number, required: true },
  fullPrice: { type: Number, required: true },
  image: { type: String, required: true }, 
  options: [{
    half: { type: Number, required: true },
    full: { type: Number, required: true }
  }] 
});

const FoodItem = mongoose.model('Food_Items', foodItemSchema);

module.exports = FoodItem;
