import { Link } from "react-router-dom";

function EmergencyCTA() {
  return (
    <section className="bg-red-600 text-white py-24">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold mb-6">
          Need Blood Urgently?
        </h2>

        <p className="text-xl mb-8">
          Create an emergency request and reach nearby donors instantly.
        </p>

        <Link
          to="/create-request"
          className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold"
        >
          Create Emergency Request
        </Link>

      </div>

    </section>
  );
}

export default EmergencyCTA;