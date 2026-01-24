import { Link, Outlet } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

export default function AppLayout() {
  return (
    <>
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-linkedin">
            ExpertHour
          </h1>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/experts">Experts</Link>
            <Link to="/availability">Availability</Link>
            <Link to="/book">Book</Link>

            {!isAuthenticated() ? (
              <>
                <Link to="/">Signup</Link>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </>
  );
}




