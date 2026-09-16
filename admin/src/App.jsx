import React, { useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPassword";

// Main Dashboard & Profile Pages
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

// 1. About
import AdminAbout from "./pages/about/AdminAbout";
import AdminCreateAbout from "./pages/about/AdminCreateAbout";
import AdminUpdateAbout from "./pages/about/AdminUpdateAbout";

// 2. Project
import AdminProject from "./pages/project/AdminProject";
import AdminCreateProject from "./pages/project/AdminCreateProject";
import AdminUpdateProject from "./pages/project/AdminUpdateProject";

// 3. Campaign
import AdminCampaign from "./pages/campaign/AdminCampaign";
import AdminCreateCampaign from "./pages/campaign/AdminCreateCampaign";
import AdminUpdateCampaign from "./pages/campaign/AdminUpdateCampaign";

// 4. Donation
import AdminDonation from "./pages/donation/AdminDonation";
import AdminCreateDonation from "./pages/donation/AdminCreateDonation";
import AdminUpdateDonation from "./pages/donation/AdminUpdateDonation";
import AdminShowDonation from "./pages/donation/AdminShowDonation";

// 5. Volunteer
import AdminVolunteer from "./pages/volunteer/AdminVolunteer";
import AdminCreateVolunteer from "./pages/volunteer/AdminCreateVolunteer";
import AdminUpdateVolunteer from "./pages/volunteer/AdminUpdateVolunteer";
import AdminShowVolunteer from "./pages/volunteer/AdminShowVolunteer";

// 6. Event
import AdminEvent from "./pages/event/AdminEvent";
import AdminCreateEvent from "./pages/event/AdminCreateEvent";
import AdminUpdateEvent from "./pages/event/AdminUpdateEvent";

// 7. Team
import AdminTeam from "./pages/team/AdminTeam";
import AdminCreateTeam from "./pages/team/AdminCreateTeam";
import AdminUpdateTeam from "./pages/team/AdminUpdateTeam";
import AdminTeamMember from "./pages/teammember/AdminTeamMember";
import AdminCreateTeamMember from "./pages/teammember/AdminCreateTeamMember";
import AdminUpdateTeamMember from "./pages/teammember/AdminUpdateTeamMember";

// 8. Partner
import AdminPartner from "./pages/partner/AdminPartner";
import AdminCreatePartner from "./pages/partner/AdminCreatePartner";
import AdminUpdatePartner from "./pages/partner/AdminUpdatePartner";

// 9. Blog
import AdminBlog from "./pages/blog/AdminBlog";
import AdminCreateBlog from "./pages/blog/AdminCreateBlog";
import AdminUpdateBlog from "./pages/blog/AdminUpdateBlog";

// 10. Testimonial
import AdminTestimonial from "./pages/testimonial/AdminTestimonial";
import AdminCreateTestimonial from "./pages/testimonial/AdminCreateTestimonial";
import AdminUpdateTestimonial from "./pages/testimonial/AdminUpdateTestimonial";

// 11. Gallery
import AdminGallery from "./pages/gallery/AdminGallery";
import AdminCreateGallery from "./pages/gallery/AdminCreateGallery";
import AdminUpdateGallery from "./pages/gallery/AdminUpdateGallery";

// 12. Impact
import AdminImpact from "./pages/impact/AdminImpact";
import AdminCreateImpact from "./pages/impact/AdminCreateImpact";
import AdminUpdateImpact from "./pages/impact/AdminUpdateImpact";

// 13. FAQ
import AdminFAQ from "./pages/faq/AdminFAQ";
import AdminCreateFAQ from "./pages/faq/AdminCreateFAQ";
import AdminUpdateFAQ from "./pages/faq/AdminUpdateFAQ";

// 14. Contact Us
import AdminContactUs from "./pages/contactus/AdminContactUs";
import AdminShowQuery from "./pages/contactus/AdminShowQuery";

// 15. User
import AdminUser from "./pages/user/AdminUser";
import AdminCreateUser from "./pages/user/AdminCreateUser";
import AdminUpdateUser from "./pages/user/AdminUpdateUser";

const publicRoutes = ["/login", "/register", "/forgot-password"];

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

function Shell() {
  const location = useLocation();
  const isPublic = publicRoutes.includes(location.pathname);
  const isLoggedIn = localStorage.getItem("login") === "true";

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    const savedMini = localStorage.getItem("adminHMD.sidebarMini") === "true";
    if (isDesktop && savedMini && !isPublic) {
      document.body.classList.add("sidebar-mini");
    }
    return () => {
      if (isPublic)
        document.body.classList.remove("sidebar-mini", "sidebar-open");
    };
  }, [isPublic]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    function handleBreakpoint(e) {
      if (e.matches) {
        document.body.classList.remove("sidebar-open");
        const savedMini =
          localStorage.getItem("adminHMD.sidebarMini") === "true";
        document.body.classList.toggle("sidebar-mini", savedMini);
      } else {
        document.body.classList.remove("sidebar-mini");
      }
    }
    if (mq.addEventListener) {
      mq.addEventListener("change", handleBreakpoint);
    } else {
      mq.addListener(handleBreakpoint);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handleBreakpoint);
      } else {
        mq.removeListener(handleBreakpoint);
      }
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if (isDesktop) {
      document.body.classList.toggle("sidebar-mini");
      localStorage.setItem(
        "adminHMD.sidebarMini",
        String(document.body.classList.contains("sidebar-mini"))
      );
    } else {
      document.body.classList.toggle("sidebar-open");
    }
  }, []);

  const closeMobileSidebar = useCallback(() => {
    document.body.classList.remove("sidebar-open");
  }, []);

  // Redirect unauthenticated users away from protected pages
  if (!isLoggedIn && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  // ── Public pages ──────────────────────────────────────────────────────────
  if (isPublic) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      </Routes>
    );
  }

  // ── Protected pages ───────────────────────────────────────────────────────
  return (
    <div className="admin-shell">
      <div className="sidebar-backdrop" onClick={closeMobileSidebar} />
      <Sidebar onLinkClick={closeMobileSidebar} />

      <div className="admin-main">
        <Navbar toggleSidebar={toggleSidebar} />

        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />

          {/* 1. About */}
          <Route path="/about" element={<AdminAbout />} />
          <Route path="/about/create" element={<AdminCreateAbout />} />
          <Route path="/about/update/:_id" element={<AdminUpdateAbout />} />

          {/* 2. Projects */}
          <Route path="/project" element={<AdminProject />} />
          <Route path="/project/create" element={<AdminCreateProject />} />
          <Route path="/project/update/:_id" element={<AdminUpdateProject />} />

          {/* 3. Campaigns */}
          <Route path="/campaign" element={<AdminCampaign />} />
          <Route path="/campaign/create" element={<AdminCreateCampaign />} />
          <Route path="/campaign/update/:_id" element={<AdminUpdateCampaign />} />

          {/* 4. Donations */}
          <Route path="/donation" element={<AdminDonation />} />
          <Route path="/donation/create" element={<AdminCreateDonation />} />
          <Route path="/donation/update/:_id" element={<AdminUpdateDonation />} />
          <Route path="/donation/view/:_id" element={<AdminShowDonation />} />

          {/* 5. Volunteers */}
          <Route path="/volunteer" element={<AdminVolunteer />} />
          <Route path="/volunteer/create" element={<AdminCreateVolunteer />} />
          <Route path="/volunteer/update/:_id" element={<AdminUpdateVolunteer />} />
          <Route path="/volunteer/view/:_id" element={<AdminShowVolunteer />} />

          {/* 6. Events */}
          <Route path="/event" element={<AdminEvent />} />
          <Route path="/event/create" element={<AdminCreateEvent />} />
          <Route path="/event/update/:_id" element={<AdminUpdateEvent />} />

          {/* 7. Team & Team Members */}
          <Route path="/team" element={<AdminTeam />} />
          <Route path="/team/create" element={<AdminCreateTeam />} />
          <Route path="/team/update/:_id" element={<AdminUpdateTeam />} />
          <Route path="/teammember" element={<AdminTeamMember />} />
          <Route path="/teammember/create" element={<AdminCreateTeamMember />} />
          <Route path="/teammember/update/:_id" element={<AdminUpdateTeamMember />} />

          {/* 8. Partners */}
          <Route path="/partner" element={<AdminPartner />} />
          <Route path="/partner/create" element={<AdminCreatePartner />} />
          <Route path="/partner/update/:_id" element={<AdminUpdatePartner />} />

          {/* 9. Blog */}
          <Route path="/blog" element={<AdminBlog />} />
          <Route path="/blog/create" element={<AdminCreateBlog />} />
          <Route path="/blog/update/:_id" element={<AdminUpdateBlog />} />

          {/* 10. Testimonials */}
          <Route path="/testimonial" element={<AdminTestimonial />} />
          <Route path="/testimonial/create" element={<AdminCreateTestimonial />} />
          <Route path="/testimonial/update/:_id" element={<AdminUpdateTestimonial />} />

          {/* 11. Gallery */}
          <Route path="/gallery" element={<AdminGallery />} />
          <Route path="/gallery/create" element={<AdminCreateGallery />} />
          <Route path="/gallery/update/:_id" element={<AdminUpdateGallery />} />

          {/* 12. Impact Metrics */}
          <Route path="/impact" element={<AdminImpact />} />
          <Route path="/impact/create" element={<AdminCreateImpact />} />
          <Route path="/impact/update/:_id" element={<AdminUpdateImpact />} />

          {/* 13. FAQs */}
          <Route path="/faq" element={<AdminFAQ />} />
          <Route path="/faq/create" element={<AdminCreateFAQ />} />
          <Route path="/faq/update/:_id" element={<AdminUpdateFAQ />} />

          {/* 14. Contact Us */}
          <Route path="/contactus" element={<AdminContactUs />} />
          <Route path="/contactus/view/:_id" element={<AdminShowQuery />} />

          {/* 15. Users */}
          <Route path="/user" element={<AdminUser />} />
          <Route path="/user/create" element={<AdminCreateUser />} />
          <Route path="/user/update/:_id" element={<AdminUpdateUser />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}