import { Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    unitsRequired: {
      type: Number,
      required: [true, "Units required is mandatory"],
    },

    hospitalName: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },

    hospitalAddress: {
      type: String,
      required: [true, "Hospital address is required"],
      trim: true,
    },

    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },

    urgency: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "HIGH",
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },

    additionalNotes: {
      type: String,
      trim: true,
    },
    responders: [
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    respondedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        "RESPONDED",
        "CONTACTED",
        "FULFILLED",
      ],
      default: "RESPONDED",
    },
  },
],
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);

export const RequestModel = model("request", requestSchema);