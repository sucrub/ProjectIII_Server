const mongoose = require("mongoose");
const { CAMPAIGN_STATUS } = require("../constants");

const campaignSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: {
      type: String,
      enum: Object.values(CAMPAIGN_STATUS),
      default: CAMPAIGN_STATUS.DONE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Campaign", campaignSchema);
