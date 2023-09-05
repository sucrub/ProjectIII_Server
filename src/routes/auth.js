const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const {
  loginValidate,
  registerValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
} = require("../validations/auth");
const authController = require("../controllers/auth");

router.post(
  "/auths/register",
  registerValidate,
  asyncMiddleware(authController.register)
);
router.post(
  "/auths/login",
  loginValidate,
  asyncMiddleware(authController.login)
);
router.get(
  "/auths/verify",
  auth,
  asyncMiddleware(authController.verifyAccessToken)
);
router.post(
  "/auths/refresh-token",
  asyncMiddleware(authController.refreshToken)
);
router.post(
  "/auths/forgot-password",
  forgotPasswordValidate,
  asyncMiddleware(authController.forgotPassword)
);
router.post(
  "/auths/reset-password/:token",
  resetPasswordValidate,
  asyncMiddleware(authController.resetPassword)
);
router.post(
  "/auths/check-permission",
  auth,
  asyncMiddleware(authController.checkPermission)
);

module.exports = router;
