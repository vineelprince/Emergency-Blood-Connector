import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      title: "Register",
      desc: "Create a donor, seeker, or hospital profile with the right contact and location details.",
    },
    {
      title: "Verify",
      desc: "Keep profiles current so the right people can reach you during urgent requests.",
    },
    {
      title: "Respond",
      desc: "Match by blood group and location, then contact responders immediately.",
    },
    {
      title: "Recover",
      desc: "Track outcomes and availability so the network stays ready for the next emergency.",
    },
  ];

  return (
    <section className="py-24 bg-[#faf8f8]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c1121f] mb-3">
            Donation process
          </p>

          <h2 className="text-4xl font-bold mb-4">
            How the platform helps during donation and response
          </h2>

          <p className="text-gray-600">
            A simple, guided flow keeps the emergency response clear for donors,
            hospitals, and families.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="matte-panel rounded-[28px] p-7">
              <div className="w-12 h-12 rounded-2xl bg-[#fff1f3] text-[#c1121f] font-bold flex items-center justify-center mb-4">
                0{index + 1}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}

          <div className="md:col-span-4 rounded-[32px] bg-[#130a0c] text-white p-8 lg:p-10 mt-2">
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300 mb-3">
                  Donor experience
                </p>
                <h3 className="text-3xl font-bold">
                  Keep availability updated to stay visible for urgent matches.
                </h3>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-[#130a0c] transition-all duration-300 hover:-translate-y-0.5"
              >
                Register now
              </Link>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;