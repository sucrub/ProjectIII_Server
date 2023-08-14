const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: String,
    method: String,
    url: String,
    type: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Permission", permissionSchema);
