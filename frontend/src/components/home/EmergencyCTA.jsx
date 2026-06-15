import { Link } from "react-router-dom";

function EmergencyCTA() {
  return (
    <section className="bg-[linear-gradient(135deg,_#c1121f,_#8f1320)] text-white py-24">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold mb-6">
          Need Blood Urgently?
        </h2>

        <p className="text-xl mb-8">
          Create an emergency request and reach nearby donors instantly.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/create-request"
            className="bg-white text-[#c1121f] px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-0.5"
          >
            Create Emergency Request
          </Link>

          <Link
            to="/emergency-search"
            className="border border-white/40 bg-white/10 px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
          >
            Search Nearby Donors
          </Link>
        </div>

      </div>

    </section>
  );
}

export default EmergencyCTA;