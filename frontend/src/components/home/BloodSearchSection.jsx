import { useState } from "react";

function BloodSearchSection() {

  const [bloodGroup, setBloodGroup] =
    useState("");

  const [city, setCity] =
    useState("");

  return (

    <section className="bg-white -mt-16 relative z-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Search Blood Instantly
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <select
              value={bloodGroup}
              onChange={(e) =>
                setBloodGroup(e.target.value)
              }
              className="border rounded-xl px-4 py-4"
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

            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="border rounded-xl px-4 py-4"
            />

            <button
              className="bg-red-600 text-white rounded-xl font-semibold"
            >
              Search Donors
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default BloodSearchSection;