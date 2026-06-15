import { useState } from "react";

import axiosInstance from "../api/axios";

import toast from "react-hot-toast";

function SOSModal({
  isOpen,
  onClose,
}) {

  const [bloodGroup, setBloodGroup] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    // validation
    if (
      !bloodGroup ||
      !location ||
      !message
    ) {

      toast.error(
        "All fields are required"
      );

      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.post(
        "/emergency-alerts/broadcast",
          {
            bloodGroup,
            location,
            message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

      // clear fields
      setBloodGroup("");
      setLocation("");
      setMessage("");

      // close modal
      onClose();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to send SOS"
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= CLOSE =================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold text-red-600">
            🆘 Emergency SOS
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-600"
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* BLOOD GROUP */}
          <select
            value={bloodGroup}
            onChange={(e) =>
              setBloodGroup(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          >
            <option value="">
              Select Blood Group
            </option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>

          </select>

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          {/* MESSAGE */}
          <textarea
            placeholder="Describe emergency..."
            rows="4"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            {loading
              ? "Broadcasting..."
              : "🚨 Broadcast SOS"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default SOSModal;