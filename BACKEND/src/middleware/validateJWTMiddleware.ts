import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role?: string;
    proExpiresAt?: Date;
  };
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customReq = req as CustomRequest;

  // Log cookies and headers for debugging
  console.log("Cookies:", customReq.cookies);
  console.log("Authorization Header:", customReq.headers.authorization);

  const token =
    customReq.cookies?.token || customReq.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("No token provided");
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_Key || "jwt_secret"
    ) as {
      userId: string;
      email: string;
      role: string;
      proExpiresAt: Date;
    };

    customReq.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      proExpiresAt: decoded.proExpiresAt,
    };
    console.log("user info", customReq.user);

    next();
  } catch (err) {
    console.error("Invalid or expired token:", err);
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
};
