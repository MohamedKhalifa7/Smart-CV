import { StatusCodes } from "http-status-codes";
import User from "../models/userModel";
import { RegisterParams, LoginParams } from "../types/user.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Register
export const register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: RegisterParams) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpires,
    });

    try {
      await transporter.sendMail({
        from: `"Smart CV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification - Your OTP Code",
        html: `
          <h2>Welcome to Smart CV!</h2>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `,
      });
      console.log("Verification email sent successfully");
    } catch (emailError) {
      console.error("Email sending error details:", emailError);
      await User.findByIdAndDelete(user._id);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        error: {
          message: "Failed to send verification email. Please try again.",
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      message: "Registration successful. Check your email for the OTP.",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Registration failed" },
    };
  }
};

// Login
export const login = async ({ email, password }: LoginParams) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Invalid email"  },
    };
  }

  if (user.otp) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Please verify your email first" },
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Incorrect password" },
    };
  }

  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    proExpiresAt: user.proExpiresAt ? user.proExpiresAt.getTime() : null,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_Key || "jwt_secret", {
    expiresIn: "1d",
  });

  return {
    status: StatusCodes.OK,
    message: "Login successful",
    token,
    userId: user._id,
    email: user.email,
    role: user.role,
    proExpiresAt: user.proExpiresAt ? user.proExpiresAt.getTime() : null,
  };
};

export const resendOTP = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "User not found" },
      };
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    try {
      await transporter.sendMail({
        from: `"Smart CV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification - Your New OTP Code",
        html: `
          <h2>Welcome to Smart CV!</h2>
          <p>Your new verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `,
      });

      return {
        status: StatusCodes.OK,
        message: "New OTP sent successfully",
      };
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        error: { message: "Failed to send new OTP. Please try again." },
      };
    }
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: { message: "Failed to resend OTP" },
    };
  }
};

export const updatePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);
  if (!user || !user.password) {
    return {
      status: StatusCodes.NOT_FOUND,
      error: { message: "User not found" },
    };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "old password is incorrect" },
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return {
    status: StatusCodes.OK,
    message: "Password updated successfully",
  };
};
