import { Request, Response } from "express";
import * as userService from "../services/userService";

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
    });
    res.status(result.status).json({ message: result.message });
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
