const Joi = require('joi');

exports.productSchema = Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().positive().required(),
    categoryId: Joi.number().integer().positive().required()
})
