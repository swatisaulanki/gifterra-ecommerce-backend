const db = require('../config/db');

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]); // Return the first result (or undefined)
    });
  });
};

const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO products (name, description, price, stock, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.image_url
    ];
    db.query(query, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE products
      SET name = ?, description = ?, price = ?, stock = ?, image_url = ?
      WHERE id = ?
    `;
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.image_url,
      id
    ];
    db.query(query, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
