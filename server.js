const express = require('express');
const dotenv = require('dotenv');
const users = require('./routes/users-routes');
const products = require('./routes/product-routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();
dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
app.use(express.json());
app.use('/api/auth', users);
app.use('/api/products', products);
app.use(errorHandler);