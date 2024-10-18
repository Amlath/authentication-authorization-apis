const GetAllProduct = 'SELECT product_id, product_title, product_image, product_price, product_offerprice FROM Products ORDER BY product_id ASC';
const GetProductById = 'SELECT product_id, product_title, product_image, product_price, product_offerprice FROM Products WHERE product_id = $1';
const CreateProduct = 'INSERT INTO Products (product_title, product_image, product_price, product_offerprice) Values ($1, $2, $3, $4)';
const UpdateProduct = 'UPDATE Products SET product_title = $1, product_image = $2, product_price = $3, product_offerprice = $4 WHERE product_id = $5';
const DeleteProduct = 'DELETE FROM Products WHERE product_id = $1';

module.exports = {
  GetAllProduct,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct
}