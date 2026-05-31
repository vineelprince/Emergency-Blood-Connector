function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-gray-900 border-b border-amber-600 overflow-hidden">
      <div className="py-3 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        <span className="mx-8 font-bold text-lg">
          ⚙️ This project is under development
        </span>

        <span className="mx-8 font-bold text-lg">
          🔔 Platform Update: Emergency Blood Connector is currently in Beta. Upcoming releases include AI-powered donor recommendations, real-time emergency alerts, hospital and blood bank integration, geolocation-based donor discovery, mobile applications, advanced analytics, and enhanced emergency response capabilities.
        </span>
      </div>
    </div>
  );
}

export default AnnouncementBar;
