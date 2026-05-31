import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import axiosInstance from "../../api/axios";
import socket from "../../socket";
import { MdEmergency } from "react-icons/md";
import toast from "react-hot-toast";

function MyRequestsPage() {
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  // fetch requests
  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(
        "/requests/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data.requests);
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Failed to fetch requests"
);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  fetchMyRequests();

  socket.on(
    "new-request",
    fetchMyRequests
  );

  socket.on(
    "request-response",
    fetchMyRequests
  );

  socket.on(
    "request-status-updated",
    fetchMyRequests
  );

  return () => {

    socket.off(
      "new-request",
      fetchMyRequests
    );

    socket.off(
      "request-response",
      fetchMyRequests
    );

    socket.off(
      "request-status-updated",
      fetchMyRequests
    );
  };

}, []);

  // update request status
  const updateStatus = async (
    requestId,
    status
  ) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.put(
        `/requests/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refresh requests
      fetchMyRequests();

      toast.success(
  `Request marked as ${status}`
);
    } catch (error) {
      console.log(error);

     toast.error(
  error.response?.data?.message ||
  "Failed to update request"
);
    }
  };

  // status color
  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-blue-500 hover:bg-blue-600 transition";

      case "COMPLETED":
        return "bg-green-600 hover:bg-green-700 transition";

      case "CANCELLED":
        return "bg-gray-500 hover:bg-gray-600 transition";

      default:
        return "bg-red-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HERO SECTION */}
        <section className="relative h-[420px] rounded-[32px] overflow-hidden mb-10">

          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=80"
            alt="My Requests"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 h-full flex items-center px-12">

            <div>

              <span className="inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white mb-6">
                Request Management Center
              </span>

              <h1 className="text-6xl font-bold text-white mb-4">
                My Emergency Requests
              </h1>

              <p className="text-xl text-gray-200 max-w-2xl">
                Monitor request status, donor responses
                and emergency blood requirements.
              </p>

            </div>

          </div>

        </section>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-[28px] p-6 shadow-lg">
            <h3 className="text-4xl font-bold text-[#c1121f]">
              {requests.length}
            </h3>
            <p className="text-gray-500">
              My Requests
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 shadow-lg">
            <h3 className="text-4xl font-bold text-green-600">
              {
                requests.filter(
                  r => r.status === "COMPLETED"
                ).length
              }
            </h3>
            <p className="text-gray-500">
              Completed
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 shadow-lg">
            <h3 className="text-4xl font-bold text-blue-600">
              {
                requests.filter(
                  r => r.status === "ACCEPTED"
                ).length
              }
            </h3>
            <p className="text-gray-500">
              Accepted
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 shadow-lg">
            <h3 className="text-4xl font-bold text-orange-500">
              {
                requests.reduce(
                  (acc, r) =>
                    acc +
                    (r.responders?.length || 0),
                  0
                )
              }
            </h3>
            <p className="text-gray-500">
              Total Responses
            </p>
          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-lg text-gray-600">
            <Loader />
          </div>
        ) : requests.length === 0 ? (
          <EmptyState
  icon={<MdEmergency />}
  title="No Requests Found"
  description="You have not created any emergency requests yet."
/>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {requests.map((request) => (
              <div
  key={request._id}
  className="
bg-white
rounded-[32px]
border
border-gray-100
shadow-lg
hover:shadow-2xl
hover:-translate-y-2
transition-all
duration-300
p-7
"
>

  <div className="flex justify-between items-center mb-4">

    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
        request.status
      )}`}
    >
      {request.status}
    </span>

    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
      {request.responders?.length || 0} Responses
    </span>

  </div>

  <h2 className="text-2xl font-bold text-red-600 mb-4">
    {request.patientName}
  </h2>

  <div className="space-y-2 text-gray-700">

    <p>
      Blood Group:
      <strong> {request.bloodGroup}</strong>
    </p>

    <p>
      Hospital:
      <strong> {request.hospitalName}</strong>
    </p>

    <p>
      Address:
      <strong> {request.hospitalAddress}</strong>
    </p>

    <p>
      Contact:
      <strong> {request.contactNumber}</strong>
    </p>

  </div>

  {request.responders?.length > 0 && (

    <div className="mt-6 border-t pt-4">

      <h3 className="font-bold mb-3">
        Responders
      </h3>

      <div className="space-y-3">

        {request.responders.map(
          (responder) => (

            <div
              key={responder._id}
              className="
bg-[#faf8f8]
border
border-gray-100
rounded-2xl
p-4
"
            >

              <p className="font-semibold">
                {responder.donor?.firstName}
                {" "}
                {responder.donor?.lastName}
              </p>

              <p>
                {responder.donor?.bloodGroup}
              </p>

              <div className="flex gap-2 mt-2">

                <a
                  href={`tel:${responder.donor?.contact?.phoneNumber}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Call
                </a>

                <a
                  href={`https://wa.me/${responder.donor?.contact?.phoneNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  WhatsApp
                </a>

              </div>

            </div>
          )
        )}

      </div>

    </div>

  )}

  <div className="mt-6 flex flex-wrap gap-3">

    <button
      onClick={() =>
        updateStatus(
          request._id,
          "ACCEPTED"
        )
      }
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Accept
    </button>

    <button
      onClick={() =>
        updateStatus(
          request._id,
          "COMPLETED"
        )
      }
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Fulfilled
    </button>

    <button
      onClick={() =>
        updateStatus(
          request._id,
          "CANCELLED"
        )
      }
      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    >
      Cancel
    </button>

  </div>

</div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyRequestsPage;