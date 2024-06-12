const Joi = require('joi');
exports.basicPostSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
  
    desc: Joi.string()
        .required(),
  
    username: Joi.string()
    .required(),
}).options({ allowUnknown: true });
exports.logsSchema = Joi.object({
    question: Joi.string()
        .required(),

    answer: Joi.string()
        .required(),
  
    username: Joi.string()
    .required(),
}).options({ allowUnknown: true });
exports.catSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
}).options({ allowUnknown: true });
exports.userSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
  
    password: Joi.string()
    .min(8)
    .required(),
}).options({ allowUnknown: true });
exports.loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
  
    password: Joi.string()
    .min(8)
    .required(),
}).options({ allowUnknown: true });