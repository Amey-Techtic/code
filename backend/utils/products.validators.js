const joi = require("joi");

const productSchema = joi.object({
    title: joi.string().min(4).max(150).trim().required(),
    description: joi.string().min(4).max(500).trim().required(),
    price: joi.number().required(),
    category: joi.string().min(4).required(),
    image: joi.string().max(700).trim().required(),
})

module.exports = {productSchema};