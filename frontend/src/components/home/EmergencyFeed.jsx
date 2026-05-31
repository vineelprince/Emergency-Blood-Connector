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

        <h2 className="text-4xl font-bold mb-12">
          Active Emergency Requests
        </h2>

        <div className="grid gap-6">

          {requests.map((request, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold text-red-600">
                    {request.blood}
                  </h3>

                  <p>
                    {request.city}
                  </p>

                  <p>
                    {request.hospital}
                  </p>

                </div>

                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-xl"
                >
                  Respond
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default EmergencyFeed;