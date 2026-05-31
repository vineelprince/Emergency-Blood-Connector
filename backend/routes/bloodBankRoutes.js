import express from "express";

import {
  createBloodBank,
  getBloodBanks,
} from "../controllers/bloodBankController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= CREATE =================

router.post(
  "/",
  verifyToken,
  createBloodBank
);

// ================= GET =================

router.get(
  "/",
  verifyToken,
  getBloodBanks
);

export default router;