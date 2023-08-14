const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: String,
    permission: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", roleSchema);
