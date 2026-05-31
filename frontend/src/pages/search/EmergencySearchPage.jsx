import { useState } from "react";

import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

import EmptyState from "../../components/EmptyState";
import {
  FaTint,
  FaHospital,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  MdEmergency
} from "react-icons/md";

import {
  IoLocationSharp
} from "react-icons/io5";



function EmergencySearchPage() {
  const [bloodGroup, setBloodGroup] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [detectingLocation, setDetectingLocation] =
  useState(false);

  const [loading, setLoading] =
    useState(false);

  // results
  const [donors, setDonors] = useState([]);

  const [bloodBanks, setBloodBanks] =
    useState([]);

  const [hospitals, setHospitals] =
    useState([]);

  // ================= SEARCH =================

  const handleSearch = async () => {
    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      // donors API
      const donorResponse =
        await axiosInstance.get(
          `/donors/search?bloodGroup=${bloodGroup}&location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      // blood banks API
      const bloodBankResponse =
        await axiosInstance.get(
          `/bloodbanks?bloodGroup=${bloodGroup}&location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      // hospitals API
      const hospitalResponse =
        await axiosInstance.get(
          `/hospitals?bloodGroup=${bloodGroup}&location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setDonors(
        donorResponse.data.donors
      );

      setBloodBanks(
        bloodBankResponse.data.bloodBanks
      );

      setHospitals(
        hospitalResponse.data.hospitals
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
          "Search failed"
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= BROADCAST ALERT =================

const broadcastEmergencyAlert =
  async () => {

    // validation
    if (!bloodGroup || !location) {

      toast.error(
        "Blood group and location are required"
      );

      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.post(
          "/emergency-alerts",
          {
            bloodGroup,
            location,
            message: `Emergency blood required for ${bloodGroup} at ${location}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to broadcast alert"
      );

    }
  };
// ================= GET CURRENT LOCATION =================

const getCurrentLocation = () => {

  if (!navigator.geolocation) {
    alert(
      "Geolocation is not supported"
    );

    return;
  }

  setDetectingLocation(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;

      // set coordinates temporarily
      setLocation(
  `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
);

      setDetectingLocation(false);

    },
    (error) => {

      console.log(error);

      alert(
        "Failed to get location"
      );

      setDetectingLocation(false);

    }
  );
};

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Emergency Blood Search 🚨
          </h1>

          <p className="text-gray-600">
            Search donors, blood banks, and hospitals instantly.
          </p>

        </div>
<section className="relative h-[500px] rounded-[32px] overflow-hidden mb-10">

  <img
    src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1800&q=80"
    alt="Emergency Blood Search"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/55" />

  <div className="relative z-10 h-full flex items-center px-12">

    <div className="max-w-3xl">

      <div className="inline-block bg-red-500/20 border border-red-300 rounded-full px-4 py-2 mb-4">
        <p className="text-red-100 text-sm font-semibold">Emergency Response Network</p>
      </div>

      <h1 className="text-6xl font-bold text-white mb-5">
        Emergency Blood Search
      </h1>

      <p className="text-xl text-gray-200">
        Search verified donors, blood banks and hospitals
        in real-time during critical emergencies.
      </p>

    </div>

  </div>

</section>

        {/* STATS SECTION */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-red-600 mb-2">{donors.length}</div>
            <div className="text-gray-600 font-semibold">Donors</div>
          </div>
          <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-red-600 mb-2">{bloodBanks.length}</div>
            <div className="text-gray-600 font-semibold">Blood Banks</div>
          </div>
          <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-red-600 mb-2">{hospitals.length}</div>
            <div className="text-gray-600 font-semibold">Hospitals</div>
          </div>
          <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-red-600 mb-2">✓</div>
            <div className="text-gray-600 font-semibold">Active Emergency Network</div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="
bg-white/80
backdrop-blur-xl
border border-white/20
rounded-[32px]
shadow-xl
p-8
mb-10
">

          <div className="grid md:grid-cols-4 gap-4">

            {/* BLOOD GROUP */}
            <select
              value={bloodGroup}
              onChange={(e) =>
                setBloodGroup(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3"
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
<div className="flex gap-2">

  <input
    type="text"
    placeholder="Enter location"
    value={location}
    onChange={(e) =>
      setLocation(e.target.value)
    }
    className="w-full border border-gray-300 rounded-lg px-4 py-3"
  />

  {/* GET CURRENT LOCATION */}
  <button
    type="button"
    onClick={getCurrentLocation}
    className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
  >
    {detectingLocation
      ? "..."
      : "📍"}
  </button>

</div>

            {/* SEARCH */}
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition"
            >
              Search
            </button>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-12">

            {/* DONORS */}
            <div>

              <h2 className="text-3xl font-bold text-red-600 mb-6">
                🩸 Available Donors
              </h2>

              {donors.length === 0 ? (
                <div>

  <EmptyState
    icon="🩸"
    title="No Donors Found"
    description="No donors available currently."
  />

  {/* BROADCAST ALERT */}
  <div className="mt-6 text-center">

    <button
      onClick={broadcastEmergencyAlert}
      className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition"
    >
      🚨 Broadcast Emergency Alert
    </button>

  </div>

</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {donors.map((donor) => (

                    <div
                      key={donor._id}
                      className="
bg-white
rounded-[28px]
shadow-lg
border border-gray-100
p-6
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
"
                    >

                      <h3 className="text-2xl font-bold text-red-600 mb-4">
                        {donor.firstName}{" "}
                        {donor.lastName}
                      </h3>

                      <p>
                        📍 {donor.location?.address}
                      </p>

                      <p>
                        📞 {donor.phoneNumber}
                      </p>

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* BLOOD BANKS */}
            <div>

              <h2 className="text-3xl font-bold text-red-600 mb-6">
                🏥 Blood Banks
              </h2>

              {bloodBanks.length === 0 ? (
                <EmptyState
                  icon="🏥"
                  title="No Blood Banks Found"
                  description="No blood banks available currently."
                />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {bloodBanks.map((bank) => (

                    <div
                      key={bank._id}
                      className="
bg-white
rounded-[28px]
shadow-lg
border border-gray-100
p-6
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
"
                    >

                      <h3 className="text-2xl font-bold text-red-600 mb-4">
                        {bank.name}
                      </h3>

                      <p>
                        📍 {bank.location?.address}
                      </p>

                      <p>
                        📞 {bank.contactNumber}
                      </p>

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* HOSPITALS */}
            <div>

              <h2 className="text-3xl font-bold text-red-600 mb-6">
                🏨 Hospitals
              </h2>

              {hospitals.length === 0 ? (
                <EmptyState
                  icon="🏨"
                  title="No Hospitals Found"
                  description="No hospitals available currently."
                />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {hospitals.map((hospital) => (

                    <div
                      key={hospital._id}
                      className="
bg-white
rounded-[28px]
shadow-lg
border border-gray-100
p-6
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
"
                    >

                      <h3 className="text-2xl font-bold text-red-600 mb-4">
                        {hospital.hospitalName}
                      </h3>

                      <p>
                        📍 {hospital.location?.address}
                      </p>

                      <p>
                        📞 {hospital.contact?.phoneNumber}
                      </p>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default EmergencySearchPage;