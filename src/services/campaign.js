const { ObjectId } = require("mongoose").Types;
const campaignDao = require("../daos/campaign");
const memberDao = require("../daos/member");
const versionDao = require("../daos/version");
const roleDao = require("../daos/role");
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

module.exports = {
  createCampaign,
  getCampaign,
};
