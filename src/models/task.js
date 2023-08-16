const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
    campaignId: String,
    status: String,
    deadline: Date,
    progress: Number,
    details: String,
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Task", taskSchema);
