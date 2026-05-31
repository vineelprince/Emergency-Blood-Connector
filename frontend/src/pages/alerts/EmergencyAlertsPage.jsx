import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import socket from "../../socket";
import toast from "react-hot-toast";

function EmergencyAlertsPage() {
  const [alerts, setAlerts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH ALERTS =================

  const fetchAlerts = async () => {
    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.get(
          "/emergency-alerts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setAlerts(response.data.alerts);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // ================= USE EFFECT =================

useEffect(() => {

  fetchAlerts();

  // realtime listener
  socket.on(
    "newEmergencyAlert",
    (newAlert) => {

      setAlerts((prev) => [
        newAlert,
        ...prev,
      ]);

      toast.success(
        "🚨 New Emergency Alert"
      );
    }
  );

  return () => {
    socket.off(
      "newEmergencyAlert"
    );
  };

}, []);


  return (
    <div className="min-h-screen bg-red-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Emergency Alerts 🚨
          </h1>

          <p className="text-gray-600">
            Monitor active emergency blood alerts.
          </p>

        </div>

        {/* LOADING */}
        {loading ? (
          <Loader />
        ) : alerts.length === 0 ? (

          <EmptyState
            icon="🚨"
            title="No Emergency Alerts"
            description="No active emergency alerts currently."
          />

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {alerts.map((alert) => (

              <div
                key={alert._id}
                className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-red-600"
              >

                {/* STATUS */}
                <div className="flex items-center justify-between mb-4">

                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {alert.status}
                  </span>

                  <span className="text-sm text-gray-500">
                    🚨 Emergency
                  </span>

                </div>

                {/* BLOOD GROUP */}
                <h2 className="text-3xl font-bold text-red-600 mb-4">
                  {alert.bloodGroup}
                </h2>

                {/* DETAILS */}
                <div className="space-y-3 text-gray-700">

                  <p>
                    📍 Location:
                    <span className="font-semibold">
                      {" "}
                      {alert.location?.address}
                    </span>
                  </p>

                  <p>
                    📝 Message:
                    <span className="font-semibold">
                      {" "}
                      {alert.message}
                    </span>
                  </p>

                  <p>
                    👤 Requested By:
                    <span className="font-semibold">
                      {" "}
                      {alert.requester?.firstName}{" "}
                      {alert.requester?.lastName}
                    </span>
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default EmergencyAlertsPage;