import { HospitalModel } from "../models/hospital.js";

// ================= CREATE HOSPITAL =================

export const createHospital = async (
  req,
  res
) => {
  try {

    const hospital =
      await HospitalModel.create(req.body);

    return res.status(201).json({
      success: true,
      message:
        "Hospital added successfully",
      hospital,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET HOSPITALS =================

export const getHospitals = async (
  req,
  res
) => {
  try {

    const { bloodGroup, location } =
      req.query;

    let filter = {
      emergencyAvailable: true,
    };

    // blood group filter
    if (bloodGroup) {
      filter.supportedBloodGroups =
        bloodGroup;
    }

    // location filter
    if (location) {
      filter["location.address"] = {
        $regex: location,
        $options: "i",
      };
    }

    const hospitals =
      await HospitalModel.find(filter);

    return res.status(200).json({
      success: true,
      totalHospitals:
        hospitals.length,
      hospitals,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};