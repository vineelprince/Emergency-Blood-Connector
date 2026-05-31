function WhyChooseUs() {

  const items = [
    {
      title: "Verified Donors",
      desc: "Only verified donor profiles."
    },
    {
      title: "Emergency Response",
      desc: "Quick donor matching."
    },
    {
      title: "Hospital Network",
      desc: "Connected hospitals."
    },
    {
      title: "Real-Time Alerts",
      desc: "Instant notifications."
    },
  ];

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose BloodConnect
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {items.map((item) => (

            <div
              key={item.title}
              className="bg-red-50 rounded-3xl p-8"
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