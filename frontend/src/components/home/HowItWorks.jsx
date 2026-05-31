function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-bold mb-4">
              Search
            </h3>

            <p>
              Search blood donors, hospitals and blood banks near you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-bold mb-4">
              Connect
            </h3>

            <p>
              Instantly contact verified donors.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-bold mb-4">
              Save Lives
            </h3>

            <p>
              Reduce emergency response time.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;