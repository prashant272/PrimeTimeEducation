import { Routes, Route, useLocation } from "react-router-dom";
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
import Media from "./pages/Media.jsx";
import EditionDetail from "./pages/EditionDetail.jsx";
import Edition2013 from "./pages/editions/Edition2013.jsx";
import Edition2014 from "./pages/editions/Edition2014.jsx";
import Edition2015 from "./pages/editions/Edition2015.jsx";
import Edition2016 from "./pages/editions/Edition2016.jsx";
import Edition2017 from "./pages/editions/Edition2017.jsx";
import Edition2018 from "./pages/editions/Edition2018.jsx";
import Edition2019 from "./pages/editions/Edition2019.jsx";
import Edition2020 from "./pages/editions/Edition2020.jsx";
import Edition2021 from "./pages/editions/Edition2021.jsx";
import Edition2022 from "./pages/editions/Edition2022.jsx";
import Edition2023 from "./pages/editions/Edition2023.jsx";
import Edition2024 from "./pages/editions/Edition2024.jsx";
import Edition2025 from "./pages/editions/Edition2025.jsx";
import Edition2026 from "./pages/editions/Edition2026.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NominationForm from "./pages/NominationForm.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#3a1418]">
      <ScrollToTop />
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
          <Route path="/media" element={<Media />} />
          <Route path="/editions/2013" element={<Edition2013 />} />
          <Route path="/editions/2014" element={<Edition2014 />} />
          <Route path="/editions/2015" element={<Edition2015 />} />
          <Route path="/editions/2016" element={<Edition2016 />} />
          <Route path="/editions/2017" element={<Edition2017 />} />
          <Route path="/editions/2018" element={<Edition2018 />} />
          <Route path="/editions/2019" element={<Edition2019 />} />
          <Route path="/editions/2020" element={<Edition2020 />} />
          <Route path="/editions/2021" element={<Edition2021 />} />
          <Route path="/editions/2022" element={<Edition2022 />} />
          <Route path="/editions/2023" element={<Edition2023 />} />
          <Route path="/editions/2024" element={<Edition2024 />} />
          <Route path="/editions/2025" element={<Edition2025 />} />
          <Route path="/editions/2026" element={<Edition2026 />} />
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
          <Route path="/admin/register" element={<AdminRegister />} />
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



      {!location.pathname.startsWith("/admin") && <Footer />}
      <WhatsAppButton />
    </div >
  );
}
