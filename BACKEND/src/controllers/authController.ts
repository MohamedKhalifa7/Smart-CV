import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../middleware/validateJWTMiddleware";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
  const result = await userService.register(req.body);
  res.status(result.status).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await userService.login(req.body);

  if (result.status === 200) {
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    });

    res.status(result.status).json({
      message: result.message,
      token: result.token,
      user: {
        userId: result.userId,
        email: result.email,
        role: result.role,
        proExpiresAt: result.proExpiresAt,
      },
    });
  } else {
    res.status(result.status).json(result);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    if (user.otp !== otp) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid OTP" });
      return;
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "OTP has expired" });
      return;
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(StatusCodes.OK).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await userService.resendOTP(email);
  res.status(result.status).json(result);
};

export const getCurrentUser = (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  if (!customReq.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.status(200).json({
    user: customReq.user,
    token: req.cookies.token,
  });
};

export const upgradeToPro = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const oneMonthPeriod = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
 

  const user = await User.findByIdAndUpdate(
    userId,
    { role: "pro user",proExpiresAt:oneMonthPeriod },
    { new: true },

  );

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const token = jwt.sign(
    {
      userId:user._id,
      email:user.email,
      role:user.role,
      proExpiresAt:oneMonthPeriod
    },
    process.env.JWT_SECRET_Key || "jwt_secret",
    { expiresIn: "1d" }
  )


  res.json({
    message: "User upgraded to Pro successfully",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      proExpiresAt:oneMonthPeriod
    },
    token
  });
};
