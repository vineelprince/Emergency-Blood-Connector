import { useState } from "react";

import axiosInstance from "../../api/axios";

import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";

function HospitalPage() {
  const [bloodGroup, setBloodGroup] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [hospitals, setHospitals] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ================= SEARCH =================

  const handleSearch = async () => {
    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.get(
          `/hospitals?bloodGroup=${encodeURIComponent(
            bloodGroup
          )}&location=${encodeURIComponent(
            location
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setHospitals(
        response.data.hospitals
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch hospitals"
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================

  const clearFilters = () => {
    setBloodGroup("");
    setLocation("");
    setHospitals([]);
  };

  return (
    <div className="min-h-screen bg-red-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Hospitals & Emergency Support 🏨
          </h1>

          <p className="text-gray-600">
            Find hospitals for emergency blood support.
          </p>

        </div>

        {/* SEARCH SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

          <div className="grid md:grid-cols-4 gap-4">

            {/* BLOOD GROUP */}
            <select
              value={bloodGroup}
              onChange={(e) =>
                setBloodGroup(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">
                Select Blood Group
              </option>

              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>

            </select>

            {/* LOCATION */}
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            {/* SEARCH */}
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition"
            >
              Search
            </button>

            {/* RESET */}
            <button
              onClick={clearFilters}
              className="bg-gray-200 text-gray-700 rounded-lg px-6 py-3 hover:bg-gray-300 transition"
            >
              Reset
            </button>

          </div>

        </div>

        {/* RESULTS */}
        {loading ? (
          <Loader />
        ) : hospitals.length === 0 ? (

          <EmptyState
            icon="🏨"
            title="No Hospitals Found"
            description="Try changing filters or location."
          />

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {hospitals.map((hospital) => (

              <div
                key={hospital._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >

                {/* NAME */}
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                  {hospital.hospitalName}
                </h2>

                {/* DETAILS */}
                <div className="space-y-3 text-gray-700">

                  <p>
                    📍 Location:
                    <span className="font-semibold">
                      {" "}
                      {hospital.location?.address}
                    </span>
                  </p>

                  <p>
                    📞 Contact:
                    <span className="font-semibold">
                      {" "}
                      {hospital.contact?.phoneNumber}
                    </span>
                  </p>

                  <p>
                    🩸 Supported Groups:
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {hospital.supportedBloodGroups.map(
                      (group, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {group}
                        </span>
                      )
                    )}

                  </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-2 gap-3 mt-6">

                  {/* CALL */}
                  <a
                    href={`tel:${hospital.contact?.phoneNumber}`}
                    className="bg-red-600 text-white py-3 rounded-lg text-center hover:bg-red-700 transition"
                  >
                    📞 Call
                  </a>

                  {/* WHATSAPP */}
                  <a
                    href={`https://wa.me/${hospital.contact?.whatsappNumber || hospital.contact?.phoneNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white py-3 rounded-lg text-center hover:bg-green-700 transition"
                  >
                    💬 WhatsApp
                  </a>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default HospitalPage;