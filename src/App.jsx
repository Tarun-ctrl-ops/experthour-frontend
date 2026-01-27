import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ExpertPage from "./pages/ExpertPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import BookingPage from "./pages/BookingPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import MyBookingsPage from "./pages/MyBookingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* ✅ REAL HOME */}
          <Route index element={<Navigate to="/experts" replace />} />

          {/* Public */}
          <Route path="experts" element={<ExpertPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="join" element={<UserPage />} />

          {/* Authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="booking-success" element={<BookingSuccessPage />} />
          </Route>

          {/* USER */}
          <Route element={<RoleProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="book" element={<BookingPage />} />
            <Route path="my-bookings" element={<MyBookingsPage />} />
          </Route>

          {/* EXPERT */}
          <Route element={<RoleProtectedRoute allowedRoles={["EXPERT"]} />}>
            <Route path="availability" element={<AvailabilityPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/experts" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



