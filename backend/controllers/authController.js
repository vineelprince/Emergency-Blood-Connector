import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/users.js";


// ================= REGISTER USER =================

export const registerUser = async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      password,
      contact,
      bloodGroup,
      location,
      role,
    } = req.body;

    // ================= CHECK EXISTING USER =================

    const existingUser =
      await UserModel.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    // ================= HASH PASSWORD =================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // ================= CREATE USER =================

    const user =
      await UserModel.create({
        firstName,
        lastName,
        email,
        password:
          hashedPassword,
        contact,
        bloodGroup,
        location,
        role,
      });

    // ================= REMOVE PASSWORD =================

    user.password = undefined;

    // ================= GENERATE JWT =================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN USER =================

export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // ================= CHECK USER EXISTS =================

    const user =
      await UserModel.findOne({
        email,
      });

    if (!user) {

      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    // ================= COMPARE PASSWORD =================

    const isPasswordMatched =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordMatched) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    // ================= REMOVE PASSWORD =================

    user.password = undefined;

    // ================= GENERATE TOKEN =================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Login successful",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};