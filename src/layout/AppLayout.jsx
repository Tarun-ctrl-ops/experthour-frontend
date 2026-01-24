import { Link, Outlet } from "react-router-dom";
import { logout, isAuthenticated } from "../utils/auth";

export default function AppLayout() {
  return (
    <>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            ExpertHour
          </h1>

          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">Signup</Link>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/experts" className="hover:text-blue-600">Experts</Link>
            <Link to="/availability" className="hover:text-blue-600">Availability</Link>
            <Link to="/book" className="hover:text-blue-600">Book</Link>

            {isAuthenticated() && (
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}



