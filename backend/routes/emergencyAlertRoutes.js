import express from "express";

import {
  broadcastEmergencyAlert,
} from "../controllers/emergencyAlertController.js";

import {
  verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/broadcast",
  verifyToken,
  broadcastEmergencyAlert
);

export default router;