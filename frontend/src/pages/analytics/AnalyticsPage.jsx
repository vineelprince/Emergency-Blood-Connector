import { useEffect, useState } from "react";

import axiosInstance from "../../api/axios";

import Loader from "../../components/Loader";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function AnalyticsPage() {
  const [loading, setLoading] =
    useState(false);

  const [stats, setStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    totalRequests: 0,
    myRequests: 0,
  });

  // ================= FETCH STATS =================

  const fetchStats = async () => {
    try {

      setLoading(true);

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

    } finally {

      setLoading(false);

    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {
    fetchStats();
  }, []);

  // ================= PIE DATA =================

  const donorData = [
    {
      name: "Available",
      value: stats.availableDonors,
    },
    {
      name: "Unavailable",
      value:
        stats.totalDonors -
        stats.availableDonors,
    },
  ];

  // ================= BAR DATA =================

  const systemData = [
    {
      name: "Donors",
      total: stats.totalDonors,
    },
    {
      name: "Requests",
      total: stats.totalRequests,
    },
    {
      name: "My Requests",
      total: stats.myRequests,
    },
  ];

  // chart colors
  const COLORS = [
    "#dc2626",
    "#fca5a5",
  ];

  return (
    <div className="min-h-screen bg-[#faf8f8]">

      <div className="max-w-7xl mx-auto">
        <section className="relative h-[380px] rounded-[32px] overflow-hidden mb-10">

  <img
    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=80"
    alt="Analytics"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/55" />

  <div className="relative z-10 h-full flex items-center px-12">

    <div>

      <h1 className="text-6xl font-bold text-white mb-4">
        Analytics Dashboard
      </h1>

      <p className="text-xl text-gray-200 max-w-2xl">
        Monitor platform growth, donor engagement,
        emergency requests and healthcare impact.
      </p>

    </div>

  </div>

</section>

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-red-600 mb-2">
            System Analytics
          </h1>

          <p className="text-gray-600">
            Monitor blood donation ecosystem performance.
          </p>

        </div>

        {/* LOADING */}
        {loading ? (
          <Loader />
        ) : (
          <>

            {/* STATS CARDS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

              {/* TOTAL DONORS */}
              <div className="
bg-white
rounded-[28px]
border
border-gray-100
shadow-lg
p-8
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">

                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Donors
                </h2>

                <p className="text-4xl font-bold text-red-600">
                  {stats.totalDonors}
                </p>

              </div>

              {/* AVAILABLE DONORS */}
              <div className="
bg-white
rounded-[28px]
border
border-gray-100
shadow-lg
p-8
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">

                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Available Donors
                </h2>

                <p className="text-4xl font-bold text-green-600">
                  {stats.availableDonors}
                </p>

              </div>

              {/* TOTAL REQUESTS */}
              <div className="
bg-white
rounded-[28px]
border
border-gray-100
shadow-lg
p-8
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">

                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Total Requests
                </h2>

                <p className="text-4xl font-bold text-blue-600">
                  {stats.totalRequests}
                </p>

              </div>

              {/* MY REQUESTS */}
              <div className="
bg-white
rounded-[28px]
border
border-gray-100
shadow-lg
p-8
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">

                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  My Requests
                </h2>

                <p className="text-4xl font-bold text-orange-500">
                  {stats.myRequests}
                </p>

              </div>

            </div>
            <div className="grid lg:grid-cols-3 gap-6 mb-10">

  <div className="bg-gradient-to-r from-[#c1121f] to-[#9b1528] text-white rounded-[28px] p-8">

    <h3 className="text-lg mb-2">
      Platform Reach
    </h3>

    <p className="text-5xl font-bold">
      {stats.totalDonors}
    </p>

  </div>

  <div className="bg-white rounded-[28px] p-8 shadow-lg">

    <h3 className="text-lg text-gray-500 mb-2">
      Emergency Requests
    </h3>

    <p className="text-5xl font-bold text-[#c1121f]">
      {stats.totalRequests}
    </p>

  </div>

  <div className="bg-white rounded-[28px] p-8 shadow-lg">

    <h3 className="text-lg text-gray-500 mb-2">
      Active Donors
    </h3>

    <p className="text-5xl font-bold text-green-600">
      {stats.availableDonors}
    </p>

  </div>

</div>

            {/* CHARTS */}
            <div className="grid lg:grid-cols-2 gap-8">

              {/* PIE CHART */}
              <div className="
bg-white
rounded-[28px]
border
border-gray-100
shadow-lg
p-8
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">

                <h2 className="text-2xl font-bold text-red-600 mb-6">
                  Donor Availability
                </h2>

                <div className="h-80">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={donorData}
                        dataKey="value"
                        outerRadius={120}
                        label
                      >

                        {donorData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
                              fill={
                                COLORS[index %
                                  COLORS.length]
                              }
                            />
                          )
                        )}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* BAR CHART */}
              <div className="
bg-white
rounded-[28px]
border
border-gray-100
shadow-lg
p-8
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">

                <h2 className="text-2xl font-bold text-red-600 mb-6">
                  System Overview
                </h2>

                <div className="h-80">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart data={systemData}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Legend />

                      <Bar
                        dataKey="total"
                        fill="#dc2626"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default AnalyticsPage;