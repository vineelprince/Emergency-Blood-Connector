import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import axiosInstance from "../../api/axios";

// ================= CUSTOM ICONS =================

// DONOR ICON
const donorIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",

  iconSize: [38, 38],
});

// USER LOCATION ICON
const userIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",

  iconSize: [40, 40],
});

function EmergencyMapPage() {

  // ================= STATES =================

  const [donors, setDonors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [userLocation,
    setUserLocation] =
      useState([
        17.385,
        78.4867,
      ]);

  // ================= DISTANCE FUNCTION =================

  const calculateDistance =
    (
      lat1,
      lon1,
      lat2,
      lon2
    ) => {

      const toRad =
        (value) =>
          (value * Math.PI) / 180;

      const R = 6371;

      const dLat =
        toRad(lat2 - lat1);

      const dLon =
        toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) *
          Math.sin(dLat / 2) +

        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *

        Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );

      return (
        R * c
      ).toFixed(1);
    };

  // ================= FETCH DONORS =================

  const fetchDonors =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

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

        const donorData =
          response.data.donors || [];

        // SORT NEAREST DONORS
        const sortedDonors =
          donorData.sort(
            (a, b) => {

              const distanceA =
                calculateDistance(
                  userLocation[0],
                  userLocation[1],

                  Number(
                    a.location
                      ?.latitude
                  ),

                  Number(
                    a.location
                      ?.longitude
                  )
                );

              const distanceB =
                calculateDistance(
                  userLocation[0],
                  userLocation[1],

                  Number(
                    b.location
                      ?.latitude
                  ),

                  Number(
                    b.location
                      ?.longitude
                  )
                );

              return (
                distanceA -
                distanceB
              );
            }
          );

        setDonors(
          sortedDonors
        );

      } catch (error) {

        console.log(
          "FETCH DONORS ERROR:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  // ================= GET USER LOCATION =================

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const currentLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserLocation(
          currentLocation
        );
      },

      (error) => {

        console.log(
          "LOCATION ERROR:",
          error
        );
      }
    );

  }, []);

  // ================= FETCH ON LOAD =================

  useEffect(() => {
    fetchDonors();
  }, [userLocation]);

  return (
    <div className="min-h-screen bg-red-50 p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-4xl font-bold text-red-600 mb-2">
          🌍 Emergency Map
        </h1>

        <p className="text-gray-600">
          Live donor and hospital tracking system.
        </p>

      </div>

      {/* LOADING */}
      {loading && (

        <div className="mb-4 text-red-600 font-semibold">
          Loading nearby donors...
        </div>
      )}

      {/* MAP */}
      <div className="rounded-3xl overflow-hidden shadow-xl">

        <MapContainer
          center={userLocation}
          zoom={11}
          style={{
            height: "80vh",
            width: "100%",
          }}
        >

          {/* MAP TILES */}
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* USER LOCATION */}
          <Marker
            position={userLocation}
            icon={userIcon}
          >

            <Popup>

              <div className="font-bold text-blue-600">
                📍 Your Current Location
              </div>

            </Popup>

          </Marker>

          {/* DONOR MARKERS */}
          {donors
            .filter(
              (donor) =>
                donor.location
                  ?.latitude &&
                donor.location
                  ?.longitude
            )
            .map((donor) => {

              const distance =
                calculateDistance(
                  userLocation[0],
                  userLocation[1],

                  Number(
                    donor.location
                      ?.latitude
                  ),

                  Number(
                    donor.location
                      ?.longitude
                  )
                );

              return (

                <Marker
                  key={donor._id}

                  icon={donorIcon}

                  position={[
                    Number(
                      donor.location
                        ?.latitude
                    ),

                    Number(
                      donor.location
                        ?.longitude
                    ),
                  ]}
                >

                  <Popup>

                    <div className="w-72 space-y-4">

                      {/* NAME */}
                      <h2 className="text-2xl font-bold text-red-600 uppercase">
                        {donor.firstName}
                        {" "}
                        {donor.lastName}
                      </h2>

                      {/* BLOOD GROUP */}
                      <p className="font-medium text-lg">
                        🩸 Blood Group:
                        {" "}
                        {donor.bloodGroup}
                      </p>

                      {/* DISTANCE */}
                      <p className="text-blue-600 font-semibold">
                        📍 {distance} KM Away
                      </p>

                      {/* STATUS */}
                      <p
                        className={`font-bold text-lg ${
                          donor.availability !== false
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {donor.availability !== false
                          ? "🟢 Available"
                          : "🔴 Not Available"}
                      </p>

                      {/* PHONE */}
                      <p className="text-gray-700">
                        📞{" "}
                        {
                          donor.contact
                            ?.phoneNumber
                        }
                      </p>

                      {/* LOCATION */}
                      <p className="text-gray-600">
                        📍{" "}
                        {
                          donor.location
                            ?.address
                        }
                      </p>

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-3 pt-2">

                        {/* CALL */}
                        <a
                          href={`tel:${donor.contact?.phoneNumber}`}
                          className="flex-1 bg-red-600 text-white text-center py-3 rounded-xl font-bold hover:bg-red-700 transition"
                        >
                          Call
                        </a>

                        {/* WHATSAPP */}
                        <a
                          href={`https://wa.me/${donor.contact?.phoneNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl font-bold hover:bg-green-700 transition"
                        >
                          WhatsApp
                        </a>

                      </div>

                    </div>

                  </Popup>

                </Marker>
              );
            })}

        </MapContainer>

      </div>

    </div>
  );
}

export default EmergencyMapPage;