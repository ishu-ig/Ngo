import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../Redux/ActionCreators/AboutActionCreators';
import {
  Heart,
  Phone,
  Mail,
  Menu,
  X,
  Shield,
  ChevronDown,
  BookOpen,
  Target,
  Users,
  Award,
  Sparkles,
  Stethoscope,
  Droplet,
  FileText,
  Image,
  Calendar,
  Handshake,
  UserPlus,
  Building,
  HeartHandshake
} from 'lucide-react';

export default function Navbar({
  onOpenDonate,
  onOpenVolunteer,
  onOpenPartner,
  onOpenImpactReport
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const AboutStateData = useSelector((state) => state.AboutStateData);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({
    about: false,
    programs: false,
    impact: false,
    media: false,
    involved: false,
  });

  // Close dropdown on outside click, route change, or escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav-item')) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  const about = Array.isArray(AboutStateData)
    ? AboutStateData[0]
    : (AboutStateData?.data?.[0] || null);

  const ngoName = about?.ngoName || 'Subhashish Wellfare Foundation';
  const contactPhone = about?.contactPhone || '+91 9876543210';
  const contactEmail = about?.contactEmail || 'support@subhashishngo.org';
  const logo = about?.logo;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileAccordion = (key) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <Phone size={13} color="#2dd4bf" />
              <a href={`tel:${contactPhone}`}>{contactPhone}</a>
            </div>
            <div className="top-bar-item">
              <Mail size={13} color="#2dd4bf" />
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </div>
            <span className="tax-badge">
              <Shield size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
              80G & 12A Certified NGO
            </span>
          </div>

          <div className="top-bar-right">
            <button
              type="button"
              className="topbar-link-btn"
              onClick={onOpenVolunteer}
            >
              <UserPlus size={13} color="#38bdf8" />
              <span>Volunteer</span>
            </button>
            <button
              type="button"
              className="topbar-link-btn"
              onClick={onOpenPartner}
            >
              <Handshake size={13} color="#fbbf24" />
              <span>CSR Partner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="navbar-sticky">
        <div className="container navbar-inner">
          {/* Logo & Brand Name */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            {logo ? (
              <div className="brand-logo-img-wrapper">
                <img src={logo} alt={ngoName} />
              </div>
            ) : (
              <div className="brand-icon-wrapper">
                <HeartHandshake size={24} />
              </div>
            )}
            <div className="brand-text">
              <span className="brand-title">Subhashish</span>
              <span className="brand-subtitle">Wellfare Foundation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              {/* 1. Home */}
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>

              {/* 2. About Us Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'about' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('about')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                >
                  About Us <ChevronDown size={14} className="dropdown-chevron" />
                </button>
                <div className="nav-dropdown-menu">
                  <Link to="/about" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <Target size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Mission & Vision</span>
                      <span className="dropdown-desc">Our core purpose, history & goals</span>
                    </div>
                  </Link>
                  <Link to="/about" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <Users size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Leadership & Team</span>
                      <span className="dropdown-desc">Trustees, doctors & coordinators</span>
                    </div>
                  </Link>
                  <Link to="/about" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                      <Shield size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Financial Transparency</span>
                      <span className="dropdown-desc">92% direct program spending ratio</span>
                    </div>
                  </Link>
                  <a href="/#partners-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                      <Building size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Partners & Sponsors</span>
                      <span className="dropdown-desc">Institutional allies & supporters</span>
                    </div>
                  </a>
                </div>
              </li>

              {/* 3. Programs Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'programs' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('programs')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => setOpenDropdown(openDropdown === 'programs' ? null : 'programs')}
                >
                  Programs <ChevronDown size={14} className="dropdown-chevron" />
                </button>
                <div className="nav-dropdown-menu" style={{ width: '310px' }}>
                  <Link to="/causes" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <BookOpen size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">All 8 Core Programs</span>
                      <span className="dropdown-desc">Education, Health, Food, Water & Skills</span>
                    </div>
                  </Link>
                  <Link to="/causes" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#0284c7' }}>
                      <Stethoscope size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Mobile Pediatric Healthcare</span>
                      <span className="dropdown-desc">Diagnostics, medicines & doctor vans</span>
                    </div>
                  </Link>
                  <Link to="/causes" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#16a34a' }}>
                      <Droplet size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Clean Water & Solar Plants</span>
                      <span className="dropdown-desc">RO water infrastructure in rural areas</span>
                    </div>
                  </Link>
                  <a href="/#featured-campaign-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626' }}>
                      <Sparkles size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Urgent Neonatal ICU</span>
                      <span className="dropdown-desc">Emergency malnutrition & infant aid</span>
                    </div>
                  </a>
                </div>
              </li>

              {/* 4. Our Impact Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'impact' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('impact')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => setOpenDropdown(openDropdown === 'impact' ? null : 'impact')}
                >
                  Our Impact <ChevronDown size={14} className="dropdown-chevron" />
                </button>
                <div className="nav-dropdown-menu">
                  <a href="/#impact-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#9333ea' }}>
                      <Award size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Impact Metrics & Data</span>
                      <span className="dropdown-desc">68,000+ lives positively transformed</span>
                    </div>
                  </a>
                  <a href="/#stories-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <Users size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Success Stories</span>
                      <span className="dropdown-desc">Real transformations from the ground</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setOpenDropdown(null);
                      if (onOpenImpactReport) onOpenImpactReport();
                    }}
                  >
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <FileText size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Annual Reports (PDF)</span>
                      <span className="dropdown-desc">Download audited financial statements</span>
                    </div>
                  </button>
                </div>
              </li>

              {/* 5. Media & News Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'media' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('media')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => setOpenDropdown(openDropdown === 'media' ? null : 'media')}
                >
                  Media <ChevronDown size={14} className="dropdown-chevron" />
                </button>
                <div className="nav-dropdown-menu">
                  <Link to="/gallery" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <Image size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Photo & Video Gallery</span>
                      <span className="dropdown-desc">Moments captured across our fields</span>
                    </div>
                  </Link>
                  <Link to="/blog" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <FileText size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Blog & Field News</span>
                      <span className="dropdown-desc">Inspiring dispatches and articles</span>
                    </div>
                  </Link>
                  <Link to="/events" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#ea580c' }}>
                      <Calendar size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Charity Events & Camps</span>
                      <span className="dropdown-desc">Health drives, marathons & RSVPs</span>
                    </div>
                  </Link>
                </div>
              </li>

              {/* 6. Contact Us */}
              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Right CTA Button Cluster */}
          <div className="nav-cta">
            <button
              type="button"
              className="btn btn-primary btn-sm nav-donate-btn pulse-animation"
              onClick={() => onOpenDonate()}
            >
              <Heart size={15} fill="currentColor" />
              <span>Donate Now</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Drawer Content */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="brand-logo">
            {logo ? (
              <div className="brand-logo-img-wrapper" style={{ width: 36, height: 36 }}>
                <img src={logo} alt={ngoName} />
              </div>
            ) : (
              <div className="brand-icon-wrapper" style={{ width: 36, height: 36 }}>
                <HeartHandshake size={20} />
              </div>
            )}
            <div className="brand-text">
              <span className="brand-title" style={{ fontSize: '1.05rem' }}>Subhashish</span>
              <span className="brand-subtitle" style={{ fontSize: '0.62rem' }}>Wellfare Foundation</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          <li>
            <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>

          {/* About Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('about')}
            >
              <span>About Us</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.about ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.about && (
              <div className="mobile-accordion-body">
                <Link to="/about" onClick={closeMobileMenu}>• Mission & Vision</Link>
                <Link to="/about" onClick={closeMobileMenu}>• Leadership Team</Link>
                <Link to="/about" onClick={closeMobileMenu}>• Financial Transparency</Link>
                <a href="/#partners-section" onClick={closeMobileMenu}>• Partners & Sponsors</a>
              </div>
            )}
          </li>

          {/* Programs Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('programs')}
            >
              <span>Programs & Causes</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.programs ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.programs && (
              <div className="mobile-accordion-body">
                <Link to="/causes" onClick={closeMobileMenu}>• All 8 Core Programs</Link>
                <Link to="/causes" onClick={closeMobileMenu}>• Mobile Pediatric Health</Link>
                <Link to="/causes" onClick={closeMobileMenu}>• Clean Water Infrastructure</Link>
                <a href="/#featured-campaign-section" onClick={closeMobileMenu}>• Urgent Neonatal ICU</a>
              </div>
            )}
          </li>

          {/* Impact Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('impact')}
            >
              <span>Our Impact</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.impact ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.impact && (
              <div className="mobile-accordion-body">
                <a href="/#impact-section" onClick={closeMobileMenu}>• Verified Metrics & Data</a>
                <a href="/#stories-section" onClick={closeMobileMenu}>• Beneficiary Stories</a>
                <button
                  type="button"
                  className="mobile-text-btn"
                  onClick={() => {
                    closeMobileMenu();
                    if (onOpenImpactReport) onOpenImpactReport();
                  }}
                >
                  • Annual Reports (PDF)
                </button>
              </div>
            )}
          </li>

          {/* Media Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('media')}
            >
              <span>Media & Stories</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.media ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.media && (
              <div className="mobile-accordion-body">
                <Link to="/gallery" onClick={closeMobileMenu}>• Photo & Video Gallery</Link>
                <Link to="/blog" onClick={closeMobileMenu}>• Blog & Field News</Link>
                <Link to="/events" onClick={closeMobileMenu}>• Upcoming Charity Drives</Link>
              </div>
            )}
          </li>

          {/* Contact */}
          <li>
            <NavLink to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Mobile Action Drawer Footer */}
        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', gap: '6px' }}
            onClick={() => {
              closeMobileMenu();
              onOpenDonate();
            }}
          >
            <Heart size={16} fill="white" />
            Donate Now
          </button>
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%' }}
            onClick={() => {
              closeMobileMenu();
              onOpenVolunteer();
            }}
          >
            Volunteer With Us
          </button>
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%', borderColor: '#fbbf24', color: '#d97706' }}
            onClick={() => {
              closeMobileMenu();
              onOpenPartner();
            }}
          >
            Corporate CSR Partner
          </button>
        </div>
      </div>
    </>
  );
}
