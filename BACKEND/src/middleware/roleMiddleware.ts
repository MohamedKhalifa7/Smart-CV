import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "./validateJWTMiddleware";

export const requireProUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }

  if (user?.role !== "pro user") {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Access restricted to Pro Users only." });
    return;
  }

  next();
};
