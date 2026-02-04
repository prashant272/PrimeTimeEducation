import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Jury from "./pages/Jury";
import Guidelines from "./pages/Guidelines";
import Judging from "./pages/Judging";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import PreviousEditions from "./pages/PreviousEditions";
import Winners from "./pages/Winners.jsx";
import EditionDetail from "./pages/EditionDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NominationForm from "./pages/NominationForm.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#3a1418]">

      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-[#3a1418]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/judging" element={<Judging />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          {/* Backward compatible + navbar links */}
          <Route path="/previous" element={<PreviousEditions />} />
          <Route path="/previous-editions" element={<PreviousEditions />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/editions/:year" element={<EditionDetail />} />
          <Route
            path="/nominate"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <NominationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}
