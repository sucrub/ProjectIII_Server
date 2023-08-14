const { Joi, validate } = require("express-validation");

const login = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().trim().required(),
  }),
};

const register = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

const forgotPassword = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
  }),
};

const resetPassword = {
  params: Joi.object({
    token: Joi.string().trim().required(),
  }),
  body: Joi.object({
    password: Joi.string().trim().required(),
  }),
};

module.exports = {
  loginValidate: validate(login, { keyByField: true }),
  registerValidate: validate(register, { keyByField: true }),
  forgotPasswordValidate: validate(forgotPassword, { keyByField: true }),
  resetPasswordValidate: validate(resetPassword, { keyByField: true }),
};
