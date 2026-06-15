function WhyChooseUs() {
  const items = [
    {
      title: "Verified profiles",
      desc: "Keep donor, seeker, and hospital data structured and up to date."
    },
    {
      title: "Emergency readiness",
      desc: "Surface the right people fast when every minute matters."
    },
    {
      title: "Hospital network",
      desc: "Search hospitals with supported blood groups and direct contact details."
    },
    {
      title: "Real-time alerts",
      desc: "Broadcast urgent requests across the network instantly."
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c1121f] mb-3">
            Why choose us
          </p>

          <h2 className="text-4xl font-bold mb-4">
            Built for clarity, speed, and accessibility
          </h2>

          <p className="text-gray-600">
            The interface stays clean and the important actions stay visible, even in
            stressful moments.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {items.map((item) => (

            <div
              key={item.title}
              className="matte-panel rounded-[28px] p-8 transition-all duration-300 hover:-translate-y-1"
            >

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;