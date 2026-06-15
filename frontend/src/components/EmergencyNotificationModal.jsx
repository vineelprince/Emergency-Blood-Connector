import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "../socket";

function EmergencyNotificationModal() {

  const navigate = useNavigate();

  const [alert, setAlert] =
    useState(null);

  useEffect(() => {

    // Browser notification permission
    if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const handleAlert =
      (data) => {

        setAlert(data);

        // Browser Notification
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {

          new Notification(
            "Emergency Blood Alert",
            {
              body:
                `${data.bloodGroup} blood urgently required`,
            }
          );
        }

        // Emergency Sound
        try {

          const audio =
            new Audio(
              "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
            );

          audio.volume = 0.7;

          audio.play();

        } catch (error) {

          console.log(error);
        }

        // Auto Close
        setTimeout(() => {

          setAlert(null);

        }, 15000);
      };

    socket.on(
      "newEmergencyAlert",
      handleAlert
    );

    return () => {

      socket.off(
        "newEmergencyAlert",
        handleAlert
      );
    };

  }, []);

  if (!alert) return null;

  return (

    <div className="fixed top-6 right-6 z-[9999] w-[420px] bg-white rounded-3xl shadow-2xl border border-red-200 overflow-hidden animate-pulse">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Emergency Blood Alert
            </h2>

            <p className="text-sm opacity-90">
              Immediate donor response required
            </p>

          </div>

          <button
            onClick={() =>
              setAlert(null)
            }
            className="text-white text-xl"
          >
            ✕
          </button>

        </div>

      </div>

      {/* BODY */}
      <div className="p-5 space-y-5">

        {/* BLOOD GROUP */}
        <div className="bg-red-50 rounded-2xl p-4">

          <p className="text-xs uppercase text-gray-500 mb-1">
            Blood Group Required
          </p>

          <h3 className="text-4xl font-bold text-red-600">
            {alert.bloodGroup}
          </h3>

        </div>

        {/* LOCATION */}
        <div>

          <p className="text-sm text-gray-500 mb-1">
            Location
          </p>

          <p className="font-semibold text-gray-800">
            {
              alert.location
                ?.address ||
              alert.location
            }
          </p>

        </div>

        {/* MESSAGE */}
        <div>

          <p className="text-sm text-gray-500 mb-1">
            Emergency Details
          </p>

          <p className="text-gray-700">
            {alert.message}
          </p>

        </div>

        {/* TIME */}
        <div className="text-sm text-gray-500">

          Received:
          {" "}
          {new Date().toLocaleTimeString()}

        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() =>
              setAlert(null)
            }
            className="bg-gray-200 hover:bg-gray-300 transition py-3 rounded-xl font-semibold"
          >
            Dismiss
          </button>

          <button
            onClick={() => {

              navigate(
                "/emergency-alerts"
              );

              setAlert(null);
            }}
            className="bg-red-600 hover:bg-red-700 text-white transition py-3 rounded-xl font-semibold"
          >
            Respond Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default EmergencyNotificationModal;