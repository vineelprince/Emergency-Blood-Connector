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

        <h2 className="text-4xl font-bold text-center mb-12">
          Hospital Network
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

          {partners.map((partner) => (
            <div
              key={partner}
              className="bg-red-50 p-6 rounded-2xl text-center font-semibold"
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