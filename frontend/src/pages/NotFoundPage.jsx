import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#faf8f8] flex items-center justify-center px-6">

      <div className="max-w-6xl w-full">

        <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-12 lg:p-16 flex flex-col justify-center">

              <span className="inline-flex w-fit px-4 py-2 rounded-full bg-[#fff1f3] text-[#c1121f] font-semibold mb-6">
                Error 404
              </span>

              <h1 className="text-8xl font-bold text-[#c1121f] leading-none mb-4">
                404
              </h1>

              <h2 className="text-4xl font-bold text-[#130a0c] mb-6">
                Page Not Found
              </h2>

              <p className="text-lg text-gray-500 leading-relaxed mb-10">
                The page you are looking for may have
                been moved, deleted, or is temporarily
                unavailable.
              </p>

              <div className="flex flex-wrap gap-4">

                <Link
                  to="/"
                  className="bg-[#c1121f] hover:bg-[#9b1528] text-white px-8 py-4 rounded-2xl font-semibold transition"
                >
                  Back To Home
                </Link>

                <Link
                  to="/dashboard"
                  className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold text-[#130a0c]"
                >
                  Dashboard
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative min-h-[500px]">

              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
                alt="Healthcare"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-10 left-10 right-10">

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-6">

                  <h3 className="text-white text-2xl font-bold mb-2">
                    Emergency Blood Network
                  </h3>

                  <p className="text-gray-200">
                    Connecting donors, hospitals,
                    blood banks and emergency responders
                    through one unified platform.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NotFoundPage;
