const taskDao = require("../daos/task");
const createTask = async (data) => {
  const task = taskDao.createTask(data);
  return task;
};

const getTaskByCampaignId = async (campaignId) => {
  const tasks = taskDao.getTaskByCampaignId(campaignId);
  return tasks;
};

const getMyTask = async (userId) => {
  const tasks = taskDao.getMyTask(userId);
  return tasks;
};

const updateTask = async (taskId, data) => {
  const task = taskDao.updateTask(taskId, data);
  return task;
};

const deleteTask = async (taskId) => {
  await taskDao.deleteTask(taskId);
};

module.exports = {
  createTask,
  getTaskByCampaignId,
  getMyTask,
  updateTask,
  deleteTask,
};
