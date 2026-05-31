import { UserModel } from "../models/users.js";
import { RequestModel } from "../models/request.js";

export const getDashboardStats = async (req, res) => {
  try {

    // total donors
    const totalDonors = await UserModel.countDocuments({
      role: "DONOR",
    });

    // available donors
    const availableDonors = await UserModel.countDocuments({
      role: "DONOR",
      availability: true,
    });

    // total requests
    const totalRequests =
      await RequestModel.countDocuments();

    // my requests
    const myRequests =
      await RequestModel.countDocuments({
        requester: req.user.id,
      });

    return res.status(200).json({
      success: true,

      stats: {
        totalDonors,
        availableDonors,
        totalRequests,
        myRequests,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};