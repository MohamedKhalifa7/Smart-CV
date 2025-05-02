import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    role: {
      type: String,
      enum: ["normal user", "pro user"],
      default: "normal user",
    },
    proExpiresAt: { type: Date },
    googleId: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
