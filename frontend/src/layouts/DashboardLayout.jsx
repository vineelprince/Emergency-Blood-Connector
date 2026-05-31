import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FloatingEmergencyButtons from "../components/FloatingEmergencyButtons";
import EmergencyNotificationModal from "../components/EmergencyNotificationModal";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <EmergencyNotificationModal />

      {/* GLOBAL NAVBAR */}
      <Navbar />

      <div className="flex">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed lg:sticky top-20 left-0
            z-50 h-[calc(100vh-80px)]
            transform transition-transform duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
            lg:translate-x-0
          `}
        >
          <Sidebar
            closeSidebar={() =>
              setSidebarOpen(false)
            }
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-h-screen">

          {/* MOBILE DASHBOARD HEADER */}
          <div className="lg:hidden bg-white border-b border-gray-100 p-4 flex justify-between items-center">

            <h2 className="font-bold text-[#130a0c]">
              Dashboard
            </h2>

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="text-2xl"
            >
              ☰
            </button>

          </div>

          <main>
            {children}
          </main>

        </div>

      </div>

      <FloatingEmergencyButtons />

    </div>
  );
}

export default DashboardLayout;
