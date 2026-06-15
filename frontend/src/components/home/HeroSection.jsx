import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (bloodGroup) params.set("bloodGroup", bloodGroup);
    if (location.trim()) params.set("location", location.trim());

    navigate(
      params.toString()
        ? `/emergency-search?${params.toString()}`
        : "/emergency-search"
    );
  };

  return (
    <section className="bg-[radial-gradient(circle_at_top_left,_rgba(193,18,31,0.12),_transparent_35%),linear-gradient(180deg,_#faf8f8_0%,_#fff_100%)] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-red-100 text-[#c1121f] px-4 py-2 rounded-full font-semibold text-sm mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#c1121f] animate-pulse" />
              Emergency Blood Response Network
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#130a0c] leading-tight tracking-tight">

              Find Blood.
              <br />

              <span className="text-[#c1121f]">
                Save Lives.
              </span>

            </h1>

            <p className="text-xl text-[#6e6268] mt-8 max-w-2xl leading-relaxed">
              Connecting verified donors, hospitals, and blood banks through one fast,
              accessible platform built to shorten emergency response time.
            </p>

            {/* SEARCH BOX */}

            <div className="mt-10 matte-panel rounded-[28px] p-4">

              <div className="grid md:grid-cols-3 gap-3">

                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#c1121f]/20 bg-white/90"
                >
                  <option value="">Select Blood Group</option>
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#c1121f]/20 bg-white/90"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-[#c1121f] hover:bg-[#9b1528] text-white rounded-2xl flex items-center justify-center font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#c1121f]/20"
                >
                  Search Blood
                </button>

              </div>

            </div>

            {/* CTA */}

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/register"
                className="bg-[#c1121f] hover:bg-[#9b1528] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#c1121f]/20"
              >
                Become a Donor
              </Link>

              <Link
                to="/hospitals"
                className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold text-[#130a0c] bg-white/70 hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Find Hospitals
              </Link>

            </div>

            {/* TRUST METRICS */}

            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-14">

              <div className="rounded-2xl bg-white/70 border border-white/80 p-4 shadow-sm">
                <h3 className="text-3xl font-bold text-[#c1121f]">
                  10K+
                </h3>

                <p className="text-[#6e6268]">
                  Donors
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 border border-white/80 p-4 shadow-sm">
                <h3 className="text-3xl font-bold text-[#c1121f]">
                  500+
                </h3>

                <p className="text-[#6e6268]">
                  Hospitals
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 border border-white/80 p-4 shadow-sm">
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

            <div className="absolute -top-6 left-0 lg:-left-6 bg-white/95 backdrop-blur shadow-xl rounded-3xl p-4 z-10 border border-white/70">

              <p className="text-sm text-gray-500">
                Active Emergency Requests
              </p>

              <h3 className="text-3xl font-bold text-[#c1121f]">
                128
              </h3>

            </div>

            <div className="overflow-hidden rounded-[36px] shadow-2xl border border-white/70">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80"
                alt="Blood donation team"
                className="w-full object-cover min-h-[520px]"
              />
            </div>

            <div className="absolute -bottom-6 right-0 bg-white/95 backdrop-blur shadow-xl rounded-3xl p-5 border border-white/70">

              <p className="text-sm text-gray-500">
                Available Donors
              </p>

              <h3 className="text-3xl font-bold text-green-600">
                4,521
              </h3>

            </div>

            <div className="absolute left-4 bottom-28 bg-[#130a0c]/90 text-white rounded-3xl px-5 py-4 max-w-xs shadow-2xl">
              <p className="text-sm text-white/75">
                Blood groups supported
              </p>
              <p className="font-semibold mt-1">
                A+, A-, B+, B-, AB+, AB-, O+, O-
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;
