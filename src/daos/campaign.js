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

module.exports = {
  createCampaign,
  getCampaignById,
};
