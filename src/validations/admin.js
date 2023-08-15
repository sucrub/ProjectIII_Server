const { Joi, validate } = require("express-validation");

const addServerAdmin = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
  }),
};

const getAdmins = {
  query: Joi.object({
    offset: Joi.number(),
    limit: Joi.number(),
  }),
};

module.exports = {
  addServerAdminValidate: validate(addServerAdmin, { keyByField: true }),
  getAdminsValidate: validate(getAdmins, { keyByField: true }),
};
