import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}, 'name slug brand variants.price variants.image').lean();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product id' });
    }
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
    });
  }
};
