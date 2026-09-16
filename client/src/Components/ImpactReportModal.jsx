import React from 'react';
import { X, FileText, Download, ShieldCheck } from 'lucide-react';

export default function ImpactReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
            <FileText size={26} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Annual Social Impact & Audit Reports</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Full public disclosure of project outcomes, audited balance sheets, and verified metric achievements.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem 1.25rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <strong>Annual Impact & Financial Report 2025–2026</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF • 4.2 MB • Audited by Deloitte & Touche LLP</div>
              </div>
            </div>
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); alert("Downloading Annual Impact Report 2025-2026 (PDF)..."); }}
              className="btn btn-outline btn-sm"
            >
              <Download size={14} /> Download
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem 1.25rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <strong>Quarterly Field Evaluation: Q1–Q3 2026</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF • 2.8 MB • Water, Health, & Education KPIs</div>
              </div>
            </div>
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); alert("Downloading Quarterly Field Evaluation Report (PDF)..."); }}
              className="btn btn-outline btn-sm"
            >
              <Download size={14} /> Download
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem 1.25rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={22} color="var(--secondary)" style={{ flexShrink: 0 }} />
              <div>
                <strong>80G & 12A Tax Exemption Certificate</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF • 1.1 MB • Government Non-Profit Registration</div>
              </div>
            </div>
            <a
              href="#download"
              onClick={(e) => { e.preventDefault(); alert("Downloading 80G Tax Exemption Certificate (PDF)..."); }}
              className="btn btn-outline btn-sm"
            >
              <Download size={14} /> Download
            </a>
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
          Close Viewer
        </button>
      </div>
    </div>
  );
}
