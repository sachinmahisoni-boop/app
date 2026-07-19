import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Gold', 'Silver', 'Diamond', 'Platinum', 'Gemstone', 'Other'],
    required: true 
  },
  subCategory: String,
  designCode: { type: String, unique: true, required: true },
  weight: { type: Number, required: true }, // in grams
  purity: Number, // e.g., 22K, 18K, 925 for silver
  makingCharges: { type: Number, default: 0 },
  gstRate: { type: Number, default: 3 }, // GST percentage
  ratePerGram: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  images: [String],
  description: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
