const { ObjectId } = require("mongoose").Types;
const Role = require("../models/role");

const getRoleId = async (conditions) => {
  const result = await Role.findOne(conditions, { _id: 1 });
  const id = result._id;
  return id;
};

module.exports = {
  getRoleId,
};
