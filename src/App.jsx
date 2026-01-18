import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ExpertPage from "./pages/ExpertPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/signup" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/experts" element={<ExpertPage />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          <Route path="/book" element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

