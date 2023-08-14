const { ObjectId } = require("mongoose").Types;

const validateObjectId = (key, value, helpers) => {
  if (!ObjectId.isValid(value) || String(new ObjectId(value)) !== value) {
    return helpers.error("any.invalid");
  }
  return value;
};

module.exports = {
  validateObjectId,
};
