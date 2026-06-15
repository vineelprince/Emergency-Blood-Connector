import { io } from "../server.js";
import { EmergencyAlertModel } from "../models/emergencyAlert.js";

export const getEmergencyAlerts =
  async (req, res) => {

    try {

      const alerts =
        await EmergencyAlertModel.find()
          .populate(
            "requester",
            "firstName lastName email"
          )
          .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        totalAlerts: alerts.length,
        alerts,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };

export const broadcastEmergencyAlert =
  async (req, res) => {

    try {

      const {
        bloodGroup,
        location,
        message,
      } = req.body;

      const alert =
        await EmergencyAlertModel.create({
          bloodGroup,
          location,
          message,
          requester: req.user.id,
        });

      await alert.populate(
        "requester",
        "firstName lastName email"
      );

      io.emit(
        "emergency-alert",
        alert
      );

      io.emit(
        "newEmergencyAlert",
        alert
      );

      return res.status(201).json({
        success: true,
        message:
          "Emergency alert broadcasted",
        alert,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };