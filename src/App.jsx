import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ExpertPage from "./pages/ExpertPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<UserPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="experts" element={<ExpertPage />} />

          {/* USER ONLY */}
          <Route element={<RoleProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="book" element={<BookingPage />} />
          </Route>

          {/* EXPERT ONLY */}
          <Route element={<RoleProtectedRoute allowedRoles={["EXPERT"]} />}>
            <Route path="availability" element={<AvailabilityPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


