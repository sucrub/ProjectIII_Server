const { ObjectId } = require("mongoose").Types;
const Member = require("../models/member");
const User = require("../models/user");
const roleDao = require("./role");
const { find } = require("./utils/find");

const createMember = async (createFields) => {
  const member = await Member.create(createFields);
  return member;
};

const findMember = async (conditions) => {
  const member = Member.findOne(conditions);
  return member;
};

const deleteMember = async (id) => {
  await Member.findByIdAndDelete(id);
};

const getAllAdmins = async (conditions) => {
  const searchCondition = {
    ...conditions,
    searchFields: ["roleId"],
    query: {
      roleId: "64afa9ba19b30cfea8600b26", // Specific roleId value
    },
  };
  const admins = await find(Member, searchCondition);

  let adminsWithUserDetails = await Promise.all(
    admins.documents.map(async (admin) => {
      const user = await User.findOne(
        { _id: admin.userId },
        { email: 1 }
      ).lean();
      return user;
    })
  );

  return {
    data: adminsWithUserDetails,
    total: admins.total,
  };
};

const isAdmin = async (userId) => {
  const user = await Member.findOne({
    userId,
    roleId: "64afa9ba19b30cfea8600b26",
  });
  return user;
};

const addMember = async (userId, campaignId, roleId) => {
  const member = await Member.create({
    campaignId,
    userId,
    roleId,
  });
  return member;
};

const getRoleId = async (userId, campaignId) => {
  const campaign = await Member.findOne({
    userId,
    campaignId,
  });
  return campaign.roleId;
};

const findExistMember = async (userId, campaignId) => {
  const member = await Member.findOne({
    userId,
    campaignId,
  });
  if (member === null) return false;
  return true;
};

const deleteMemberFromCampaign = async (data) => {
  await Member.deleteOne(data);
};

const getAllMember = async (campaignId) => {
  const members = await Member.find({
    campaignId,
  });
  return members;
};

const changeMemberRole = async (userId, campaignId, role) => {
  const roleId = await roleDao.getRoleIdByName(role);
  const member = await Member.findOneAndUpdate(
    { userId: userId, campaignId: campaignId },
    { $set: { roleId: roleId } },
    { new: true }
  );
  return member;
};

const userFindCampaign = async (userId) => {
  const campaigns = await Member.find({
    userId,
  });
  return campaigns;
};

const deleteAdmin = async (id) => {
  await Member.findOneAndDelete({
    userId: id,
    roleId: "64afa9ba19b30cfea8600b26",
  });
};

const getRoleInCampaign = async (userId, campaignId) => {
  const result = await Member.findOne({
    userId,
    campaignId,
  });
  return result.roleId;
};

const isMember = async (userId, campaignId) => {
  const result = await Member.findOne({
    userId,
    campaignId,
  });
  if (result) return "Yes";
  else return "No";
};

module.exports = {
  createMember,
  findMember,
  deleteMember,
  getAllAdmins,
  addMember,
  getRoleId,
  findExistMember,
  deleteMemberFromCampaign,
  getAllMember,
  changeMemberRole,
  userFindCampaign,
  deleteAdmin,
  isAdmin,
  getRoleInCampaign,
  isMember,
};
