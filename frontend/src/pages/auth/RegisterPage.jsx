import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2/lib/lib";
// import "react-phone-input-2/lib/style.css";
import LocationAutocomplete from "../../components/LocationAutocomplete";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

function RegisterPage() {

  const navigate = useNavigate();

  // ================= FORM DATA =================

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bloodGroup: "",
      role: "DONOR",

      location: {
        country: "India",
        state: "",
        city: "",
        area: "",
        pincode: "",
        address: "",
        latitude: "",
        longitude: "",
      },

      contact: {
        countryCode: "+91",
        phoneNumber: "",
      },
    });

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

    setErrors({
      ...errors,

      [e.target.name]: "",
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

      setErrors({
        ...errors,

        location: "",
      });
    };

  // ================= VALIDATION =================

  const validateForm = () => {

    let newErrors = {};

    // first name
    if (
      !formData.firstName.trim()
    ) {

      newErrors.firstName =
        "First name is required";
    }

    // email
    if (
      !formData.email.trim()
    ) {

      newErrors.email =
        "Email is required";

    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {

      newErrors.email =
        "Enter valid email";
    }

    // password
    if (!formData.password) {

      newErrors.password =
        "Password is required";

    } else if (
      formData.password.length < 6
    ) {

      newErrors.password =
        "Password must be at least 6 characters";
    }

    // phone
    if (
      !formData.contact.phoneNumber.trim()
    ) {

      newErrors.phoneNumber =
        "Phone number is required";

    } else if (
      formData.contact.phoneNumber
        .length < 10
    ) {

      newErrors.phoneNumber =
        "Enter valid phone number";
    }

    // blood group
    if (
      !formData.bloodGroup
    ) {

      newErrors.bloodGroup =
        "Select blood group";
    }

    // location
    if (
      !formData.location.state ||
      !formData.location.city
    ) {

      newErrors.location =
        "Please select valid location";
    }

    // role
    if (!formData.role) {

      newErrors.role =
        "Select role";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // ================= SUBMIT =================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    // stop if validation fails
    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(
          "/auth/register",
          formData
        );

      console.log(response.data);

      toast.success("Registration successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-10">

      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">

          <h2 className="text-4xl font-bold text-red-600 mb-2">
            Register 🚨
          </h2>

          <p className="text-gray-600">
            Join the Emergency Blood Connector platform
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* FIRST NAME */}
          <div>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={
                formData.firstName
              }
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </p>
            )}

          </div>

          {/* LAST NAME */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={
              formData.lastName
            }
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* EMAIL */}
          <div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                formData.email
              }
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

          </div>

          {/* PHONE NUMBER */}

            <div>

              <input
                type="text"
                placeholder="Phone Number"
                value={
                  formData.contact.phoneNumber
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    contact: {
                      ...formData.contact,

                      phoneNumber:
                        e.target.value,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

          {/* BLOOD GROUP */}
          <div>

            <select
              name="bloodGroup"
              value={
                formData.bloodGroup
              }
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
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

            {errors.bloodGroup && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bloodGroup}
              </p>
            )}

          </div>

          {/* LOCATION AUTOCOMPLETE */}

          <div>

            <label className="block text-gray-700 mb-2 font-medium">
              Location
            </label>

            <LocationAutocomplete
              onSelectLocation={
                handleSelectLocation
              }
            />

            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location}
              </p>
            )}

          </div>

          {/* ROLE */}
          <div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
            >

              <option value="">
                Select Role
              </option>

              <option>
                DONOR
              </option>

              <option>
                SEEKER
              </option>

              <option>
                HOSPITAL
              </option>

            </select>

            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role}
              </p>
            )}

          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition duration-300"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default RegisterPage;