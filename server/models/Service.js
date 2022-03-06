const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: {
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
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "Provide userId"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
