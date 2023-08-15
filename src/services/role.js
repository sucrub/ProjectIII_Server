const roleDao = require("../daos/role");

const createRole = async (data) => {
  const newRole = await roleDao.createRole(data);
  return newRole;
};

const getAllRoles = async (conditions) => {
  const roles = await roleDao.getAllRoles(conditions);
  return roles;
};

const deleteRole = async (roleId) => {
  await roleDao.deleteRole(roleId);
};

const setPermissionsOfRole = async (roleId, permissions) => {
  const role = await roleDao.setPermissionsOfRole(roleId, permissions);
  return role;
};

module.exports = {
  createRole,
  getAllRoles,
  deleteRole,
  setPermissionsOfRole,
};
