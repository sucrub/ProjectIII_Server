const { Joi, validate } = require("express-validation");
const { validateObjectId } = require("./utils");

const createCampaign = {
  body: Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  }),
};

const getCampaignById = {
  params: Joi.object({
    campaignId: Joi.string()
      .custom((value, helpers) =>
        validateObjectId("campaignId", value, helpers)
      )
      .messages({
        "any.invalid": "campaignId must be a valid objectId",
      }),
  }),
};

module.exports = {
  createCampaignValidate: validate(createCampaign, { keyByField: true }),
  getCampaignByIdValidate: validate(getCampaignById, { keyByField: true }),
};
