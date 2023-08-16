const { ObjectId } = require("mongoose").Types;
const campaignDao = require("../daos/campaign");
const memberDao = require("../daos/member");
const versionDao = require("../daos/version");
const roleDao = require("../daos/role");
const userDao = require("../daos/user");
const { ROLE } = require("../constants");

const createCampaign = async ({ userId, data }) => {
  const campaign = await campaignDao.createCampaign(data);
  const campaignId = campaign._id;

  const latestVersion = await versionDao.getLastestVersion({ campaignId });
  const { version = 0 } = latestVersion || {};

  const versionData = {
    campaignId: campaignId,
    title: campaign.title,
    content: campaign.content,
    version: version + 1,
  };

  await versionDao.createVersion(versionData);
  const roleId = await roleDao.getRoleId({ name: ROLE.OWNER });
  await memberDao.createMember({ userId, campaignId, roleId });
  return campaign;
};

const getCampaign = async (campaignId) => {
  const campaign = await campaignDao.getCampaignById(campaignId);
  return campaign;
};

const addMember = async (ownerId, { campaignId, email, role }) => {
  const ownerRoleId = await memberDao.getRoleId(ownerId, campaignId);
  const ownerRole = await roleDao.checkRole(ownerRoleId);
  if (ownerRole === "owner") {
    const user = await userDao.findUser({ email });
    if (user) {
      const checkExistedMember = await memberDao.findExistMember(
        user.id,
        campaignId
      );
      if (checkExistedMember) throw new CustomError(errorCodes.USER_EXISTS);
      const roleId = await roleDao.getRoleIdByName(role);
      const member = await memberDao.addMember(user.id, campaignId, roleId);
      return member;
    }
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }
  throw new CustomError(errorCodes.UNAUTHORIZED);
};

module.exports = {
  createCampaign,
  getCampaign,
  addMember,
};
