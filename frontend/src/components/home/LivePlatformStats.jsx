import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

function LivePlatformStats() {

  const [stats, setStats] =
    useState({
      donors: 0,
      hospitals: 0,
      requests: 0,
    });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const donors =
          await axiosInstance.get(
            "/users/donors",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats({
          donors:
            donors.data.totalDonors || 0,

          hospitals: 0,

          requests: 0,
        });

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Live Platform Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-red-50 rounded-3xl p-10 text-center">

            <h3 className="text-5xl font-bold text-red-600">
              {stats.donors}
            </h3>

            <p className="mt-3">
              Registered Donors
            </p>

          </div>

          <div className="bg-red-50 rounded-3xl p-10 text-center">

            <h3 className="text-5xl font-bold text-red-600">
              {stats.hospitals}
            </h3>

            <p className="mt-3">
              Hospitals
            </p>

          </div>

          <div className="bg-red-50 rounded-3xl p-10 text-center">

            <h3 className="text-5xl font-bold text-red-600">
              {stats.requests}
            </h3>

            <p className="mt-3">
              Emergency Requests
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LivePlatformStats;