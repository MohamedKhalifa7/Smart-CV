import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "../config/passportConfig";

const router = Router();
import {
  register,
  login,
  logout,
  verifyOTP,
  resendOTP,
  getCurrentUser,
  upgradeToPro,
  updatePassword,
} from "../controllers/authController";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware";
import { authenticateToken } from "../middleware/validateJWTMiddleware";
import User from "../models/userModel";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.get("/verify-token", authenticateToken, getCurrentUser);
router.post("/upgrade", upgradeToPro);
router.post("/update-password", authenticateToken, updatePassword);

// Google OAuth routes

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      process.env.NODE_ENV === "production"
        ? "https://smart-cv-mu.vercel.app/login"
        : "http://localhost:5173/login",
  }),
  async (req: any, res) => {
    console.log("User info from Google OAuth:", req.user);

    try {
      const user = req.user;

      const dbUser = await User.findById(user._id);

      if (!dbUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userData = {
        id: dbUser._id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        role: dbUser.role,
        proExpiresAt: dbUser.proExpiresAt
          ? dbUser.proExpiresAt.getTime()
          : null,
      };

      const token = jwt.sign(
        {
          userId: dbUser._id,
          email: dbUser.email,
          role: dbUser.role,
          proExpiresAt: dbUser.proExpiresAt
            ? dbUser.proExpiresAt.getTime()
            : null,
        },
        process.env.JWT_SECRET_Key || "jwt_secret",
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: process.env.NODE_ENV === "production"?"none":"strict",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      res.redirect(
        process.env.NODE_ENV === "production"
          ? `https://smart-cv-mu.vercel.app/auth/success?token=${token}&user=${encodeURIComponent(
              JSON.stringify(userData)
            )}`
          : `http://localhost:5173/auth/success?token=${token}&user=${encodeURIComponent(
              JSON.stringify(userData)
            )}`
      );
    } catch (error) {
      console.error("Error in Google OAuth callback:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
