const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const roleController = require("../controllers/role");
const { auth } = require("../middlewares/auth");
const {
  createRoleValidate,
  deleteRoleByIdValidate,
  getRolesValidate,
} = require("../validations/role");

router.post(
  "/role/create-role",
  auth,
  createRoleValidate,
  asyncMiddleware(roleController.createRole)
);

router.delete(
  "/role/delete-role/:roleId",
  auth,
  deleteRoleByIdValidate,
  asyncMiddleware(roleController.deleteRole)
);

router.get(
  "/role/get-all-role",
  auth,
  getRolesValidate,
  asyncMiddleware(roleController.getAllRoles)
);

router.put(
  "/role/set-permissions/:roleId",
  auth,
  asyncMiddleware(roleController.setPermissionsOfRole)
);

module.exports = router;
