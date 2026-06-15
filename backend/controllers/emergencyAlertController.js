// controllers/emergencyAlertController.js
import { io } from "../server.js";
import { EmergencyAlertModel } from "../models/emergencyAlert.js";

// ================= BROADCAST EMERGENCY ALERT =================

export const broadcastEmergencyAlert = async (req, res) => {
  try {
    const { bloodGroup, location, hospital, urgency, message } = req.body;

    // Save to DB
    const alert = await EmergencyAlertModel.create({
      bloodGroup,
      location: location || "Unknown",
      message: message || `Urgent: ${bloodGroup} blood required`,
      requester: req.user.id,
      status: "ACTIVE",
    });

    // Broadcast via socket
    io.emit("emergency-alert", {
      _id: alert._id,
      bloodGroup,
      location,
      hospital,
      urgency,
      message,
      createdAt: alert.createdAt,
    });

    return res.status(200).json({
      success: true,
      message: "Emergency alert broadcasted",
      alert,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL ALERTS =================

export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await EmergencyAlertModel.find()
      .populate("requester", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      alerts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};