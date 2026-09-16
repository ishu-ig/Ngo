import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../Redux/ActionCreators/AboutActionCreators';
import { Heart, MapPin, Phone, Mail, Shield, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenDonate, onOpenVolunteer, onOpenPartner, onOpenImpactReport }) {
  const dispatch = useDispatch();
  const AboutStateData = useSelector((state) => state.AboutStateData);

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  const about = Array.isArray(AboutStateData)
    ? AboutStateData[0]
    : (AboutStateData?.data?.[0] || null);

  const ngoName = about?.ngoName || 'Subhashish Wellfare Foundation';
  const tagline = about?.tagline || 'Empowering Humanity, Transforming Lives';
  const description = about?.description || 'Together, We Can Create a Better Tomorrow. Dedicated to empowering underprivileged children, clean water, medical healthcare, and women self-reliance across communities in India.';
  const contactPhone = about?.contactPhone || '+91 9876543210';
  const contactEmail = about?.contactEmail || 'support@subhashishngo.org';
  const address = about?.address
    ? [about.address.street, about.address.city, about.address.state, about.address.country, about.address.pincode]
        .filter(Boolean)
        .join(', ')
    : 'Building 5, Seva Marg, Civil Lines, New Delhi, India';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr 1.2fr', gap: '2rem' }}>
          {/* Col 1: NGO Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-icon-wrapper" style={{ width: 40, height: 40 }}>
                <Heart size={22} fill="white" />
              </div>
              <div className="brand-text">
                <span className="brand-title" style={{ color: 'white', fontSize: '1.2rem' }}>Subhashish</span>
                <span className="brand-subtitle" style={{ color: '#2dd4bf', fontSize: '0.68rem' }}>Wellfare Foundation</span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.825rem', marginBottom: '1.25rem' }}>
              <Shield size={16} />
              <span>Certified 80G & 501(c)(3) NGO • Reg #{about?.establishedYear ? `EST-${about.establishedYear}` : '2012-DEL-8942'}</span>
            </div>

            {/* Social Media Links */}
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                ig
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                in
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                yt
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="X (Twitter)">
                𝕏
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/causes">Programs</Link></li>
              <li><a href="/#impact-section">Our Impact</a></li>
              <li><a href="/#featured-campaign-section">Campaigns</a></li>
              <li><a href="/#stories-section">Success Stories</a></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blog">Blog / News</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Get Involved */}
          <div>
            <h3>Get Involved</h3>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  onClick={onOpenDonate}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Donate Online
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenVolunteer}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Volunteer With Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPartner}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Partner With Us (CSR)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenDonate('Fundraise Campaign')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Fundraise For A Cause
                </button>
              </li>
              <li><Link to="/events">Charity Events</Link></li>
            </ul>
          </div>

          {/* Col 4: Transparency & Governance */}
          <div>
            <h3>Transparency</h3>
            <ul className="footer-links">
              <li>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Registration Details: #{about?.establishedYear ? `DEL-${about.establishedYear}` : 'DEL-8942'}</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenImpactReport}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Annual Reports (PDF)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenImpactReport}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Financial Audits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenImpactReport}
                  style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.925rem' }}
                >
                  Impact Reports
                </button>
              </li>
              <li>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>80G & 12A Certified</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Desk */}
          <div>
            <h3>Headquarters</h3>
            <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                <span>{contactPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                <span>{contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom (Legal & Copyright) */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {ngoName} {tagline}. All rights reserved. Registered Non-Profit Entity.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-light)', cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ color: 'var(--text-light)', cursor: 'pointer' }}>Terms & Conditions</span>
            <span style={{ color: 'var(--text-light)', cursor: 'pointer' }}>Refund Policy</span>
            <button
              type="button"
              onClick={scrollToTop}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.8rem'
              }}
            >
              <ArrowUp size={13} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
