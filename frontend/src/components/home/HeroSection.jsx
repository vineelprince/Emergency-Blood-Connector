import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-[#faf8f8] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-[#fff1f3] text-[#c1121f] px-4 py-2 rounded-full font-semibold text-sm mb-6">
              ❤️ Emergency Blood Response Network
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#130a0c] leading-tight">

              Find Blood.
              <br />

              <span className="text-[#c1121f]">
                Save Lives.
              </span>

            </h1>

            <p className="text-xl text-[#6e6268] mt-8 max-w-2xl leading-relaxed">
              Connecting blood donors, hospitals, blood banks and
              emergency responders through one intelligent healthcare
              platform built to save lives faster.
            </p>

            {/* SEARCH BOX */}

            <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">

              <div className="grid md:grid-cols-3 gap-3">

                <select className="border border-gray-200 rounded-xl px-4 py-4 outline-none">
                  <option>Select Blood Group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter Location"
                  className="border border-gray-200 rounded-xl px-4 py-4 outline-none"
                />

                <Link
                  to="/emergency-search"
                  className="bg-[#c1121f] hover:bg-[#9b1528] text-white rounded-xl flex items-center justify-center font-semibold transition"
                >
                  Search Blood
                </Link>

              </div>

            </div>

            {/* CTA */}

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/register"
                className="bg-[#c1121f] hover:bg-[#9b1528] text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Become a Donor
              </Link>

              <Link
                to="/hospitals"
                className="border border-gray-300 px-8 py-4 rounded-xl font-semibold text-[#130a0c]"
              >
                Find Hospitals
              </Link>

            </div>

            {/* TRUST METRICS */}

            <div className="grid grid-cols-3 gap-8 mt-14">

              <div>
                <h3 className="text-3xl font-bold text-[#c1121f]">
                  10K+
                </h3>

                <p className="text-[#6e6268]">
                  Donors
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#c1121f]">
                  500+
                </h3>

                <p className="text-[#6e6268]">
                  Hospitals
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#c1121f]">
                  50K+
                </h3>

                <p className="text-[#6e6268]">
                  Lives Helped
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative">

            <div className="absolute -top-8 -left-8 bg-white shadow-xl rounded-2xl p-4 z-10">

              <p className="text-sm text-gray-500">
                Active Emergency Requests
              </p>

              <h3 className="text-3xl font-bold text-[#c1121f]">
                128
              </h3>

            </div>

            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80"
              alt="Blood Donation"
              className="rounded-[32px] shadow-2xl w-full object-cover"
            />

            <div className="absolute -bottom-8 right-0 bg-white shadow-xl rounded-2xl p-5">

              <p className="text-sm text-gray-500">
                Available Donors
              </p>

              <h3 className="text-3xl font-bold text-green-600">
                4,521
              </h3>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;
