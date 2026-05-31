
import { RequestModel } from "../models/request.js";
// import { io } from "../server.js";


// ================= CREATE REQUEST =================

export const createRequest = async (req, res) => {
  try {

    const request =
      await RequestModel.create({
        ...req.body,
        requester: req.user.id,
      });

    // io.emit(
    //   "new-request",
    //   request
    // );

    return res.status(201).json({
      success: true,
      message:
        "Emergency blood request created successfully",
      request,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET ALL REQUESTS =================

export const getAllRequests = async (req, res) => {
  try {

    const requests =
      await RequestModel.find()
        .populate(
          "requester",
          "firstName lastName email"
        )
        .populate(
          "responders.donor",
          "firstName lastName bloodGroup contact location"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalRequests:
        requests.length,
      requests,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET MY REQUESTS =================

export const getMyRequests = async (req, res) => {
  try {

    const requests =
      await RequestModel.find({
        requester: req.user.id,
      })
        .populate(
          "responders.donor",
          "firstName lastName bloodGroup contact location"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalRequests:
        requests.length,
      requests,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE REQUEST STATUS =================

export const updateRequestStatus = async (
  req,
  res
) => {
  try {

    const { status } =
      req.body;

    const updatedRequest =
      await RequestModel.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    // io.emit(
    //   "request-status-updated",
    //   {
    //     requestId:
    //       updatedRequest._id,
    //     status:
    //       updatedRequest.status,
    //   }
    // );

    return res.status(200).json({
      success: true,
      message:
        "Request status updated successfully",
      request:
        updatedRequest,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= RECENT REQUESTS =================

export const getRecentRequests =
  async (req, res) => {

    try {

      const requests =
        await RequestModel.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);

      return res.status(200).json({
        success: true,
        requests,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// ================= RESPOND TO REQUEST =================

export const respondToRequest =
  async (req, res) => {

    try {

      const request =
        await RequestModel.findById(
          req.params.id
        );

      if (!request) {

        return res.status(404).json({
          success: false,
          message:
            "Request not found",
        });
      }

      const alreadyResponded =
        request.responders?.find(
          (item) =>
            item.donor.toString() ===
            req.user.id
        );

      if (alreadyResponded) {

        return res.status(400).json({
          success: false,
          message:
            "Already responded",
        });
      }

      request.responders.push({
        donor: req.user.id,
        status: "RESPONDED",
      });

      await request.save();

      // io.emit(
      //   "request-response",
      //   {
      //     requestId:
      //       request._id,
      //     donorId:
      //       req.user.id,
      //   }
      // );

      return res.status(200).json({
        success: true,
        message:
          "Response submitted successfully",
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// ================= GET RESPONDERS =================

export const getRequestResponders =
  async (req, res) => {

    try {

      const request =
        await RequestModel.findById(
          req.params.id
        ).populate(
          "responders.donor",
          "firstName lastName bloodGroup contact location"
        );

      if (!request) {

        return res.status(404).json({
          success: false,
          message:
            "Request not found",
        });
      }

      return res.status(200).json({
        success: true,
        responders:
          request.responders,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };