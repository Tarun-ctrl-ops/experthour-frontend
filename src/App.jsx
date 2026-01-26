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
          <Route index element={<UserPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* Public Routes */}
          <Route path="experts" element={<ExpertPage />} />

          {/* Protected Routes - Any Authenticated User */}
          <Route element={<ProtectedRoute />}>
            <Route path="booking-success" element={<BookingSuccessPage />} />
          </Route>

          {/* USER ONLY Routes */}
          <Route element={<RoleProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="book" element={<BookingPage />} />
          </Route>

          {/* EXPERT ONLY Routes */}
          <Route element={<RoleProtectedRoute allowedRoles={["EXPERT"]} />}>
            <Route path="availability" element={<AvailabilityPage />} />
            <Route path="my-bookings" element={<MyBookingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


