import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { getUserProfile, updateProfile, toggleFollow, updateSettings } from "../controllers/profileController.js";
import multer from "multer";

const router = express.Router();

router.get("/:id", protect, getUserProfile);
router.put(
    "/",
    protect,
    upload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "coverPic", maxCount: 1 }
    ]),
    updateProfile
);
router.put("/settings", protect, updateSettings);
router.put("/:id/follow", protect, toggleFollow);

export default router;