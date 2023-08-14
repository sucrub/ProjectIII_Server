const permissionService = require("../services/permission");

const createPermission = async (req, res) => {
  const data = req.body;
  const permission = await permissionService.createPermission(data);
  return res.send({ status: 1, result: { permission } });
};

const deletePermission = async (req, res) => {
  const { permissionId } = req.params;
  await permissionService.deletePermission(permissionId);
  return res.send({ status: 1 });
};

const getAllPermission = async (req, res) => {
  let { offset, limit } = req.query;
  offset = parseInt(offset, 10);
  limit = parseInt(limit, 10);
  const permissions = await permissionService.getAllPermission({
    offset,
    limit,
  });
  return res.send({ status: 1, result: { permissions } });
};

const updatePermission = async (req, res) => {
  const { permissionId } = req.params;
  const data = req.body;
  const permission = await permissionService.updatePermission(
    permissionId,
    data
  );
  return res.send({ status: 1, result: { permission } });
};

module.exports = {
  createPermission,
  deletePermission,
  getAllPermission,
  updatePermission,
};
