import express from "express";

import {
  createHospital,
  getHospitals,
} from "../controllers/hospitalController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= CREATE =================

router.post(
  "/",
  verifyToken,
  createHospital
);

// ================= GET =================

router.get(
  "/",
  verifyToken,
  getHospitals
);

export default router;