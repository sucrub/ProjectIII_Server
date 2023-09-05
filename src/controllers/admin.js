const adminService = require("../services/admin");

const addServerAdmin = async (req, res) => {
  const { email } = req.body;
  const serverAdmin = await adminService.addServerAdmin(email);
  return res.send({ status: 1, result: { serverAdmin } });
};

const deleteServerAdmin = async (req, res) => {
  const { adminId } = req.params;
  await adminService.deleteServerAdmin(adminId);
  return res.send({ status: 1 });
};

const getAllAdmins = async (req, res) => {
  let { offset, limit } = req.query;
  offset = parseInt(offset, 10);
  limit = parseInt(limit, 10);
  const admins = await adminService.getAllAdmins({
    offset,
    limit,
  });
  return res.send({ status: 1, result: { admins } });
};

const isAdmin = async (req, res) => {
  const userId = req.userId;
  const result = await adminService.isAdmin(userId);
  return res.send({ status: 1, result: { result } });
};

module.exports = { addServerAdmin, deleteServerAdmin, getAllAdmins, isAdmin };
