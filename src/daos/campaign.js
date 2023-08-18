const { ObjectId } = require("mongoose").Types;
const Campaign = require("../models/campaign");

const createCampaign = async (createFields) => {
  const campaign = await Campaign.create(createFields);
  return campaign;
};

const getCampaignById = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  return campaign;
};

const getMyCampaigns = async (campaigns) => {
  const campaignIds = campaigns.map((campaign) => campaign.campaignId);
  const campaignPromises = campaignIds.map((id) => Campaign.findById(id));
  const campaignDetails = await Promise.all(campaignPromises);

  return campaignDetails;
};

const updateCampaign = async (campaignId, data) => {
  const campaign = Campaign.findByIdAndUpdate(campaignId, data, { new: true });
  return campaign;
};

module.exports = {
  createCampaign,
  getCampaignById,
  getMyCampaigns,
  updateCampaign,
};
