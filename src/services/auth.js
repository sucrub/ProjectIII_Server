const jwt = require("jsonwebtoken");

const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");

const userDao = require("../daos/user");

const fs = require("fs").promises;

const { generateRandomString } = require("../utils/random");
const {
  generateSalt,
  encryptPassword,
  comparePassword,
} = require("../utils/security");

const {
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
  JWT_REFRESH_EXPIRES_TIME,
  CLIENT_URL,
} = require("../configs");
const { sendEmail } = require("./email");

const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const generateRefreshToken = async (userId) => {
  const refreshToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_REFRESH_EXPIRES_TIME,
  });
  return refreshToken;
};

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const userId = user._id;
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { userId } = data;
  const user = await userDao.findUser(userId);
  return user;
};

const refreshToken = async (refreshToken) => {
  const decoded = await jwt.verify(refreshToken, JWT_SECRET_KEY);
  const userId = decoded.userId;
  const newAccessToken = await generateAccessToken(userId);
  return newAccessToken;
};

const register = async ({ email, firstName, lastName, password }) => {
  let user = await userDao.findUser({ email });
  if (user) throw new CustomError(errorCodes.USER_EXISTS);

  const salt = generateSalt();
  password = password || generateRandomString(16);
  password = await encryptPassword(password, salt);

  user = await userDao.createUser({ email, firstName, lastName, password });
  return user;
};

const forgotPassword = async (email) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const payload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "15m" });
  const link = `${CLIENT_URL}/reset-password/${token}`;
  const mailContent = "src/notification/resetPassword.ejs";

  let content = await fs.readFile(mailContent, "utf-8");
  content = content.replace('href="RESETLINK"', `href="${link}"`);

  const dataSend = {
    to: user.email,
    from: "AICC",
    subject: "RESET PASSWORD",
    html: content,
  };
  await sendEmail(dataSend);
  return token;
};

const resetPassword = async (token, password) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    const user = await userDao.findUser(payload.id);
    if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

    const salt = generateSalt();
    password = password || generateRandomString(16);
    password = await encryptPassword(password, salt);

    const data = {
      password,
    };
    await userDao.updateUser(payload.id, data);
    const updateUser = await userDao.findUser(payload.id);
    return updateUser;
  } catch (error) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }
};

module.exports = {
  login,
  register,
  verifyAccessToken,
  refreshToken,
  forgotPassword,
  resetPassword,
};
