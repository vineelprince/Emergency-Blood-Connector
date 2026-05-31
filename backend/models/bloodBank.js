import { Schema, model } from "mongoose";

import locationSchema from "../utils/locationSchema.js";

import phoneSchema from "../utils/phoneSchema.js";

const bloodBankSchema = new Schema(
  {
    bloodBankName: {
      type: String,
      required: true,
    },

    bloodBankCode: {
      type: String,
      unique: true,
    },

    location: locationSchema,

    contact: phoneSchema,

    availableBloodGroups: [
      {
        type: String,
      },
    ],

    availableUnits: {
      type: Number,
      default: 0,
    },

    operating24x7: {
      type: Boolean,
      default: true,
    },

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

export const BloodBankModel = model(
  "bloodbank",
  bloodBankSchema
);