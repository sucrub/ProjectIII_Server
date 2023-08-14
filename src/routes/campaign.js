const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const campaignController = require("../controllers/campaign");
const { auth } = require("../middlewares/auth");
const {
  createCampaignValidate,
  getCampaignByIdValidate,
} = require("../validations/campaign");

router.post(
  "/campaign/create-campaign",
  auth,
  createCampaignValidate,
  asyncMiddleware(campaignController.createCampaign)
);

router.get(
  "/campaign/get-campaign/:campaignId",
  getCampaignByIdValidate,
  asyncMiddleware(campaignController.getCampaign)
);

module.exports = router;
