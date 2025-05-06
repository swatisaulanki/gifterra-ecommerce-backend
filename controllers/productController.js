const productModel = require('../model/productModel');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;

  if (!name || !price || stock === undefined) {
    return res.status(400).json({ message: 'Name, price, and stock are required' });
  }

  try {
    const result = await productModel.createProduct({ name, description, price, stock, image_url });
    res.status(201).json({ message: 'Product created', productId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, image_url } = req.body;

  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productModel.updateProduct(id, { name, description, price, stock, image_url });
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productModel.deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
