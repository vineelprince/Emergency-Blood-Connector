import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import axiosInstance from "../../api/axios";
import socket from "../../socket";
import { MdEmergency } from "react-icons/md";
import toast from "react-hot-toast";

function AllRequestsPage() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // ================= FETCH =================

  const fetchRequests =
    async () => {

      try {

        const response =
          await axiosInstance.get(
            "/requests",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setRequests(
          response.data.requests || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

  fetchRequests();

  socket.on(
    "new-request",
    fetchRequests
  );

  socket.on(
    "request-response",
    fetchRequests
  );

  socket.on(
    "request-status-updated",
    fetchRequests
  );

  return () => {

    socket.off(
      "new-request",
      fetchRequests
    );

    socket.off(
      "request-response",
      fetchRequests
    );

    socket.off(
      "request-status-updated",
      fetchRequests
    );
  };

}, []);

  // ================= RESPOND =================

  const handleRespond =
    async (requestId) => {

      try {

        await axiosInstance.post(
          `/requests/${requestId}/respond`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
  "Response submitted successfully"
);

        fetchRequests();

      } catch (error) {

        toast.error(
  error?.response?.data?.message ||
  "Failed to respond"
);
      }
    };

  // ================= COLORS =================

  const getUrgencyColor =
    (urgency) => {

      switch (urgency) {

        case "CRITICAL":
          return "bg-red-600 text-white";

        case "HIGH":
          return "bg-orange-500 text-white";

        case "MEDIUM":
          return "bg-yellow-400 text-black";

        default:
          return "bg-green-500 text-white";
      }
    };

  const getStatusColor =
    (status) => {

      switch (status) {

        case "ACCEPTED":
          return "bg-blue-500 text-white";

        case "COMPLETED":
          return "bg-green-600 text-white";

        case "CANCELLED":
          return "bg-gray-500 text-white";

        default:
          return "bg-red-500 text-white";
      }
    };

  return (

    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-7xl mx-auto px-6 py-8">
        <section className="relative h-[420px] rounded-[32px] overflow-hidden mb-10">

  <img
    src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1800&q=80"
    alt="Emergency Requests"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/55" />

  <div className="relative z-10 h-full flex items-center px-12">

    <div>

      <span className="inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white mb-6">
        Real-Time Emergency Network
      </span>

      <h1 className="text-6xl font-bold text-white mb-4">
        Emergency Requests
      </h1>

      <p className="text-xl text-gray-200 max-w-2xl">
        Monitor and respond to urgent blood
        requests across the network.
      </p>

    </div>

  </div>

</section>
<div className="grid md:grid-cols-4 gap-6 mb-10">

  <div className="bg-white rounded-[28px] p-6 shadow-lg">
    <h3 className="text-4xl font-bold text-[#c1121f]">
      {requests.length}
    </h3>
    <p className="text-gray-500">
      Total Requests
    </p>
  </div>

  <div className="bg-white rounded-[28px] p-6 shadow-lg">
    <h3 className="text-4xl font-bold text-red-600">
      {
        requests.filter(
          r => r.urgency === "CRITICAL"
        ).length
      }
    </h3>
    <p className="text-gray-500">
      Critical Cases
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
        requests.reduce(
          (acc, r) =>
            acc +
            (r.responders?.length || 0),
          0
        )
      }
    </h3>
    <p className="text-gray-500">
      Responses
    </p>
  </div>

</div>

        {loading ? (

          <Loader />

        ) : requests.length === 0 ? (

          <EmptyState
  icon={<MdEmergency />}
            title="No Requests Found"
            description="No active emergency requests available."
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

                <div className="flex justify-between mb-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(
                      request.urgency
                    )}`}
                  >
                    {request.urgency}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>

                </div>

                <h2 className="text-2xl font-bold text-red-600 mb-4">
                  {request.patientName}
                </h2>

                <div className="space-y-2 text-gray-700">

                  <p>
                    Blood Group:
                    {" "}
                    <strong>
                      {request.bloodGroup}
                    </strong>
                  </p>

                  <p>
                    Hospital:
                    {" "}
                    <strong>
                      {request.hospitalName}
                    </strong>
                  </p>

                  <p>
                    Units Required:
                    {" "}
                    <strong>
                      {request.unitsRequired}
                    </strong>
                  </p>

                  <p>
                    Contact:
                    {" "}
                    <strong>
                      {request.contactNumber}
                    </strong>
                  </p>

                  <p>
                    Responses:
                    {" "}
                    <strong>
                      {request.responders?.length || 0}
                    </strong>
                  </p>

                </div>

                {request.additionalNotes && (

                  <div className="
mt-4
bg-[#faf8f8]
border
border-gray-100
p-4
rounded-2xl
text-sm
">
                    {request.additionalNotes}
                  </div>

                )}

                <div className="grid grid-cols-3 gap-2 mt-6">

                  <button
                    onClick={() =>
                      handleRespond(
                        request._id
                      )
                    }
                    className="bg-red-600 text-white py-2 rounded-xl"
                  >
                    Respond
                  </button>

                  <a
                    href={`tel:${request.contactNumber}`}
                    className="bg-blue-600 text-white text-center py-2 rounded-xl"
                  >
                    Call
                  </a>

                  <a
                    href={`https://wa.me/${request.contactNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white text-center py-2 rounded-xl"
                  >
                    WhatsApp
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

export default AllRequestsPage;