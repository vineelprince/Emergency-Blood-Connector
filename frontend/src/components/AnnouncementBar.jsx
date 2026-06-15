function AnnouncementBar() {
  return (
    <div className="bg-[#130a0c] text-white border-b border-white/10 overflow-hidden">
      <div className="py-3 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        <span className="mx-8 font-bold text-lg">
          🩸 Emergency blood search, donor discovery, and hospital support in one place
        </span>

        <span className="mx-8 font-semibold text-lg text-white/80">
          Real-time alerts, accessibility-first UI, and faster response flows for
          donors, seekers, and hospitals.
        </span>
      </div>
    </div>
  );
}

export default AnnouncementBar;
