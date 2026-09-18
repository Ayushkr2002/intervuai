import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  googleCallback,
  
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import passport from "../services/googleAuth.service.js";




const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me",protect, getMe);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  googleCallback
);

export default router;