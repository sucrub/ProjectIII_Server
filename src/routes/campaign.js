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

router.delete(
  "/campaign/delete-campaign/:campaignId",
  auth,
  asyncMiddleware(campaignController.deleteCampaign)
);

router.post(
  "/campaign/add-user",
  auth,
  asyncMiddleware(campaignController.addMember)
);

router.delete(
  "/campaign/delete-member",
  auth,
  asyncMiddleware(campaignController.deleteMember)
);

router.get(
  "/campaign/get-all-member/:campaignId",
  auth,
  asyncMiddleware(campaignController.getAllMember)
);

router.post(
  "/campaign/change-member-role",
  auth,
  asyncMiddleware(campaignController.changeMemberRole)
);

router.get(
  "/campaign/get-my-campaigns",
  auth,
  asyncMiddleware(campaignController.getMyCampaign)
);

router.put(
  "/campaign/update-campaign/:campaignId",
  auth,
  asyncMiddleware(campaignController.updateCampaign)
);

module.exports = router;
