import { StatusCodes } from "http-status-codes";
import User from "../models/userModel";
import { RegisterParams, LoginParams } from "../types/user.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: RegisterParams) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  return {
    status: StatusCodes.CREATED,
    message: "Registration successful",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};

// Login
export const login = async ({ email, password }: LoginParams) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Invalid credentials" },
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      error: { message: "Invalid credentials" },
    };
  }

  const payload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_Key || "jwt_secret", {
    expiresIn: "1d",
  });

  return {
    status: StatusCodes.OK,
    message: "Login successful",
    token,
  };
};
