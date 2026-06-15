import { Link } from "react-router-dom";

function BloodSearchSection() {
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  return (
    <section className="bg-white -mt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="matte-panel rounded-[32px] p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div>
              <p className="text-sm font-semibold text-[#c1121f] uppercase tracking-[0.25em] mb-3">
                Quick Actions
              </p>

              <h2 className="text-3xl font-bold">
                Start the right action in seconds
              </h2>
            </div>

            <p className="text-gray-600 max-w-2xl">
              Search donors, learn blood group compatibility, or create an emergency
              request without digging through menus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              to="/emergency-search"
              className="group rounded-[28px] border border-gray-100 bg-[#faf8f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-sm font-semibold text-[#c1121f] mb-3">
                01
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#c1121f] transition-colors">
                Search donors
              </h3>
              <p className="text-gray-600">
                Find verified donor, blood bank, and hospital matches by blood group
                and location.
              </p>
            </Link>

            <Link
              to="/register"
              className="group rounded-[28px] border border-gray-100 bg-[#faf8f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-sm font-semibold text-[#c1121f] mb-3">
                02
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#c1121f] transition-colors">
                Join as donor
              </h3>
              <p className="text-gray-600">
                Register, set your availability, and become visible when someone needs
                your blood group.
              </p>
            </Link>

            <Link
              to="/create-request"
              className="group rounded-[28px] border border-gray-100 bg-[#faf8f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-sm font-semibold text-[#c1121f] mb-3">
                03
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#c1121f] transition-colors">
                Request blood
              </h3>
              <p className="text-gray-600">
                Create a structured emergency request that can be shared with the
                right responders immediately.
              </p>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {bloodGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 flex-wrap border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              Tip: O- is the universal emergency donor group, while AB+ can receive
              from all groups.
            </p>

            <Link
              to="/emergency-search"
              className="inline-flex items-center justify-center rounded-2xl bg-[#c1121f] px-6 py-3 font-semibold text-white shadow-lg shadow-[#c1121f]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9b1528]"
            >
              Open emergency search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BloodSearchSection;