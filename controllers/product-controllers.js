const productRepositories = require('../repositories/product-repositories.js');
const ErrorResponse = require('../utils/error-response.js');
const asyncHandler = require('../middlewares/async-handler.js');

//@desc = To get all products
//@route = GET /api/products
//@access = public
const getAllProduts = asyncHandler(async(req, res, next) => {
    const products = await productRepositories.getAllProduts();
    res.status(200).json({success: true, data: products});
});

//@desc = To get a product by id  
//@route = GET /api/products/:id
//@access = public
const getProductById = asyncHandler(async(req, res, next) => {
  const id = req.params.id;
  const product = await productRepositories.getProductById(id);
  if(product && product.length){
    return res.status(200).json({success: true, data: product});
  }    
  next(new ErrorResponse(`Product doesn't exist with id ${id}`, 404));
});

//@desc = Create new product
//@route = POST /api/products 
//@access = public
const createProduct = asyncHandler(async(req, res, next) => {
  const { title, image, price, offerprice } = req.body;
  const products = await productRepositories.createProduct(title, image, price, offerprice);
  if(products)
    res.status(201).json({success: true, data: {message: "Successfully created new product"}});
});

//@desc = Update product by id
//@route = PUT /api/products/:id
//@access = public
const updateProduct = asyncHandler(async(req, res, next) => {
  const { title, image, price, offerprice } = req.body;
  const id = req.params.id;
  const product_exist = await productRepositories.checkProductExists(id);
  if(product_exist) {
    await productRepositories.updateProduct(title, image, price, offerprice, id);
      res.status(200).json({message: `Successfully updated product ${title}`});
  } else {
    next(new ErrorResponse(`Product doesn't exist with id ${id}`, 404));
  }
})

//@desc = Delete product by id
//@route = DELETE /api/products/:id
//@access = public
const deleteProduct = asyncHandler(async(req, res, next) => {
  const id = req.params.id;
  const product_exist = await productRepositories.checkProductExists(id);
  if(product_exist) {
  await productRepositories.deleteProduct(id);
  res.status(200).json({message: "Successfully deleted a product"});
  } else {
    next(new ErrorResponse(`Product doesn't exist with id ${id}`, 404));
  }
})

module.exports = {
  getAllProduts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}