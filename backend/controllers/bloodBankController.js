import { BloodBankModel } from "../models/bloodBank.js";

// ================= CREATE BLOOD BANK =================

export const createBloodBank = async (
  req,
  res
) => {
  try {
    const bloodBank =
      await BloodBankModel.create(req.body);

    return res.status(201).json({
      success: true,
      message:
        "Blood bank added successfully",
      bloodBank,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL BLOOD BANKS =================

export const getBloodBanks = async (
  req,
  res
) => {
  try {
    const { bloodGroup, location } =
      req.query;

    let filter = {
      isActive: true,
    };

    // filter by blood group
    if (bloodGroup) {
      filter.availableBloodGroups = bloodGroup;
    }

    // filter by location
    if (location) {
      filter["location.address"] = {
        $regex: location,
        $options: "i",
      };
    }

    const bloodBanks =
      await BloodBankModel.find(filter);

    return res.status(200).json({
      success: true,
      totalBloodBanks:
        bloodBanks.length,
      bloodBanks,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};