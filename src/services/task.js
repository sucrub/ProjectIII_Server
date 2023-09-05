const taskDao = require("../daos/task");
const createTask = async (data) => {
  const task = await taskDao.createTask(data);
  return task;
};

const getTaskByCampaignId = async (campaignId) => {
  const tasks = await taskDao.getTaskByCampaignId(campaignId);
  return tasks;
};

const getTaskById = async (taskId) => {
  const task = await taskDao.getTaskById(taskId);
  return task;
};

const getMyTask = async (userId) => {
  const tasks = await taskDao.getMyTask(userId);
  return tasks;
};

const updateTask = async (taskId, data) => {
  const task = await taskDao.updateTask(taskId, data);
  return task;
};

const deleteTask = async (taskId) => {
  await taskDao.deleteTask(taskId);
};

const isMember = async (userId, taskId) => {
  const result = await taskDao.isMember(userId, taskId);
  return result;
};

module.exports = {
  createTask,
  getTaskByCampaignId,
  getMyTask,
  updateTask,
  deleteTask,
  getTaskById,
  isMember,
};
