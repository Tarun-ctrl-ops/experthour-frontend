import { Outlet, Link } from "react-router-dom";
import { isAuthenticated, getUserRole, logout } from "../utils/auth";

export default function AppLayout() {
  const role = getUserRole();
  const loggedIn = isAuthenticated();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/experts" className="text-2xl font-bold text-gray-900">
            ExpertHour
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/experts" className="text-gray-700 hover:text-linkedin">
              Experts
            </Link>

            {role === "USER" && (
              <Link to="/my-bookings" className="text-gray-700 hover:text-linkedin">
                My Bookings
              </Link>
            )}

            {role === "EXPERT" && (
              <Link to="/availability" className="text-gray-700 hover:text-linkedin">
                Availability
              </Link>
            )}

            {!loggedIn ? (
              <Link
                to="/login"
                className="bg-linkedin text-white px-4 py-2 rounded-full"
              >
                Sign in
              </Link>
            ) : (
              <button
                onClick={logout}
                className="text-gray-500 hover:text-red-600"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
