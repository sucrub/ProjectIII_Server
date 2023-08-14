const { Joi, validate } = require("express-validation");
const { validateObjectId } = require("./utils");

const createPermission = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    method: Joi.string().trim().required(),
    url: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
  }),
};

const deletePermissionById = {
  params: Joi.object({
    permissionId: Joi.string()
      .custom((value, helpers) =>
        validateObjectId("permissionId", value, helpers)
      )
      .messages({
        "any.invalid": "permissionId must be a valid objectId",
      }),
  }),
};

const getPermissions = {
  query: Joi.object({
    offset: Joi.number(),
    limit: Joi.number(),
  }),
};

const updatePermission = {
  params: Joi.object({
    permissionId: Joi.string()
      .custom((value, helpers) =>
        validateObjectId("permissionId", value, helpers)
      )
      .messages({
        "any.invalid": "permissionId must be a valid objectId",
      }),
  }),
  body: Joi.object({
    name: Joi.string().trim().required(),
    method: Joi.string().trim().required(),
    url: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
  }),
};

module.exports = {
  createPermissionValidate: validate(createPermission, { keyByField: true }),
  deletePermissionByIdValidate: validate(deletePermissionById, {
    keyByField: true,
  }),
  getPermissionsValidate: validate(getPermissions, { keyByField: true }),
  updatePermissionValidate: validate(updatePermission, { keyByField: true }),
};
