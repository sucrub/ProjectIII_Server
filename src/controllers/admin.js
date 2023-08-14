const adminService = require("../services/admin");

const addServerAdmin = async (req, res) => {
  const { email } = req.body;
  const serverAdmin = await adminService.addServerAdmin(email);
  return res.send({ status: 1, result: { serverAdmin } });
};

module.exports = { addServerAdmin };
