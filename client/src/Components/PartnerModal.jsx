import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPartner } from '../Redux/ActionCreators/PartnerActionCreators';
import { X, CheckCircle2, Building2, Handshake } from 'lucide-react';

export default function PartnerModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnerType: 'Corporate CSR Partnership',
    budgetRange: '₹50,000 - ₹2,50,000',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPartner({
      name: form.organization,
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      partnershipType: form.partnerType,
      budgetRange: form.budgetRange,
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
                background: 'var(--secondary-subtle)',
                color: 'var(--secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}>
                <Handshake size={26} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Partner With Us</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Join forces through Corporate CSR, Institutional grants, or co-sponsored social initiatives.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Acme Technologies Inc."
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                />
              </div>

              <div className="grid grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Contact Person *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Anita Roy"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Official Work Email *</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="csr@acme.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">Partnership Type</label>
                  <select
                    className="form-control"
                    value={form.partnerType}
                    onChange={(e) => setForm({ ...form, partnerType: e.target.value })}
                  >
                    <option>Corporate CSR Partnership</option>
                    <option>Grant / Philanthropic Trust</option>
                    <option>Employee Giving Campaign</option>
                    <option>In-Kind Goods / Equipment Sponsor</option>
                    <option>Media / Academic Research</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Estimated Budget / Commitment</label>
                  <select
                    className="form-control"
                    value={form.budgetRange}
                    onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                  >
                    <option>₹50,000 - ₹2,50,000</option>
                    <option>₹2,50,000 - ₹10,00,000</option>
                    <option>₹10,00,000 - ₹50,00,000</option>
                    <option>₹50,00,000+</option>
                    <option>Non-Monetary / In-Kind</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Partnership Scope / Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Tell us about your organization's CSR objectives, target demographics, or timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
                <Building2 size={18} />
                Submit Partnership Proposal
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
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Proposal Received!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Thank you for exploring partnership with Subhashish Foundation. Our CSR Director will reach out to <strong>{form.email}</strong> within 1–2 business days.
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
