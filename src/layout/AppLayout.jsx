import { Outlet, Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole, logout } from "../utils/auth";

export default function AppLayout() {
  const auth = isAuthenticated();
  const role = getUserRole();
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left */}
          <Link
            to="/"
            className="text-xl font-bold text-linkedin tracking-tight"
          >
            ExpertHour
          </Link>

          {/* Right */}
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link
              to="/experts"
              className="hover:text-linkedin transition"
            >
              Experts
            </Link>

            {auth && role === "EXPERT" && (
              <>
                <Link
                  to="/availability"
                  className="hover:text-linkedin transition"
                >
                  Availability
                </Link>
                <Link
                  to="/my-bookings"
                  className="hover:text-linkedin transition"
                >
                  My Bookings
                </Link>
              </>
            )}

            {auth && role === "USER" && (
              <Link
                to="/my-bookings"
                className="hover:text-linkedin transition"
              >
                My Bookings
              </Link>
            )}

            {!auth ? (
              <button
                onClick={() => navigate("/login")}
                className="rounded-full border border-linkedin px-4 py-1.5 text-linkedin hover:bg-linkedin hover:text-white transition"
              >
                Sign in
              </button>
            ) : (
              <button
                onClick={logout}
                className="text-gray-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}
