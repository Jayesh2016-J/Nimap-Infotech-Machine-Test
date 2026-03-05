const routes = require('express').Router();
const validator = require("express-joi-validation").createValidator({passError: true});
const {categorySchema} = require('../validation/categorydataValidate');
const categoryController = require('../controllers/categoryController');

routes.post('/addCategory', validator.body(categorySchema), categoryController.addCategory);
routes.put('/updateCategory/:id', validator.body(categorySchema), categoryController.updateCategory);
routes.delete('/deleteCategory/:id', categoryController.deleteCategory);
routes.get('/getCategory', categoryController.getAllCategory);

module.exports = routes;