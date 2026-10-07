import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../Redux/ActionCreators/AboutActionCreators';
import { createContactUs } from '../Redux/ActionCreators/ContactUsActionCreators';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact({ onOpenVolunteer }) {
  const dispatch = useDispatch();
  const AboutStateData = useSelector((state) => state.AboutStateData);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  const about = Array.isArray(AboutStateData)
    ? AboutStateData[0]
    : (AboutStateData?.data?.[0] || null);

  const address = about?.address
    ? [about.address.street, about.address.city, about.address.state, about.address.country, about.address.pincode]
        .filter(Boolean)
        .join(', ')
    : '204 Hope Avenue, Social Impact Block, New Delhi, 110001, India';

  const contactPhone = about?.contactPhone || '+91 (11) 2894-3200 / +1 (800) 555-0199';
  const contactEmail = about?.contactEmail || 'care@subhashishfoundation.org';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createContactUs({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message
    }));
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            We'd Love to Hear From You
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            Get in Touch With Our Care Team
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem' }}>
            Have questions about donations, volunteer opportunities, CSR partnerships, or media inquiries? Our desk is here to assist.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '3.5rem' }}>
            {/* Contact Info Cards */}
            <div>
              <span className="section-tag">Direct Contacts</span>
              <h2 className="section-title">Reach Out to Any of Our Regional Desks</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                We operate across multiple regional hubs. Reach out directly or visit our headquarters during operational hours.
              </p>

              <div id="locations" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>Registered Headquarters</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {address}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--secondary-subtle)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>Helpline & Donor Care</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {contactPhone} (Mon–Sat, 9AM–6PM IST)
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>Official Inquiries</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      General Inquiries: <a href={`mailto:${contactEmail}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{contactEmail}</a>
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Want to Volunteer Instead?</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Skip the general contact form and directly apply for our upcoming volunteer cohorts.
                </p>
                <button type="button" className="btn btn-outline btn-sm" onClick={onOpenVolunteer}>
                  Apply as Volunteer &rarr;
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)' }}>
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Send Us a Message</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    We typically reply within 24 business hours.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Subhashish Roy"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 (0) 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-control"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option>General Inquiry</option>
                      <option>Donation & 80G Tax Exemption</option>
                      <option>Corporate CSR & Partnership</option>
                      <option>Volunteer Program</option>
                      <option>Media / Press Relations</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      rows="4"
                      required
                      className="form-control"
                      placeholder="How can we help you or collaborate?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#dcfce7',
                    color: '#16a34a',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <CheckCircle2 size={38} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Thank you, <strong>{form.name}</strong>. Your message has been routed to our care team. We will respond to <strong>{form.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
