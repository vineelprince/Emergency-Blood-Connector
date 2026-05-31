import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

function DashboardPage() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    totalRequests: 0,
    myRequests: 0,
  });

  const [recentRequests, setRecentRequests] =
    useState([]);

  const fetchStats = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.get(
          "/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentRequests =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response =
          await axiosInstance.get(
            "/requests/recent",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setRecentRequests(
          response.data.requests
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStats();
    fetchRecentRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HERO */}

        <div className="bg-gradient-to-r from-[#c1121f] to-[#9b1528] rounded-[32px] p-10 text-white mb-10 overflow-hidden relative">

          <div className="relative z-10">

            <div className="inline-flex bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              Emergency Blood Response Dashboard
            </div>

            <h1 className="text-5xl font-bold mb-4">
              Welcome Back,
              <br />
              {user?.firstName}
            </h1>

            <p className="text-red-100 text-lg max-w-2xl">
              Monitor emergency requests,
              manage donors, hospitals,
              and blood availability from
              one intelligent dashboard.
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-3">
              Total Donors
            </p>

            <h2 className="text-5xl font-bold text-[#c1121f]">
              {stats.totalDonors}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-3">
              Available Donors
            </p>

            <h2 className="text-5xl font-bold text-green-600">
              {stats.availableDonors}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-3">
              Total Requests
            </p>

            <h2 className="text-5xl font-bold text-blue-600">
              {stats.totalRequests}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-3">
              My Requests
            </p>

            <h2 className="text-5xl font-bold text-orange-500">
              {stats.myRequests}
            </h2>
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="mb-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold text-[#130a0c]">
              Quick Actions
            </h2>

          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

            <Link
              to="/create-request"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#c1121f] mb-3">
                🚨 Create Emergency
              </h3>

              <p className="text-gray-600">
                Raise urgent blood requests.
              </p>
            </Link>

            <Link
              to="/emergency-search"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#c1121f] mb-3">
                🔍 Search Blood
              </h3>

              <p className="text-gray-600">
                Search donors instantly.
              </p>
            </Link>

            <Link
              to="/hospitals"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#c1121f] mb-3">
                🏥 Hospitals
              </h3>

              <p className="text-gray-600">
                Find nearby hospitals.
              </p>
            </Link>

            <Link
              to="/analytics"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#c1121f] mb-3">
                📊 Analytics
              </h3>

              <p className="text-gray-600">
                Platform performance insights.
              </p>
            </Link>

            <Link
              to="/requests"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#c1121f] mb-3">
                📋 Requests
              </h3>

              <p className="text-gray-600">
                Manage all requests.
              </p>
            </Link>

            <Link
              to="/emergency-alerts"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#c1121f] mb-3">
                🔔 Alerts
              </h3>

              <p className="text-gray-600">
                Live emergency notifications.
              </p>
            </Link>

          </div>

        </div>

        {/* RECENT EMERGENCIES */}

        <div>

          <h2 className="text-3xl font-bold text-[#130a0c] mb-8">
            Active Emergency Requests
          </h2>

          {recentRequests.length === 0 ? (

            <div className="bg-white rounded-3xl p-10 border border-gray-100">
              No active emergencies.
            </div>

          ) : (

            <div className="grid lg:grid-cols-3 gap-6">

              {recentRequests.map(
                (request) => (
                  <div
                    key={request._id}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition"
                  >

                    <div className="flex justify-between mb-5">

                      <span className="bg-[#fff1f3] text-[#c1121f] px-4 py-2 rounded-full text-sm font-semibold">
                        {
                          request.urgency
                        }
                      </span>

                      <span className="text-gray-500 text-sm">
                        {
                          request.status
                        }
                      </span>

                    </div>

                    <h3 className="text-2xl font-bold text-[#130a0c] mb-4">
                      {
                        request.patientName
                      }
                    </h3>

                    <div className="space-y-3 text-gray-600">

                      <p>
                        🩸 Blood Group:
                        {" "}
                        <strong>
                          {
                            request.bloodGroup
                          }
                        </strong>
                      </p>

                      <p>
                        🏥 Hospital:
                        {" "}
                        <strong>
                          {
                            request.hospitalName
                          }
                        </strong>
                      </p>

                      <p>
                        📍 Location:
                        {" "}
                        <strong>
                          {
                            request.hospitalAddress
                          }
                        </strong>
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;
