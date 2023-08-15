const roleService = require("../services/role");

const createRole = async (req, res) => {
  const data = req.body;
  const newRole = await roleService.createRole(data);
  return res.send({ status: 1, result: { newRole } });
};

const getAllRoles = async (req, res) => {
  let { offset, limit } = req.query;
  offset = parseInt(offset, 10);
  limit = parseInt(limit, 10);
  const roles = await roleService.getAllRoles({
    offset,
    limit,
  });
  return res.send({ status: 1, result: { roles } });
};

const deleteRole = async (req, res) => {
  const { roleId } = req.params;
  await roleService.deleteRole(roleId);
  return res.send({ status: 1 });
};

const setPermissionsOfRole = async (req, res) => {
  const { roleId } = req.params;
  const permissionsIdsArray = req.body.permission;
  const role = await roleService.setPermissionsOfRole(
    roleId,
    permissionsIdsArray
  );
  return res.send({ status: 1, result: { role } });
};

module.exports = {
  createRole,
  getAllRoles,
  deleteRole,
  setPermissionsOfRole,
};
