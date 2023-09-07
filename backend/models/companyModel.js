const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add founded phone number"],
    },
    foundedYear: {
      type: Number,
      required: [true, "Please add founded Year"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);
