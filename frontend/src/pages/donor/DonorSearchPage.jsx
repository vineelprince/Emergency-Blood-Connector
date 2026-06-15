import { useState } from "react";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";

import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

function DonorSearchPage() {
  const [bloodGroup, setBloodGroup] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [donors, setDonors] = useState([]);

  const [loading, setLoading] =
    useState(false);

  // search donors
  const handleSearch = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.get(
          `/donors/search?bloodGroup=${encodeURIComponent(
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

      setDonors(response.data.donors);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch donors"
      );
    } finally {
      setLoading(false);
    }
  };

  // clear filters
  const clearFilters = () => {
    setBloodGroup("");
    setLocation("");
    setDonors([]);
  };

  return (
    <div className="min-h-screen bg-red-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Search Blood Donors 🔍
          </h1>

          <p className="text-gray-600">
            Find available blood donors instantly.
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

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition"
            >
              {loading
                ? "Searching..."
                : "Search"}
            </button>

            {/* RESET BUTTON */}
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
) : donors.length === 0 ? (
          <EmptyState
  icon="🩸"
  title="No Donors Found"
  description="Try changing blood group or location filters."
/>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {donors.map((donor) => (

              <div
                key={donor._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >

                {/* TOP */}
                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-2xl font-bold text-red-600">
                    {donor.firstName}{" "}
                    {donor.lastName}
                  </h2>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                    {donor.bloodGroup}
                  </span>

                </div>

                {/* DETAILS */}
                <div className="space-y-3 text-gray-700">

                  <p>
                    📍 Location:
                    <span className="font-semibold">
                      {" "}
                      {donor.location?.address}
                    </span>
                  </p>

                  <p>
                    📞 Phone:
                    <span className="font-semibold">
                      {" "}
                      {donor.phoneNumber}
                    </span>
                  </p>

                  <p>
                    🟢 Availability:
                    <span className="font-semibold text-green-600">
                      {" "}
                      Available
                    </span>
                  </p>

                </div>

                {/* BUTTON */}
                <div className="grid grid-cols-2 gap-3 mt-6">

  {/* CALL BUTTON */}
  <a
    href={`tel:${donor.phoneNumber}`}
    className="bg-red-600 text-white py-3 rounded-lg text-center hover:bg-red-700 transition"
  >
    📞 Call
  </a>

  {/* WHATSAPP BUTTON */}
  <a
    href={`https://wa.me/91${donor.phoneNumber}`}
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

export default DonorSearchPage;