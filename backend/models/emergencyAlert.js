import { Schema, model } from "mongoose";

const emergencyAlertSchema =
  new Schema(
    {
      bloodGroup: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      requester: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "RESOLVED",
        ],
        default: "ACTIVE",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export const EmergencyAlertModel =
  model(
    "emergencyalert",
    emergencyAlertSchema
  );