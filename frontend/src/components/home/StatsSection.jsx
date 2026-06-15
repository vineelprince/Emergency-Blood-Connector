function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Donors" },
    { value: "500+", label: "Hospitals" },
    { value: "150+", label: "Blood Banks" },
    { value: "50,000+", label: "Lives Supported" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c1121f] mb-3">
            Platform snapshot
          </p>
          <h2 className="text-4xl font-bold mb-4">
            Built to keep emergency response organized
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.label}
              className="matte-panel rounded-[28px] p-8 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-5xl font-bold text-red-600">
                {item.value}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default StatsSection;