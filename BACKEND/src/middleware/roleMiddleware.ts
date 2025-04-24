import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const requireProUser = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; 

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  if (user.role !== "pro user") {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Access restricted to Pro Users only." });
  }

  next();
};