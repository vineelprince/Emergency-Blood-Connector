import mongoose from "mongoose";

const locationSchema =
  new mongoose.Schema(
    {
      country: {
        type: String,
        default: "India",
      },

      state: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      area: {
        type: String,
      },

      pincode: {
        type: String,
      },

      address: {
        type: String,
      },

      latitude: {
        type: Number,
      },

      longitude: {
        type: Number,
      },
    },
    {
      _id: false,
    }
  );

export default locationSchema;