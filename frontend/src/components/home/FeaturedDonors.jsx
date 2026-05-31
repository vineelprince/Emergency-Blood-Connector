import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

function FeaturedDonors() {

  const [donors, setDonors] =
    useState([]);

  useEffect(() => {

    fetchDonors();

  }, []);

  const fetchDonors =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axiosInstance.get(
            "/users/donors",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setDonors(
          response.data.donors.slice(0, 6)
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12">
          Featured Donors
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {donors.map((donor) => (

            <div
              key={donor._id}
              className="bg-red-50 rounded-3xl p-8"
            >

              <h3 className="text-xl font-bold">
                {donor.firstName}
                {" "}
                {donor.lastName}
              </h3>

              <p className="mt-2">
                {donor.bloodGroup}
              </p>

              <p className="mt-2 text-gray-600">
                {donor.location?.city}
              </p>

              <div
                className={`mt-4 font-semibold ${
                  donor.availability
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {donor.availability
                  ? "Available"
                  : "Unavailable"}
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedDonors;