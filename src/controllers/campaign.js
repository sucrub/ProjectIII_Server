const campaignService = require("../services/campaign");

const createCampaign = async (req, res) => {
  const data = req.body;
  const userId = req.userId;
  const campaign = await campaignService.createCampaign({ userId, data });
  return res.send({ status: 1, result: { campaign } });
};

const getCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const campaign = await campaignService.getCampaign(campaignId);
  return res.send({ status: 1, result: { campaign } });
};

const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  await campaignService.deleteCampaign(campaignId);
  return res.send({ status: 1 });
};

const addMember = async (req, res) => {
  const data = req.body;
  const ownerId = req.userId;
  const member = await campaignService.addMember(ownerId, data);
  return res.send({ status: 1, result: { member } });
};

const deleteMember = async (req, res) => {
  const data = req.body;
  await campaignService.deleteMember(data);
  return res.send({ status: 1 });
};

const getAllMember = async (req, res) => {
  const { campaignId } = req.params;
  const members = await campaignService.getAllMember(campaignId);
  return res.send({ status: 1, result: { members } });
};

const changeMemberRole = async (req, res) => {
  const { userId, campaignId, role } = req.body;
  const member = await campaignService.changeMemberRole(
    userId,
    campaignId,
    role
  );
  return res.send({ status: 1, result: { member } });
};

const getMyCampaign = async (req, res) => {
  const userId = req.userId;
  const campaigns = await campaignService.getMyCampaign(userId);
  return res.send({ status: 1, result: { campaigns } });
};

const updateCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const data = req.body;
  const campaign = await campaignService.updateCampaign(campaignId, data);
  return res.send({ status: 1, result: { campaign } });
};

const isMember = async (req, res) => {
  const { campaignId } = req.params;
  const userId = req.userId;
  const result = await campaignService.isMember(userId, campaignId);
  return res.send(result);
};

module.exports = {
  createCampaign,
  getCampaign,
  addMember,
  deleteMember,
  getAllMember,
  changeMemberRole,
  getMyCampaign,
  updateCampaign,
  deleteCampaign,
  isMember,
};
