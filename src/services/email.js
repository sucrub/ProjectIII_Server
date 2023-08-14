const callApi = require("../utils/callApi");
const logger = require("http-logger/src/logger");

const { NOTIFICATION_URL } = require("../configs");

const sendEmail = async (payload) => {
  try {
    const sendMail = await callApi({
      method: "POST",
      url: `${NOTIFICATION_URL}/api/v1/mail/send-mail`,
      data: payload,
    });
    return !sendMail?.error ?? false;
  } catch (error) {
    logger.error(error, { ctx: "SendEmail" });
    return null;
  }
};

module.exports = {
  sendEmail,
};
