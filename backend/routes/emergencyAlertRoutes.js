import express from "express";

import {
  broadcastEmergencyAlert,
  getEmergencyAlerts,
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

router.post(
  "/",
  verifyToken,
  broadcastEmergencyAlert
);

router.get(
  "/",
  verifyToken,
  getEmergencyAlerts
);

export default router;