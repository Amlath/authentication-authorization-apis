const pool = require('../config/database');
const { GetAllProduct, GetProductById, CreateProduct, UpdateProduct, DeleteProduct } = require('../queries/product-queries.js');

getAllProduts = () => {
  return new Promise((resolve, reject) => {
    pool.query(GetAllProduct, (error, results) => {
      if(error) reject(error);
      else resolve(results.rows);
    })
  })  
}

getProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(GetProductById, [id], (error, results) => {
      if(error) reject(error);
      else resolve(results.rows);
    })
  })  
}

createProduct = (title, image, price, offerprice) => {
  return new Promise((resolve, reject) => {
    pool.query(CreateProduct, [title, image, price, offerprice], (error, results) => {
      if(error) reject(error);
      else resolve (true);
    })
  })
}

checkProductExists = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(GetProductById, [id], (error, results) => {
      if(error) resolve(false);
      else resolve(results.rows.length > 0);
    })
  })  
}

updateProduct = (title, image, price, offerprice, id) => {
  return new Promise((resolve, reject) => {
    pool.query(UpdateProduct, [title, image, price, offerprice, id], (error, results) => {
      if(error) reject(error);
      else resolve (results.rows);
    })
  }) 
}

deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(DeleteProduct, [id], (error, results) => {
      if(error) reject(error);
      else resolve (results.rows);
    })
  }) 
}

module.exports = {
  getAllProduts,
  getProductById,
  createProduct,
  checkProductExists,
  updateProduct,
  deleteProduct
}