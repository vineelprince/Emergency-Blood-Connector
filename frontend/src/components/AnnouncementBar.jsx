function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white border-b border-red-500 overflow-hidden">
      <div className="py-2 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        <span className="mx-8 font-medium">
          🚀 Emergency Blood Connector Platform is actively under development.
        </span>

        <span className="mx-8">
          • Real-Time Donor Matching Coming Soon
        </span>

        <span className="mx-8">
          • AI-Powered Emergency Alerts Coming Soon
        </span>

        <span className="mx-8">
          • Live Hospital Availability Tracking Coming Soon
        </span>

        <span className="mx-8">
          • Blood Bank Integration Coming Soon
        </span>

        <span className="mx-8">
          • Mobile App Launch Coming Soon
        </span>

        <span className="mx-8 font-semibold">
          • Version 2.0 Currently In Development
        </span>
      </div>
    </div>
  );
}

export default AnnouncementBar;
