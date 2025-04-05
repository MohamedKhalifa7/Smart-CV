import { Request, Response } from "express";
import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const result = await userService.register(req.body);
  res.status(result.status).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await userService.login(req.body);
  res.status(result.status).json(result);
};
