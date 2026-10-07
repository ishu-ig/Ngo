import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import DonationModal from './Components/DonationModal';
import VideoModal from './Components/VideoModal';
import VolunteerModal from './Components/VolunteerModal';
import PartnerModal from './Components/PartnerModal';
import StoryModal from './Components/StoryModal';
import ImpactReportModal from './Components/ImpactReportModal';

import Home from './Pages/Home';
import About from './Pages/About';
import Programs from './Pages/Programs';
import Campaigns from './Pages/Campaigns';
import Causes from './Pages/Causes';
import DonatePage from './Pages/DonatePage';
import Events from './Pages/Events';
import Gallery from './Pages/Gallery';
import Blog from './Pages/Blog';
import BlogDetail from './Pages/BlogDetail';
import Contact from './Pages/Contact';
import Payment from './Pages/Payment';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  // Modal states
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isImpactReportOpen, setIsImpactReportOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const handleOpenDonate = (causeName = null) => {
    setSelectedCause(causeName);
    setIsDonateOpen(true);
  };

  const handleCloseDonate = () => {
    setIsDonateOpen(false);
    setSelectedCause(null);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar
          onOpenDonate={handleOpenDonate}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenPartner={() => setIsPartnerOpen(true)}
        />

        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenDonate={handleOpenDonate}
                  onOpenVideo={() => setIsVideoOpen(true)}
                  onOpenVolunteer={() => setIsVolunteerOpen(true)}
                  onOpenPartner={() => setIsPartnerOpen(true)}
                  onOpenStory={(story) => setActiveStory(story)}
                  onOpenImpactReport={() => setIsImpactReportOpen(true)}
                />
              }
            />
            <Route
              path="/about"
              element={
                <About
                  onOpenDonate={handleOpenDonate}
                  onOpenVolunteer={() => setIsVolunteerOpen(true)}
                />
              }
            />
            <Route
              path="/programs"
              element={
                <Programs
                  onOpenDonate={handleOpenDonate}
                  onOpenVolunteer={() => setIsVolunteerOpen(true)}
                />
              }
            />
            <Route
              path="/campaigns"
              element={
                <Campaigns
                  onOpenDonate={handleOpenDonate}
                  onOpenVolunteer={() => setIsVolunteerOpen(true)}
                />
              }
            />
            <Route
              path="/causes"
              element={<Causes onOpenDonate={handleOpenDonate} />}
            />
            <Route
              path="/donate"
              element={<DonatePage onOpenDonate={handleOpenDonate} />}
            />
            <Route
              path="/events"
              element={
                <Events
                  onOpenVolunteer={() => setIsVolunteerOpen(true)}
                  onOpenDonate={handleOpenDonate}
                />
              }
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/:_id"
              element={<BlogDetail onOpenDonate={handleOpenDonate} />}
            />
            <Route
              path="/contact"
              element={
                <Contact onOpenVolunteer={() => setIsVolunteerOpen(true)} />
              }
            />
            <Route path="/payment/:_id" element={<Payment />} />
            <Route path="/payment" element={<Payment />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer
          onOpenDonate={handleOpenDonate}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenPartner={() => setIsPartnerOpen(true)}
          onOpenImpactReport={() => setIsImpactReportOpen(true)}
        />

        {/* Global Modals */}
        <DonationModal
          isOpen={isDonateOpen}
          onClose={handleCloseDonate}
          defaultCause={selectedCause}
        />
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
        />
        <VolunteerModal
          isOpen={isVolunteerOpen}
          onClose={() => setIsVolunteerOpen(false)}
        />
        <PartnerModal
          isOpen={isPartnerOpen}
          onClose={() => setIsPartnerOpen(false)}
        />
        <StoryModal
          story={activeStory}
          isOpen={Boolean(activeStory)}
          onClose={() => setActiveStory(null)}
          onOpenDonate={handleOpenDonate}
        />
        <ImpactReportModal
          isOpen={isImpactReportOpen}
          onClose={() => setIsImpactReportOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
