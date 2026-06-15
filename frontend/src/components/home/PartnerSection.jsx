function PartnerSection() {
  const partners = [
    "Apollo Hospitals",
    "Yashoda Hospitals",
    "KIMS",
    "AIG",
    "Care Hospitals",
    "Medicover",
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c1121f] mb-3">
            Network
          </p>
          <h2 className="text-4xl font-bold">
            Hospital network
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {partners.map((partner) => (
            <div
              key={partner}
              className="matte-panel p-5 rounded-[22px] text-center font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              {partner}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default PartnerSection;