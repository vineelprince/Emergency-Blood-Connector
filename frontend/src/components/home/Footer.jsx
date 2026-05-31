import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-[#0f0f12] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 opacity-10">

        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1800&q=80"
          alt="Medical Background"
          className="w-full h-full object-cover"
        />

      </div>

      <div className="relative z-10">

        {/* TOP CTA */}

        <div className="max-w-7xl mx-auto px-6 pt-16">

          <div className="bg-gradient-to-r from-[#c1121f] to-[#9b1528] rounded-[32px] p-10 lg:p-14">

            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  Become A Lifesaver Today
                </h2>

                <p className="text-red-100 text-lg">
                  Join the emergency blood response network
                  and help save lives when every second matters.
                </p>

              </div>

              <div className="flex lg:justify-end">

                <Link
                  to="/register"
                  className="bg-white text-[#c1121f] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                >
                  Register As Donor
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* MAIN FOOTER */}

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            {/* BRAND */}

            <div>

              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-[#c1121f] flex items-center justify-center font-bold text-xl">
                  B
                </div>

                <div>

                  <h3 className="text-2xl font-bold">
                    BloodConnect
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Emergency Response Platform
                  </p>

                </div>

              </div>

              <p className="text-gray-400 leading-relaxed">
                Connecting blood donors, hospitals,
                blood banks and emergency responders
                through one intelligent healthcare platform.
              </p>

            </div>

            {/* QUICK LINKS */}

            <div>

              <h3 className="font-bold text-xl mb-5">
                Quick Links
              </h3>

              <div className="space-y-3">

                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white"
                >
                  Home
                </Link>

                <Link
                  to="/dashboard"
                  className="block text-gray-400 hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to="/emergency-search"
                  className="block text-gray-400 hover:text-white"
                >
                  Find Blood
                </Link>

                <Link
                  to="/hospitals"
                  className="block text-gray-400 hover:text-white"
                >
                  Hospitals
                </Link>

              </div>

            </div>

            {/* SERVICES */}

            <div>

              <h3 className="font-bold text-xl mb-5">
                Services
              </h3>

              <div className="space-y-3 text-gray-400">

                <p>Emergency Blood Search</p>
                <p>Hospital Network</p>
                <p>Blood Bank Directory</p>
                <p>Emergency Alerts</p>
                <p>Real-Time Donor Search</p>

              </div>

            </div>

            {/* CONTACT */}

            <div>

              <h3 className="font-bold text-xl mb-5">
                Connect
              </h3>

              <p className="text-gray-400 mb-6">
                Available 24/7 for emergency blood support.
              </p>

              <div className="flex gap-4">

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#c1121f] transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#c1121f] transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#c1121f] transition"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#c1121f] transition"
                >
                  <FaTwitter />
                </a>

              </div>

            </div>

          </div>

          {/* BOTTOM */}

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">

            <p className="text-gray-500">
              © 2026 BloodConnect. All Rights Reserved.
            </p>

            <div className="flex gap-6 mt-4 lg:mt-0 text-gray-500">

              <a href="#">
                Privacy Policy
              </a>

              <a href="#">
                Terms of Service
              </a>

              <a href="#">
                Support
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
