import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createVolunteer } from '../Redux/ActionCreators/VolunteerActionCreators';
import { X, CheckCircle2, Users, HandHeart } from 'lucide-react';

export default function VolunteerModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Education & Mentorship',
    availability: 'Weekends',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVolunteer({
      name: form.name,
      email: form.email,
      phone: form.phone,
      areasOfInterest: [form.interest],
      availability: form.availability,
      message: form.message
    }));
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--primary-subtle)',
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}>
                <HandHeart size={26} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Become a Changemaker</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Join 4,500+ volunteers dedicating time and passion to transform lives.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Area of Interest</label>
                  <select
                    className="form-control"
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  >
                    <option>Education & Mentorship</option>
                    <option>Medical & Health Drives</option>
                    <option>Food & Ration Distribution</option>
                    <option>Fundraising & Outreach</option>
                    <option>Digital / Media & Design</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Availability</label>
                  <select
                    className="form-control"
                    value={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.value })}
                  >
                    <option>Weekends Only</option>
                    <option>Full-Time (Internship)</option>
                    <option>Flexible / Remote</option>
                    <option>Emergency Drives</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Brief Note / Skills (Optional)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Tell us a little about your background or why you want to volunteer..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Users size={18} />
                Submit Volunteer Application
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
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
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Welcome Aboard, {form.name}!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We have received your volunteer application. Our regional coordinator will reach out to <strong>{form.email}</strong> within 24–48 hours for orientation details.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleClose} style={{ width: '100%' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
