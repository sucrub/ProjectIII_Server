const { Joi, validate } = require("express-validation");
const { validateObjectId } = require("./utils");

const createRole = {
  body: Joi.object({
    name: Joi.string().trim().required(),
  }),
};

const deleteRoleById = {
  params: Joi.object({
    roleId: Joi.string()
      .custom((value, helpers) => validateObjectId("roleId", value, helpers))
      .messages({
        "any.invalid": "roleId must be a valid objectId",
      }),
  }),
};

const getRoles = {
  query: Joi.object({
    offset: Joi.number(),
    limit: Joi.number(),
  }),
};

module.exports = {
  createRoleValidate: validate(createRole, { keyByField: true }),
  deleteRoleByIdValidate: validate(deleteRoleById, {
    keyByField: true,
  }),
  getRolesValidate: validate(getRoles, { keyByField: true }),
};
