const routes = require('express').Router();
const validator = require("express-joi-validation").createValidator({passError: true});
const {productSchema} = require('../validation/productdataValidate');
const productController = require('../controllers/productController');


routes.post('/addProduct', validator.body(productSchema), productController.addProduct);
routes.put('/updateProduct/:id', validator.body(productSchema), productController.updateProduct);
routes.delete('/deleteProduct/:id', productController.deleteProduct);
routes.get('/getProduct', productController.getAllProduct);

module.exports = routes;