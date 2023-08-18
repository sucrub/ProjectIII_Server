const permissionDao = require("../daos/permission");
const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");

const createPermission = async (data) => {
  const permissionExists = await permissionDao.getPermission({
    $or: [{ name: data.name }, { url: data.url }],
  });

  if (permissionExists) {
    throw new CustomError(errorCodes.PERMISSION_EXISTS);
  }
  const permission = await permissionDao.createPermission(data);
  return permission;
};

const deletePermission = async (permissionId) => {
  await permissionDao.deletePermission(permissionId);
};

const getAllPermission = async (conditions) => {
  const permissions = await permissionDao.getAllPermission(conditions);
  return permissions;
};

const updatePermission = async (permissionId, data) => {
  const permission = await permissionDao.updatePermission(permissionId, data);
  return permission;
};

const getAllPermissionNoLimit = async () => {
  const permissions = await permissionDao.getAllPermissionNoLimit();
  return permissions;
};

module.exports = {
  createPermission,
  deletePermission,
  getAllPermission,
  updatePermission,
  getAllPermissionNoLimit,
};
