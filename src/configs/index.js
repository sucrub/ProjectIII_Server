const { A_WEEK } = require("../constants");
const { formatNumber } = require("../utils/number");

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  PEPPER: process.env.PEPPER,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_EXPIRES_TIME: process.env.JWT_REFRESH_EXPIRES_TIME,
  JWT_EXPIRES_TIME: formatNumber(process.env.JWT_EXPIRES_TIME, A_WEEK),
  NOTIFICATION_URL: process.env.NOTIFICATION_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};
