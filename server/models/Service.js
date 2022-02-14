const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    act: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviewed: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "approved", "denied"],
        default: "pending",
      },
    },
    proof: {
      type: String,
    },
    hours: {
      type: String,
      required: true,
    },
    userID: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "Provide userID"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
