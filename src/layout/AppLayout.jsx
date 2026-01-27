import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-app mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-linkedin">
            ExpertHour
          </h1>

          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="/experts" className="hover:text-linkedin">Experts</a>
            <a href="/my-bookings" className="hover:text-linkedin">My Bookings</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-app mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

