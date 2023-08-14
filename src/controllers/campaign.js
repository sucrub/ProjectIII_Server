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

module.exports = {
  createCampaign,
  getCampaign,
};
