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
          className="bg-[#130a0c] hover:bg-black text-white px-5 py-4 rounded-full shadow-2xl font-semibold transition flex items-center gap-2"
        >
          🚨 Alerts
        </button>

        {/* SOS */}
        <button
          onClick={() =>
            setOpenSOS(true)
          }
          className="bg-[#c1121f] hover:bg-[#9b1528] text-white px-5 py-4 rounded-full shadow-2xl font-bold text-lg transition-all duration-300 animate-pulse"
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