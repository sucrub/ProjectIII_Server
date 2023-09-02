const { ObjectId } = require("mongoose").Types;
const Task = require("../models/task");
const Campaign = require("../models/campaign");
const User = require("../models/user");
const Member = require("../models/member");

const createTask = async (data) => {
  // Step 1: Check if the campaign exists
  const existCampaign = await Campaign.findById(data.campaignId);
  if (!existCampaign) {
    throw new Error("Campaign not found");
  }

  // Step 2: Find User IDs for each member
  const memberIds = [];
  for (const memberEmail of data.member) {
    const user = await User.findOne({ email: memberEmail });
    if (!user) {
      throw new Error(`User with email ${memberEmail} not found`);
    }

    // Check if the user is associated with the provided campaign
    const isUserInCampaign = await Member.findOne({
      campaignId: data.campaignId,
      userId: user._id.toString(),
    });
    if (!isUserInCampaign) {
      throw new Error(
        `User with email ${memberEmail} is not associated with the provided campaign`
      );
    }

    memberIds.push(user._id);
  }

  // Step 3: Create the task and assign to campaign and members
  const taskData = new Task({
    name: data.name,
    campaignId: data.campaignId,
    status: data.status,
    deadline: new Date(data.deadline),
    progress: data.progress,
    details: data.details,
    member: memberIds,
  });

  try {
    const task = await Task.create(taskData);
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTaskByCampaignId = async (campaignId) => {
  const tasks = await Task.find({ campaignId: campaignId });

  const updatedTasks = await Promise.all(
    tasks.map(async (task) => {
      const userEmails = [];

      for (const userId of task.member) {
        const user = await User.findById(userId);
        if (user) {
          userEmails.push(user.email);
        }
      }

      const taskObject = task.toObject();
      taskObject.userEmails = userEmails;

      return taskObject;
    })
  );

  return updatedTasks;
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  const userEmails = [];

  for (const userId of task.member) {
    const user = await User.findById(userId);
    if (user) {
      userEmails.push(user.email);
    }
  }

  const result = task.toObject();
  result.userEmails = userEmails;
  return result;
};

const getMyTask = async (userId) => {
  const tasks = await Task.find({ member: userId });
  const updatedTasks = await Promise.all(
    tasks.map(async (task) => {
      const userEmails = [];

      for (const userId of task.member) {
        const user = await User.findById(userId);
        if (user) {
          userEmails.push(user.email);
        }
      }

      const taskObject = task.toObject();
      taskObject.userEmails = userEmails;

      return taskObject;
    })
  );

  return updatedTasks;
};

const updateTask = async (taskId, data) => {
  const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
  return task;
};

const deleteTask = async (taskId) => {
  await Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTaskByCampaignId,
  getMyTask,
  updateTask,
  deleteTask,
  getTaskById,
};
