const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const taskController = require("../controllers/task");

router.post(
  "/task/create-task",
  auth,
  asyncMiddleware(taskController.createTask)
);

router.get(
  "/task/get-task-by-id/:taskId",
  auth,
  asyncMiddleware(taskController.getTaskById)
);

router.get(
  "/task/get-task-by-campaign-id/:campaignId",
  auth,
  asyncMiddleware(taskController.getTaskByCampaignId)
);

router.get(
  "/task/get-my-task",
  auth,
  asyncMiddleware(taskController.getMyTask)
);

router.put(
  "/task/update-task/:taskId",
  auth,
  asyncMiddleware(taskController.updateTask)
);

router.delete(
  "/task/delete-task/:taskId",
  auth,
  asyncMiddleware(taskController.deleteTask)
);

module.exports = router;
