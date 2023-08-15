const { ObjectId } = require("mongoose").Types;
const Member = require("../models/member");
const User = require("../models/user");
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

  const adminsWithUserDetails = await Promise.all(
    admins.documents.map(async (admin) => {
      const user = await User.findOne(
        { _id: admin.userId },
        { email: 1, firstName: 1, lastName: 1 }
      ).lean();
      return {
        ...admin,
        user,
      };
    })
  );

  return adminsWithUserDetails;
};

module.exports = {
  createMember,
  findMember,
  deleteMember,
  getAllAdmins,
};
