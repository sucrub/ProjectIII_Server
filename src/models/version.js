const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema(
  {
    campaignId: String,
    title: String,
    content: String,
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Version", versionSchema);
