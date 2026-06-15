import express from "express";
import {
  broadcastEmergencyAlert,
  getAllAlerts,
} from "../controllers/emergencyAlertController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/broadcast", verifyToken, broadcastEmergencyAlert);
router.get("/", verifyToken, getAllAlerts);

export default router;