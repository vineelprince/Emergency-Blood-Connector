import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios";

function CreateRequestPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    hospitalName: "",
    hospitalAddress: "",
    contactNumber: "",
    urgency: "HIGH",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        "/requests",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      toast.success(
  "Emergency request created successfully"
);

      // reset form
      setFormData({
        patientName: "",
        bloodGroup: "",
        unitsRequired: "",
        hospitalName: "",
        hospitalAddress: "",
        contactNumber: "",
        urgency: "HIGH",
        additionalNotes: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to create request"
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Emergency Blood Request
          </h1>

          <p className="text-gray-600">
            Create urgent blood requests instantly.
          </p>
        </div>

        <section className="relative h-[420px] rounded-[32px] overflow-hidden mb-10">

  <img
    src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1800&q=80"
    alt="Emergency Blood Request"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/55" />

  <div className="relative z-10 h-full flex items-center px-12">

    <div>

      <span className="inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white mb-6">
        Emergency Response Network
      </span>

      <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
        Create Emergency Blood Request
      </h1>

      <p className="text-xl text-gray-200 max-w-2xl">
        Instantly notify donors, hospitals and
        emergency responders during critical situations.
      </p>

    </div>

  </div>

</section>

<div className="mb-8 bg-gradient-to-r from-[#fff1f3] to-[#fff8f8] border border-red-100 rounded-[24px] p-6">

  <h3 className="text-xl font-bold text-[#c1121f] mb-2">
    Emergency Request Guidelines
  </h3>

  <p className="text-gray-600">
    Use CRITICAL only for life-threatening emergencies.
    The platform will prioritize donor notifications accordingly.
  </p>

</div>


        {/* FORM */}
        <div className="
bg-white
rounded-[32px]
shadow-xl hover:shadow-2xl transition-all duration-300
border
border-gray-100
p-10
">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* PATIENT NAME */}
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
            />

            {/* BLOOD GROUP */}
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
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

            {/* UNITS */}
            <input
              type="number"
              name="unitsRequired"
              placeholder="Units Required"
              value={formData.unitsRequired}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
            />

            {/* CONTACT */}
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
            />

            {/* HOSPITAL */}
            <input
              type="text"
              name="hospitalName"
              placeholder="Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
            />

            {/* ADDRESS */}
            <input
              type="text"
              name="hospitalAddress"
              placeholder="Hospital Address"
              value={formData.hospitalAddress}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
            />

            {/* URGENCY */}
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3"
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
              <option>CRITICAL</option>
            </select>

            {/* NOTES */}
            <textarea
              name="additionalNotes"
              placeholder="Additional Notes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows="6"
              className="border border-gray-300 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none px-4 py-3 md:col-span-2"
            />

            <div className="md:col-span-2 bg-[#faf8f8] rounded-[24px] p-6 border border-gray-100">

  <h3 className="font-bold text-[#130a0c] mb-2">
    Important Notice
  </h3>

  <p className="text-gray-500">
    Emergency requests are instantly visible to nearby
    donors, hospitals and blood banks. Please ensure
    all information is accurate before submission.
  </p>

</div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-[#c1121f] text-white py-4 rounded-2xl focus:ring-2
focus:ring-[#c1121f]
focus:border-transparent
outline-none font-semibold hover:bg-[#9b1528] transition"
            >
              {loading
                ? "Creating Request..."
                : "Create Emergency Request"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default CreateRequestPage;