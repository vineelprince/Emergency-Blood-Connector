import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SOSModal from "./SOSModal";

function FloatingEmergencyButtons() {

  const navigate = useNavigate();

  const [openSOS, setOpenSOS] =
    useState(false);

  return (
    <>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

        {/* ALERTS */}
        <button
          onClick={() =>
            navigate("/emergency-alerts")
          }
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-4 rounded-full shadow-2xl font-semibold transition flex items-center gap-2"
        >
          🚨 Alerts
        </button>

        {/* SOS */}
        <button
          onClick={() =>
            setOpenSOS(true)
          }
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-4 rounded-full shadow-2xl font-bold text-lg transition animate-pulse"
        >
          🆘 SOS
        </button>

      </div>

      {/* SOS MODAL */}
      <SOSModal
        isOpen={openSOS}
        onClose={() =>
          setOpenSOS(false)
        }
      />

    </>
  );
}

export default FloatingEmergencyButtons;