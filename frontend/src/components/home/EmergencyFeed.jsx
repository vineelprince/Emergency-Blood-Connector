import { Link } from "react-router-dom";

function EmergencyFeed() {

  const requests = [
    {
      blood: "A+",
      city: "Hyderabad",
      hospital: "Apollo Hospital",
    },
    {
      blood: "O-",
      city: "Bangalore",
      hospital: "Aster Hospital",
    },
    {
      blood: "AB+",
      city: "Chennai",
      hospital: "Global Hospital",
    },
  ];

  return (

    <section className="bg-red-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c1121f] mb-3">
              Live demand
            </p>
            <h2 className="text-4xl font-bold">
              Active emergency requests
            </h2>
          </div>

          <Link
            to="/create-request"
            className="inline-flex items-center justify-center rounded-2xl bg-[#c1121f] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9b1528]"
          >
            Create a request
          </Link>
        </div>

        <div className="grid gap-6">

          {requests.map((request, index) => (

            <div
              key={index}
              className="matte-panel rounded-[28px] p-6"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

                <div>

                  <h3 className="text-2xl font-bold text-[#c1121f]">
                    {request.blood}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {request.city}
                  </p>

                  <p className="text-gray-700 font-medium">
                    {request.hospital}
                  </p>

                </div>

                <Link
                  to="/emergency-search"
                  className="inline-flex items-center justify-center bg-[#130a0c] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
                >
                  Respond
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default EmergencyFeed;