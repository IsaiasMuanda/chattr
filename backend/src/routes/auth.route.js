import express from "express";
import { checkAuth, deleteProfile, getUserProfile, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update", protectRoute, updateProfile);
router.get("/profile/:id", protectRoute, getUserProfile);

router.delete("/delete/:id", protectRoute, deleteProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
