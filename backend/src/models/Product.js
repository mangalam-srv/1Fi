import mongoose from 'mongoose';

const emiPlanSchema = new mongoose.Schema({
  tenure: {
    type: Number,
    required: true,
  },
  monthlyAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  cashback: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  emiPlans: [emiPlanSchema],
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  variants: [variantSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
