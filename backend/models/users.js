import { Schema, model } from "mongoose";
import locationSchema from "../utils/locationSchema.js";
import phoneSchema from "../utils/phoneSchema.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    contact: phoneSchema,

    bloodGroup: {
      type: String,
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

    location: locationSchema,

    availability: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["SEEKER", "DONOR", "HOSPITAL", "ADMIN"],
      required: [true, "Role is required"],
      default: "SEEKER",
    },

    profileImageUrl: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);

export const UserModel = model("user", userSchema);