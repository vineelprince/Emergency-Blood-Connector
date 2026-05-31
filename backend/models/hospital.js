import { Schema, model } from "mongoose";

import locationSchema from "../utils/locationSchema.js";

import phoneSchema from "../utils/phoneSchema.js";

const hospitalSchema = new Schema(
  {
    hospitalName: {
      type: String,
      required: true,
    },

    hospitalCode: {
      type: String,
      unique: true,
    },

    location: locationSchema,

    contact: phoneSchema,

    emergencyAvailable: {
      type: Boolean,
      default: true,
    },

    ambulanceAvailable: {
      type: Boolean,
      default: false,
    },

    bloodBankAvailable: {
      type: Boolean,
      default: false,
    },

    supportedBloodGroups: [
      {
        type: String,
      },
    ],

    specialties: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const HospitalModel = model(
  "hospital",
  hospitalSchema
);