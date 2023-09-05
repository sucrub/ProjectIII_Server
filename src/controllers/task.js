const taskService = require("../services/task");

const createTask = async (req, res) => {
  const data = req.body;
  const task = await taskService.createTask(data);
  return res.send({ status: 1, result: { task } });
};

const getTaskByCampaignId = async (req, res) => {
  const { campaignId } = req.params;
  const tasks = await taskService.getTaskByCampaignId(campaignId);
  return res.send({ status: 1, result: { tasks } });
};

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const task = await taskService.getTaskById(taskId);
  return res.send({ status: 1, result: { task } });
};

const getMyTask = async (req, res) => {
  const userId = req.userId;
  const tasks = await taskService.getMyTask(userId);
  return res.send({ status: 1, result: { tasks } });
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const data = req.body;
  const task = await taskService.updateTask(taskId, data);
  return res.send({ status: 1, result: { task } });
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await taskService.deleteTask(taskId);
  return res.send({ status: 1 });
};

const isMember = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.userId;
  const result = await taskService.isMember(userId, taskId);
  return res.send(result);
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
