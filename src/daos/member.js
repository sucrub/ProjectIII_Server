const { ObjectId } = require("mongoose").Types;
const Member = require("../models/member");

const createMember = async (createFields) => {
  const member = await Member.create(createFields);
  return member;
};

const findMember = async (conditions) => {
  const member = Member.findOne(conditions);
  return member;
};

module.exports = {
  createMember,
  findMember,
};
