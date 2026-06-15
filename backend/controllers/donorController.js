import { UserModel } from "../models/users.js";


// ================= GET ALL DONORS =================

export const getAllDonors = async (req, res) => {
  try {
    const donors = await UserModel.find({
      role: "DONOR",
      availability: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      totalDonors: donors.length,
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


// ================= SEARCH DONORS =================

export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;

    const query = {
      role: "DONOR",
      availability: true,
    };

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (location) {
      query["location.address"] = {
        $regex: location,
        $options: "i",
      };
    }

    const donors = await UserModel.find(query).select("-password");

    return res.status(200).json({
      success: true,
      totalResults: donors.length,
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