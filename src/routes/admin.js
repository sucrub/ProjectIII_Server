const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const { addServerAdminValidate } = require("../validations/admin");
const adminController = require("../controllers/admin");

router.post(
  "/admin/add-server-admin",
  auth,
  addServerAdminValidate,
  asyncMiddleware(adminController.addServerAdmin)
);

module.exports = router;
