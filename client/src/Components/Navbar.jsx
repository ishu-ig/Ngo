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
  HeartHandshake,
  Home,
  MapPin,
  CreditCard,
  HelpCircle,
  Flame,
  Gift
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
    home: false,
    about: false,
    programs: false,
    donate: false,
    media: false,
    contact: false,
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
              {/* 1. Home Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'home' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('home')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive && location.pathname === '/' ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  Home <ChevronDown size={14} className="dropdown-chevron" />
                </NavLink>
                <div className="nav-dropdown-menu dropdown-align-left" style={{ width: '310px' }}>
                  <Link to="/" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <Home size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Main Overview</span>
                      <span className="dropdown-desc">Hero mission, live metrics & video</span>
                    </div>
                  </Link>
                  <Link to="/campaigns" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626' }}>
                      <Flame size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Urgent Relief Drives</span>
                      <span className="dropdown-desc">Critical emergency appeals</span>
                    </div>
                  </Link>
                  <a href="/#impact-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#9333ea' }}>
                      <Award size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Verified Impact Highlights</span>
                      <span className="dropdown-desc">68,000+ lives transformed</span>
                    </div>
                  </a>
                  <a href="/#stories-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <Users size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Beneficiary Stories</span>
                      <span className="dropdown-desc">Real journeys from the ground</span>
                    </div>
                  </a>
                  <a href="/#partners-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                      <Building size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Our Partners & Alliances</span>
                      <span className="dropdown-desc">Institutional allies & CSR sponsors</span>
                    </div>
                  </a>
                </div>
              </li>

              {/* 2. About Us Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'about' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('about')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  About Us <ChevronDown size={14} className="dropdown-chevron" />
                </NavLink>
                <div className="nav-dropdown-menu" style={{ width: '315px' }}>
                  <Link to="/about" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <Target size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Mission & Vision</span>
                      <span className="dropdown-desc">Our history, founding ethos & roadmap</span>
                    </div>
                  </Link>
                  <Link to="/about#leadership" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <Users size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Passionate Leaders on the Ground</span>
                      <span className="dropdown-desc">Executive trustees & field directors</span>
                    </div>
                  </Link>
                  <Link to="/about#reports" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                      <Shield size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Financial Audit & 80G Reports</span>
                      <span className="dropdown-desc">92% program spending ratio (PDF)</span>
                    </div>
                  </Link>
                  <a href="/#partners-section" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                      <Building size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Institutional Allies</span>
                      <span className="dropdown-desc">Corporate sponsors & partners</span>
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
                <NavLink
                  to="/programs"
                  className={({ isActive }) => `nav-link ${isActive || location.pathname === '/campaigns' || location.pathname === '/causes' ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  Programs <ChevronDown size={14} className="dropdown-chevron" />
                </NavLink>
                <div className="nav-dropdown-menu" style={{ width: '320px' }}>
                  <Link to="/programs" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <BookOpen size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">All Social Programs</span>
                      <span className="dropdown-desc">Education, healthcare, food & water</span>
                    </div>
                  </Link>
                  <Link to="/campaigns" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626' }}>
                      <Flame size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Urgent Disaster Campaigns</span>
                      <span className="dropdown-desc">Emergency flood relief & ICU appeals</span>
                    </div>
                  </Link>
                  <Link to="/causes" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#0284c7' }}>
                      <Heart size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">All Causes & Drives</span>
                      <span className="dropdown-desc">Direct grassroots community projects</span>
                    </div>
                  </Link>
                </div>
              </li>

              {/* 4. Donate & Act Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'donate' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('donate')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <NavLink
                  to="/donate"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  Donate & Act <ChevronDown size={14} className="dropdown-chevron" />
                </NavLink>
                <div className="nav-dropdown-menu" style={{ width: '315px' }}>
                  <Link to="/donate" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(225, 29, 72, 0.12)', color: '#e11d48' }}>
                      <CreditCard size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Online Donation Portal</span>
                      <span className="dropdown-desc">Secure giving with 80G tax receipt</span>
                    </div>
                  </Link>
                  <Link to="/donate#ways-to-give" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                      <Shield size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">80G Tax Exemption Benefits</span>
                      <span className="dropdown-desc">Claim 50% tax deduction under 80G</span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setOpenDropdown(null);
                      if (onOpenVolunteer) onOpenVolunteer();
                    }}
                  >
                    <div className="dropdown-icon" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#0284c7' }}>
                      <UserPlus size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Join as a Volunteer</span>
                      <span className="dropdown-desc">Field tutoring, kits & medical drives</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setOpenDropdown(null);
                      if (onOpenPartner) onOpenPartner();
                    }}
                  >
                    <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                      <Handshake size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Corporate CSR Partner</span>
                      <span className="dropdown-desc">Institutional grants & village adoption</span>
                    </div>
                  </button>
                </div>
              </li>

              {/* 5. Events & Media Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'media' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('media')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <NavLink
                  to="/events"
                  className={({ isActive }) => `nav-link ${isActive || location.pathname === '/gallery' || location.pathname === '/blog' ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  Events & Media <ChevronDown size={14} className="dropdown-chevron" />
                </NavLink>
                <div className="nav-dropdown-menu" style={{ width: '310px' }}>
                  <Link to="/events" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#ea580c' }}>
                      <Calendar size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Charity Events & Camps</span>
                      <span className="dropdown-desc">Health checkups, drives & RSVPs</span>
                    </div>
                  </Link>
                  <Link to="/gallery" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <Image size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Photo & Video Gallery</span>
                      <span className="dropdown-desc">High-res moments from field centers</span>
                    </div>
                  </Link>
                  <Link to="/blog" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <FileText size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Blog & Field Dispatches</span>
                      <span className="dropdown-desc">Inspiring stories & latest articles</span>
                    </div>
                  </Link>
                </div>
              </li>

              {/* 6. Contact Us Dropdown */}
              <li
                className={`nav-item ${openDropdown === 'contact' ? 'nav-dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown('contact')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  Contact <ChevronDown size={14} className="dropdown-chevron" />
                </NavLink>
                <div className="nav-dropdown-menu dropdown-align-right" style={{ width: '310px' }}>
                  <Link to="/contact" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e' }}>
                      <Phone size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Support & Helpline Desk</span>
                      <span className="dropdown-desc">Direct phone, email & message inquiry</span>
                    </div>
                  </Link>
                  <Link to="/contact#locations" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                      <MapPin size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Headquarters & Centers</span>
                      <span className="dropdown-desc">Delhi HQ & regional field hubs</span>
                    </div>
                  </Link>
                  <Link to="/donate#ways-to-give" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#9333ea' }}>
                      <Building size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Direct Bank Transfer (NEFT)</span>
                      <span className="dropdown-desc">Official bank details for wire transfers</span>
                    </div>
                  </Link>
                  <Link to="/contact#locations" className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                      <HelpCircle size={16} />
                    </div>
                    <div className="dropdown-text">
                      <span className="dropdown-title">Volunteer & CSR Queries</span>
                      <span className="dropdown-desc">Prompt resolution from our care team</span>
                    </div>
                  </Link>
                </div>
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
          {/* Home Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('home')}
            >
              <span>Home</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.home ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.home && (
              <div className="mobile-accordion-body">
                <Link to="/" onClick={closeMobileMenu}>• Main Overview & Hero</Link>
                <Link to="/campaigns" onClick={closeMobileMenu}>• Urgent Relief Drives</Link>
                <a href="/#impact-section" onClick={closeMobileMenu}>• Verified Impact Highlights</a>
                <a href="/#stories-section" onClick={closeMobileMenu}>• Beneficiary Stories</a>
                <a href="/#partners-section" onClick={closeMobileMenu}>• Institutional Partners</a>
              </div>
            )}
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
                <Link to="/about" onClick={closeMobileMenu}>• About Foundation</Link>
                <Link to="/about#mission" onClick={closeMobileMenu}>• Mission, Vision & Values</Link>
                <Link to="/about#leadership" onClick={closeMobileMenu}>• Passionate Leaders on the Ground</Link>
                <Link to="/about#reports" onClick={closeMobileMenu}>• Financial Audit & 80G Reports (PDF)</Link>
                <a href="/#partners-section" onClick={closeMobileMenu}>• Partners & Alliances</a>
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
                <Link to="/programs" onClick={closeMobileMenu}>• All Social Programs</Link>
                <Link to="/campaigns" onClick={closeMobileMenu}>• Urgent Disaster Relief Campaigns</Link>
                <Link to="/causes" onClick={closeMobileMenu}>• All Causes & Drives Catalog</Link>
              </div>
            )}
          </li>

          {/* Donate & Act Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('donate')}
            >
              <span>Donate & Act</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.donate ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.donate && (
              <div className="mobile-accordion-body">
                <Link to="/donate" onClick={closeMobileMenu}>• Online Donation Portal</Link>
                <Link to="/donate#ways-to-give" onClick={closeMobileMenu}>• 80G & 12A Tax Exemption Benefits</Link>
                <button
                  type="button"
                  className="mobile-text-btn"
                  onClick={() => {
                    closeMobileMenu();
                    if (onOpenVolunteer) onOpenVolunteer();
                  }}
                >
                  • Join as Volunteer
                </button>
                <button
                  type="button"
                  className="mobile-text-btn"
                  onClick={() => {
                    closeMobileMenu();
                    if (onOpenPartner) onOpenPartner();
                  }}
                >
                  • Corporate CSR Partnerships
                </button>
              </div>
            )}
          </li>

          {/* Media & Events Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('media')}
            >
              <span>Events & Media</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.media ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.media && (
              <div className="mobile-accordion-body">
                <Link to="/events" onClick={closeMobileMenu}>• Charity Events & Medical Camps</Link>
                <Link to="/gallery" onClick={closeMobileMenu}>• Photo & Video Gallery</Link>
                <Link to="/blog" onClick={closeMobileMenu}>• Blog & Field Dispatches</Link>
              </div>
            )}
          </li>

          {/* Contact Accordion */}
          <li>
            <div
              className="mobile-nav-link accordion-trigger"
              onClick={() => toggleMobileAccordion('contact')}
            >
              <span>Contact Us</span>
              <ChevronDown
                size={16}
                className={`accordion-chevron ${mobileExpanded.contact ? 'expanded' : ''}`}
              />
            </div>
            {mobileExpanded.contact && (
              <div className="mobile-accordion-body">
                <Link to="/contact" onClick={closeMobileMenu}>• Support & Care Helpline</Link>
                <Link to="/contact#locations" onClick={closeMobileMenu}>• Headquarters & Regional Desks</Link>
                <Link to="/donate#ways-to-give" onClick={closeMobileMenu}>• Direct Bank Wire Info (NEFT)</Link>
              </div>
            )}
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
