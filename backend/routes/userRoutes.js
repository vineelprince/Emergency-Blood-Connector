import express from "express";

import {
  getMyProfile,
  updateProfile,
  getAllDonors,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= PROFILE =================

router.get(
  "/profile",
  verifyToken,
  getMyProfile
);

router.put(
  "/profile",
  verifyToken,
  updateProfile
);

// ================= DONORS =================

router.get(
  "/donors",
  verifyToken,
  getAllDonors
);

export default router;