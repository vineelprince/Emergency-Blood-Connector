import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

function Sidebar({ closeSidebar }) {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [search, setSearch] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-[#c1121f] text-white shadow-lg"
      : "text-[#6e6268] hover:bg-[#fff1f3]";

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Donors",
      path: "/donors",
    },
    {
      name: "Hospitals",
      path: "/hospitals",
    },
    {
      name: "Emergency Search",
      path: "/emergency-search",
    },
    {
      name: "Create Request",
      path: "/create-request",
    },
    {
      name: "Emergency Map",
      path: "/emergency-map",
    },
    {
      name: "All Requests",
      path: "/requests",
    },
    {
      name: "My Requests",
      path: "/my-requests",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const filteredItems =
    menuItems.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <aside className="w-80 bg-white border-r border-gray-100 shadow-sm flex flex-col h-[calc(100vh-80px)]">

      {/* TOP */}

      <div className="p-6 border-b border-gray-100">

        <h2 className="text-xl font-bold text-[#130a0c]">
  Dashboard
</h2>

      </div>

      {/* SEARCH */}

      <div className="px-6 mb-5">

        <input
          type="text"
          placeholder="Search Menu"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full bg-[#faf8f8] border border-gray-200 rounded-2xl px-4 py-3 outline-none"
        />

      </div>

      {/* MENU */}

      <div className="flex-1 overflow-y-auto px-4 space-y-2">

        {filteredItems.map(
          (item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={
                closeSidebar
              }
              className={`block px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeClass(
                item.path
              )}`}
            >
              {item.name}
            </Link>
          )
        )}

      </div>

      {/* ACTIONS */}

      <div className="p-6 mt-auto">

        <Link
          to="/"
          className="block text-center bg-[#faf8f8] border border-gray-200 text-[#130a0c] py-3 rounded-2xl font-semibold mb-3"
        >
          Back To Home
        </Link>

        <button
          onClick={
            handleLogout
          }
          className="w-full bg-[#c1121f] hover:bg-[#9b1528] text-white py-3 rounded-2xl font-semibold transition"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
