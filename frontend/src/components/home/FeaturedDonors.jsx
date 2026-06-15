import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

function FeaturedDonors() {

  const [donors, setDonors] =
    useState([]);

  const fetchDonors =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          setDonors([
            {
              _id: "guest-1",
              firstName: "Asha",
              lastName: "Patel",
              bloodGroup: "O-",
              location: { city: "Hyderabad" },
              availability: true,
            },
            {
              _id: "guest-2",
              firstName: "Rahul",
              lastName: "Verma",
              bloodGroup: "A+",
              location: { city: "Bengaluru" },
              availability: true,
            },
            {
              _id: "guest-3",
              firstName: "Nisha",
              lastName: "Khan",
              bloodGroup: "B-",
              location: { city: "Chennai" },
              availability: false,
            },
          ]);

          return;
        }

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

  useEffect(() => {

    fetchDonors();

  }, []);

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c1121f] mb-3">
              Community
            </p>
            <h2 className="text-4xl font-bold">
              Featured donors
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl">
            A mix of live donor data and community showcase cards keeps the home page
            useful even before login.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {donors.map((donor) => (

            <div
              key={donor._id}
              className="matte-panel rounded-[28px] p-8 transition-all duration-300 hover:-translate-y-1"
            >

              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold">
                {donor.firstName}
                {" "}
                {donor.lastName}
                </h3>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${donor.availability ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {donor.availability ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-[#c1121f]">
                {donor.bloodGroup}
              </p>

              <p className="mt-2 text-gray-600">
                {donor.location?.city}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedDonors;