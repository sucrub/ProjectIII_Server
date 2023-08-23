const memberDao = require("../daos/member");
const userDao = require("../daos/user");
const roleDao = require("../daos/role");
const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");
const { ROLE } = require("../constants");

const addServerAdmin = async (email) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  const roleId = await roleDao.getRoleId({ name: ROLE.SERVER_ADMIN });
  const conditions = {
    userId: user._id,
    roleId,
  };
  const memberExist = await memberDao.findMember(conditions);
  if (memberExist) throw new CustomError(errorCodes.USER_EXISTS);
  const serverAdmin = memberDao.createMember(conditions);
  return serverAdmin;
};

const deleteServerAdmin = async (adminId) => {
  await memberDao.deleteAdmin(adminId);
};

const getAllAdmins = async (conditions) => {
  const roles = await memberDao.getAllAdmins(conditions);
  return roles;
};

module.exports = { addServerAdmin, deleteServerAdmin, getAllAdmins };
