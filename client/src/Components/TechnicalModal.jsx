import React from 'react';
import { X, Wrench, Phone, Mail, ArrowRight } from 'lucide-react';

export default function TechnicalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
            padding: '1.75rem 1.75rem 1.25rem 1.75rem',
            borderBottom: '1px solid #fed7aa',
            position: 'relative',
            textAlign: 'center'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'white',
              border: '1px solid #fed7aa',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#9a3412',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(234, 88, 12, 0.35)',
              marginBottom: '1rem'
            }}
          >
            <Wrench size={32} />
          </div>

          <span
            style={{
              background: '#ea580c',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-block',
              marginBottom: '0.5rem'
            }}
          >
            Temporary Notice
          </span>

          <h3
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#7c2d12',
              margin: '0 0 0.35rem 0',
              lineHeight: 1.25
            }}
          >
            Gateway Under Technical Maintenance
          </h3>
          <p style={{ color: '#9a3412', fontSize: '0.9rem', margin: 0 }}>
            Scheduled system upgrade in progress
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem' }}>
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              fontSize: '0.925rem',
              lineHeight: 1.65,
              color: '#334155'
            }}
          >
            <p style={{ margin: '0 0 0.85rem 0' }}>
              Our payment gateway infrastructure is temporarily undergoing <strong>scheduled security & compliance updates</strong> to enhance transaction protection.
            </p>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
              Online automated checkout will be restored shortly. We sincerely apologize for any inconvenience caused.
            </p>
          </div>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Alternative Contribution Options:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <a
              href="tel:+919876543210"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'white',
                border: '1px solid #cbd5e1',
                textDecoration: 'none',
                color: '#0f172a',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(20, 184, 166, 0.12)', color: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block' }}>Call NGO Helpline</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>+91 9876543210 (Direct Assistance)</span>
                </div>
              </div>
              <ArrowRight size={16} color="#0f766e" />
            </a>

            <a
              href="mailto:support@subhashishngo.org?subject=Donation%20Inquiry%20-%20Subhashish%20Wellfare%20Foundation"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'white',
                border: '1px solid #cbd5e1',
                textDecoration: 'none',
                color: '#0f172a',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block' }}>Email Support</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>support@subhashishngo.org</span>
                </div>
              </div>
              <ArrowRight size={16} color="#2563eb" />
            </a>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-full)'
            }}
            onClick={onClose}
          >
            I Understand, Close
          </button>
        </div>
      </div>
    </div>
  );
}
