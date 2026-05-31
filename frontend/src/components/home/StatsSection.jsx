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

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-red-50 rounded-2xl p-8 text-center"
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