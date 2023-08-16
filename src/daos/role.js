const { ObjectId } = require("mongoose").Types;
const Role = require("../models/role");
const { find } = require("./utils/find");

const getRoleId = async (conditions) => {
  const result = await Role.findOne(conditions, { _id: 1 });
  const id = result._id;
  return id;
};

const createRole = async (createFields) => {
  const role = await Role.create(createFields);
  return role;
};

const getAllRoles = async (conditions) => {
  const roles = await find(Role, conditions);
  return roles;
};

const deleteRole = async (roleId) => {
  await Role.findByIdAndDelete(roleId);
};

const setPermissionsOfRole = async (roleId, permissions) => {
  const roles = await Role.findByIdAndUpdate(
    roleId,
    {
      $set: { permission: permissions },
    },
    { new: true }
  );
  return roles;
};

const getRoleIdByName = async (name) => {
  const id = await Role.findOne({
    name,
  });
  return id._id;
};

const checkRole = async (id) => {
  const role = await Role.findById(id);
  return role._doc.name;
};

module.exports = {
  getRoleId,
  createRole,
  getAllRoles,
  deleteRole,
  setPermissionsOfRole,
  checkRole,
  getRoleId,
  getRoleIdByName,
};
