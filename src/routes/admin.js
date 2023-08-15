const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const {
  addServerAdminValidate,
  getAdminsValidate,
} = require("../validations/admin");
const adminController = require("../controllers/admin");

router.get(
  "/admin/get-all-admin",
  auth,
  getAdminsValidate,
  asyncMiddleware(adminController.getAllAdmins)
);

router.post(
  "/admin/add-server-admin",
  auth,
  addServerAdminValidate,
  asyncMiddleware(adminController.addServerAdmin)
);

router.delete(
  "/admin/delete-server-admin/:adminId",
  auth,
  asyncMiddleware(adminController.deleteServerAdmin)
);

module.exports = router;
