import { io } from "../server.js";

export const broadcastEmergencyAlert =
  async (req, res) => {

    try {

      const {
        bloodGroup,
        location,
        hospital,
        urgency,
        message,
      } = req.body;

      io.emit(
        "emergency-alert",
        {
          bloodGroup,
          location,
          hospital,
          urgency,
          message,
          createdAt: new Date(),
        }
      );

      return res.status(200).json({
        success: true,
        message:
          "Emergency alert broadcasted",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };