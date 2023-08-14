const codes = require("./code");

const getErrorMessage = (code) => {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return "User is not found";
    case codes.WRONG_PASSWORD:
      return "Wrong password";
    case codes.USER_EXISTS:
      return "User already exists";
    case codes.PERMISSION_EXISTS:
      return "Permission already exists";
    case codes.CAMPAIGN_NOT_FOUND:
      return "Campaign is not found";
    default:
      return null;
  }
};

module.exports = getErrorMessage;
