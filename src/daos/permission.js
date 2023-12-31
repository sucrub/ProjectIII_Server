const { ObjectId } = require("mongoose").Types;
const Permission = require("../models/permission");
const { find } = require("./utils/find");

const createPermission = async (createFields) => {
  const permission = await Permission.create(createFields);
  return permission;
};

const getPermission = async (conditions) => {
  const permission = await Permission.findOne(conditions);
  return permission;
};

const deletePermission = async (permissionId) => {
  await Permission.findByIdAndDelete(permissionId);
};

const getAllPermission = async (conditions) => {
  const permissions = await find(Permission, conditions);
  return permissions;
};

const updatePermission = async (permissionId, createFields) => {
  const permission = await Permission.findByIdAndUpdate(
    permissionId,
    createFields,
    { new: true }
  );
  return permission;
};

const getAllPermissionNoLimit = async () => {
  const permissions = await Permission.find();
  return permissions;
};

const getPermissionId = async (permissionName) => {
  const permission = await Permission.findOne({
    name: permissionName,
  });
  return permission.id;
};

module.exports = {
  createPermission,
  getPermission,
  deletePermission,
  getAllPermission,
  updatePermission,
  getAllPermissionNoLimit,
  getPermissionId,
};
