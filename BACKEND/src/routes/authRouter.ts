import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "../config/passportConfig";

const router = Router();
import { register, login, logout } from "../controllers/authController";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req: any, res) => {
    const user = req.user;
    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_Key || "jwt_secret",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `http://localhost:5173/auth/success?token=${token}&user=${encodeURIComponent(
        JSON.stringify(userData)
      )}`
    );
  }
);

export default router;
