const joi = require('joi');

const userSignupSchema = joi.object({
    username: joi.string().alphanum().min(4).max(12).trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().min(7).alphanum().trim().required(),
})

const userLoginSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),
    
})

module.exports = {userSignupSchema, userLoginSchema};