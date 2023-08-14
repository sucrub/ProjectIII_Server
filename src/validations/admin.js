const { Joi, validate } = require("express-validation");

const addServerAdmin = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
  }),
};

module.exports = {
  addServerAdminValidate: validate(addServerAdmin, { keyByField: true }),
};
