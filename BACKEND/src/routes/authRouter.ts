import { Router } from "express";
import passport from "passport";
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
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res
      .status(200)
      .json({ message: "Google login successful", user: req.user });
  }
);

export default router;
