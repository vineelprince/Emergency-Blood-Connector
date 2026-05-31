import { UserModel } from "../models/users.js";


// ================= GET MY PROFILE =================

export const getMyProfile =
  async (req, res) => {

    try {

      const user =
        await UserModel.findById(
          req.user.id
        ).select("-password");

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      return res.status(200).json({
        success: true,
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


// ================= UPDATE PROFILE =================

export const updateProfile =
  async (req, res) => {

    try {

      const {
        firstName,
        lastName,
        contact,
        location,
        availability,
      } = req.body;

      const updatedUser =
        await UserModel.findByIdAndUpdate(

          req.user.id,

          {
            firstName,
            lastName,
            contact,
            location,
            availability,
          },

          {
            new: true,
            runValidators: true,
          }

        ).select("-password");

      return res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        user: updatedUser,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// ================= GET DONORS =================

export const getAllDonors =
  async (req, res) => {

    try {

      const donors =
        await UserModel.find({
          role: "DONOR",
        });

      return res.status(200).json({
        success: true,
        totalDonors:
          donors.length,
        donors,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };