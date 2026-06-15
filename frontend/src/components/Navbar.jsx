import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLinkClass = (path) =>
    `font-medium transition ${
      location.pathname === path
        ? "text-[#c1121f]"
        : "text-gray-700 hover:text-[#c1121f]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-[#c1121f] flex items-center justify-center text-white font-bold text-xl">
              B
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#130a0c]">
                BloodConnect
              </h1>

              <p className="text-xs text-gray-500">
                Emergency Blood Network
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}

          <nav className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className={navLinkClass("/")}
            >
              Home
            </Link>

            <Link
              to="/emergency-search"
              className={navLinkClass(
                "/emergency-search"
              )}
            >
              Find Blood
            </Link>

            <Link
              to="/hospitals"
              className={navLinkClass(
                "/hospitals"
              )}
            >
              Hospitals
            </Link>

            <Link
              to="/emergency-map"
              className={navLinkClass(
                "/emergency-map"
              )}
            >
              Emergency Map
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className={navLinkClass(
                  "/dashboard"
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* ACTIONS */}

          <div className="hidden lg:flex items-center gap-4">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="font-semibold text-gray-700 hover:text-[#c1121f]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-[#c1121f] hover:bg-[#9b1528] text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm"
                >
                  Become Donor
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">

                <div className="text-right">
                  <p className="font-semibold text-[#130a0c]">
                    {user.firstName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.role}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-[#c1121f] hover:bg-[#9b1528] text-white px-5 py-2.5 rounded-xl font-semibold transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="lg:hidden text-3xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}

        {mobileMenu && (
          <div className="lg:hidden border-t border-gray-100 py-5 space-y-4">

            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="block"
            >
              Home
            </Link>

            <Link
              to="/emergency-search"
              onClick={() => setMobileMenu(false)}
              className="block"
            >
              Find Blood
            </Link>

            <Link
              to="/hospitals"
              onClick={() => setMobileMenu(false)}
              className="block"
            >
              Hospitals
            </Link>

            <Link
              to="/emergency-map"
              onClick={() => setMobileMenu(false)}
              className="block"
            >
              Emergency Map
            </Link>

            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenu(false)}
                className="block"
              >
                Dashboard
              </Link>
            )}

            <div className="pt-4">

              {!user ? (
                <Link
                  to="/register"
                  className="block text-center bg-[#c1121f] text-white py-3 rounded-xl"
                >
                  Become Donor
                </Link>
              ) : (
                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full bg-[#c1121f] text-white py-3 rounded-xl"
                >
                  Logout
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;
