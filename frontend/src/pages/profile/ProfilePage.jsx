import { useState } from "react";

import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

function ProfilePage() {

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  // ================= STATE =================

  const [formData, setFormData] =
    useState({

      firstName:
        storedUser?.firstName || "",

      lastName:
        storedUser?.lastName || "",

      email:
        storedUser?.email || "",

      bloodGroup:
        storedUser?.bloodGroup || "",

      availability:
        storedUser?.availability !== false,

      contact: {

        phoneNumber:
          storedUser?.contact
            ?.phoneNumber || "",
      },

      location: {

        country:
          storedUser?.location
            ?.country || "India",

        state:
          storedUser?.location
            ?.state || "Telangana",

        city:
          storedUser?.location
            ?.city || "Hyderabad",

        address:
          storedUser?.location
            ?.address || "",

        latitude:
          storedUser?.location
            ?.latitude || 17.385,

        longitude:
          storedUser?.location
            ?.longitude || 78.4867,
      },
    });

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target;

      // PHONE
      if (
        name === "phoneNumber"
      ) {

        setFormData({
          ...formData,

          contact: {
            ...formData.contact,
            phoneNumber:
              value,
          },
        });

        return;
      }

      // LOCATION FIELDS
      if (
        [
          "country",
          "state",
          "city",
          "address",
          "latitude",
          "longitude",
        ].includes(name)
      ) {

        setFormData({
          ...formData,

          location: {
            ...formData.location,
            [name]: value,
          },
        });

        return;
      }

      // NORMAL FIELDS
      setFormData({
        ...formData,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      });
    };

  // ================= UPDATE PROFILE =================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        // CLEAN PAYLOAD
        const payload = {

          firstName:
            formData.firstName,

          lastName:
            formData.lastName,

          availability:
            formData.availability,

          contact: {

            phoneNumber:
              formData.contact
                .phoneNumber,
          },

          location: {

            country:
              formData.location
                .country,

            state:
              formData.location
                .state,

            city:
              formData.location
                .city,

            address:
              formData.location
                .address,

            latitude:
              formData.location
                .latitude,

            longitude:
              formData.location
                .longitude,
          },
        };

        const response =
          await axiosInstance.put(

            "/users/profile",

            payload,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        localStorage.setItem(
          "user",

          JSON.stringify(
            response.data.user
          )
        );

        toast.success(
          "Profile updated successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||

          "Failed to update profile"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-4xl mx-auto">
        <section className="relative h-[320px] rounded-[32px] overflow-hidden mb-10">

  <img
    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80"
    alt="Profile"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 h-full flex items-center px-10">

    <div>

      <h1 className="text-5xl font-bold text-white mb-4">
        My Profile
      </h1>

      <p className="text-xl text-gray-200">
        Manage your donor information,
        emergency availability and contact details.
      </p>

    </div>

  </div>

</section>

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-[#c1121f] mb-2">
            My Profile
          </h1>

          <p className="text-gray-600">
            Manage your donor profile and availability.
          </p>

        </div>

        {/* PROFILE CARD */}
        <div className="
bg-white
rounded-[32px]
shadow-xl
border
border-gray-100
p-10
">
  <div className="flex flex-col md:flex-row items-center gap-6 mb-10">

  <div className="w-24 h-24 rounded-full bg-[#c1121f] text-white flex items-center justify-center text-3xl font-bold">
    {formData.firstName?.[0]}
  </div>

  <div>

    <h2 className="text-3xl font-bold text-[#130a0c]">
      {formData.firstName} {formData.lastName}
    </h2>

    <p className="text-gray-500">
      {formData.email}
    </p>

    <div className="mt-3 inline-flex px-4 py-2 rounded-full bg-[#fff1f3] text-[#c1121f] font-semibold">
      Blood Group : {formData.bloodGroup}
    </div>

  </div>

</div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* FIRST NAME */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>

            {/* LAST NAME */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={
                  formData.contact
                    .phoneNumber
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>

            {/* BLOOD GROUP */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Blood Group
              </label>

              <input
                type="text"
                value={formData.bloodGroup}
                disabled
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100"
              />

            </div>

            {/* ADDRESS */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={
                  formData.location
                    .address
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>

            {/* CITY */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={
                  formData.location
                    .city
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>

            {/* STATE */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={
                  formData.location
                    .state
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

            </div>

            {/* AVAILABILITY */}
            <div className="md:col-span-2 bg-gradient-to-r from-[#fff1f3] to-[#fff5f5] border border-red-200 rounded-2xl p-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-[#c1121f]">
                  Donation Availability
                </h2>

                <p className="text-gray-600">
                  Toggle your emergency donation status.
                </p>

              </div>

              <label className="relative inline-flex items-center cursor-pointer">

                <input
                  type="checkbox"
                  name="availability"
                  checked={
                    formData.availability
                  }
                  onChange={handleChange}
                  className="sr-only peer"
                />

                <div className="w-16 h-8 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all"></div>

                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-8"></div>

              </label>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-[#c1121f] hover:bg-[#9b1528] transition text-white py-4 rounded-2xl font-bold text-lg"
            >
              {loading
                ? "Updating Profile..."
                : "Update Profile"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;