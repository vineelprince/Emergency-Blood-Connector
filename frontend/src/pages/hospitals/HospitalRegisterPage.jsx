import { useState } from "react";

import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";

import axiosInstance from "../../api/axios";

import LocationAutocomplete from "../../components/LocationAutocomplete";

import toast from "react-hot-toast";

function HospitalRegisterPage() {

  // ================= FORM DATA =================

  const [formData, setFormData] =
    useState({
      hospitalName: "",
      hospitalCode: "",

      location: {
        country: "India",
        state: "",
        city: "",
        address: "",
        latitude: "",
        longitude: "",
      },

      contact: {
        countryCode: "+91",
        phoneNumber: "",
        emergencyLine: "",
      },

      emergencyAvailable: true,

      ambulanceAvailable: false,

      bloodBankAvailable: false,

      supportedBloodGroups: [],

      specialties: [],
    });

  const [loading, setLoading] =
    useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // ================= PHONE CHANGE =================

  const handlePhoneChange =
    (value) => {

      setFormData({
        ...formData,

        contact: {
          ...formData.contact,

          phoneNumber: value,
        },
      });
    };

  // ================= EMERGENCY LINE =================

  const handleEmergencyLine =
    (value) => {

      setFormData({
        ...formData,

        contact: {
          ...formData.contact,

          emergencyLine: value,
        },
      });
    };

  // ================= LOCATION SELECT =================

  const handleSelectLocation =
    (locationData) => {

      setFormData((prev) => ({
        ...prev,

        location: {
          ...prev.location,

          ...locationData,
        },
      }));
    };

  // ================= BLOOD GROUP =================

  const handleBloodGroup =
    (group) => {

      const exists =
        formData.supportedBloodGroups.includes(
          group
        );

      if (exists) {

        setFormData({
          ...formData,

          supportedBloodGroups:
            formData.supportedBloodGroups.filter(
              (item) =>
                item !== group
            ),
        });

      } else {

        setFormData({
          ...formData,

          supportedBloodGroups: [
            ...formData.supportedBloodGroups,
            group,
          ],
        });
      }
    };

  // ================= SPECIALTIES =================

  const handleSpecialties =
    (e) => {

      setFormData({
        ...formData,

        specialties:
          e.target.value
            .split(",")
            .map((item) =>
              item.trim()
            ),
      });
    };

  // ================= SUBMIT =================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.post(
          "/hospitals",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(
        response.data.message
      );

      console.log(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to register hospital"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-red-50 px-4 py-10">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-red-600 mb-3">
            🏥 Hospital Registration
          </h1>

          <p className="text-gray-600">
            Register healthcare institutions for emergency response services
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* HOSPITAL NAME */}
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            value={
              formData.hospitalName
            }
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          {/* HOSPITAL CODE */}
          <input
            type="text"
            name="hospitalCode"
            placeholder="Hospital Code"
            value={
              formData.hospitalCode
            }
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          {/* PHONE */}
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Hospital Contact
            </label>

            <PhoneInput
              country={"in"}
              value={
                formData.contact
                  .phoneNumber
              }
              onChange={
                handlePhoneChange
              }
              inputClass="!w-full !py-6"
            />

          </div>

          {/* EMERGENCY LINE */}
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Emergency Line
            </label>

            <PhoneInput
              country={"in"}
              value={
                formData.contact
                  .emergencyLine
              }
              onChange={
                handleEmergencyLine
              }
              inputClass="!w-full !py-6"
            />

          </div>

          {/* LOCATION */}
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Hospital Location
            </label>

            <LocationAutocomplete
              onSelectLocation={
                handleSelectLocation
              }
            />

          </div>

          {/* BLOOD GROUPS */}
          <div>

            <h2 className="text-lg font-semibold mb-3">
              Supported Blood Groups
            </h2>

            <div className="grid grid-cols-4 gap-3">

              {[
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
              ].map((group) => (

                <button
                  key={group}
                  type="button"
                  onClick={() =>
                    handleBloodGroup(
                      group
                    )
                  }
                  className={`py-3 rounded-xl border font-semibold transition ${
                    formData.supportedBloodGroups.includes(
                      group
                    )
                      ? "bg-red-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {group}
                </button>
              ))}

            </div>

          </div>

          {/* SPECIALTIES */}
          <textarea
            placeholder="Specialties (comma separated)"
            rows="4"
            onChange={
              handleSpecialties
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          {/* SERVICES */}
          <div className="space-y-4">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="emergencyAvailable"
                checked={
                  formData.emergencyAvailable
                }
                onChange={handleChange}
              />

              Emergency Available
            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="ambulanceAvailable"
                checked={
                  formData.ambulanceAvailable
                }
                onChange={handleChange}
              />

              Ambulance Available
            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="bloodBankAvailable"
                checked={
                  formData.bloodBankAvailable
                }
                onChange={handleChange}
              />

              Blood Bank Available
            </label>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
          >
            {loading
              ? "Registering..."
              : "🏥 Register Hospital"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default HospitalRegisterPage;