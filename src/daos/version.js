const { ObjectId } = require("mongoose").Types;
const Version = require("../models/version");

const getLastestVersion = async (conditions) => {
  const latestVersion = await Version.findOne(conditions).sort({
    version: -1,
  });
  return latestVersion;
};

const createVersion = async (createFields) => {
  const campaignVersion = await Version.create(createFields);
  return campaignVersion;
};

module.exports = {
  createVersion,
  getLastestVersion,
};
