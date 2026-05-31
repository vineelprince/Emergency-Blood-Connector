import mongoose from "mongoose";

const phoneSchema =
  new mongoose.Schema(
    {
      countryCode: {
        type: String,
        default: "+91",
      },

      phoneNumber: {
        type: String,
        required: true,
      },

      whatsappNumber: {
        type: String,
      },

      emergencyLine: {
        type: String,
      },
    },
    {
      _id: false,
    }
  );

export default phoneSchema;