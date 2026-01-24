import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            ExpertHour
          </h1>

          <div className="space-x-4 text-sm font-medium">
            <Link className="hover:text-blue-600" to="/">Signup</Link>
            <Link className="hover:text-blue-600" to="/login">Login</Link>
            <Link className="hover:text-blue-600" to="/experts">Experts</Link>
            <Link className="hover:text-blue-600" to="/book">Book</Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}


