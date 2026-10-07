import React, { useState } from 'react';
import {
  X,
  MapPin,
  Users,
  Heart,
  Target,
  CheckCircle2,
  Calendar,
  Share2,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Check,
  HandHeart,
  AlertCircle
} from 'lucide-react';

export default function CampaignModal({
  campaign,
  isOpen,
  onClose,
  onOpenDonate,
  onOpenVolunteer
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !campaign) return null;

  const raised = Number(campaign.collectedAmount ?? campaign.raisedAmount ?? campaign.raised ?? 0);
  const target = Number(campaign.targetAmount ?? campaign.goal ?? campaign.totalBudget ?? 500000);
  const percent = Math.min(Math.round((raised / (target || 1)) * 100), 100);

  let daysLeft = campaign.daysLeft;
  if (daysLeft === undefined && campaign.endDate) {
    const diff = new Date(campaign.endDate).getTime() - Date.now();
    daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
  if (daysLeft === undefined) daysLeft = 18;

  const donors = campaign.donorsCount ?? campaign.donors ?? (raised > 0 ? Math.floor(raised / 550) + 12 : 36);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: campaign.title,
          text: campaign.shortDescription || campaign.description || campaign.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const objectives = campaign.objectives || [
    'Procure and deploy mission-critical field supplies, medical equipment, or relief units',
    'Mobilize rapid response teams directly to verified vulnerable beneficiary settlements',
    'Provide weekly transparent financial and operational outcome updates to donors',
    'Guarantee 100% field delivery efficiency backed by 80G tax receipts'
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-dialog modal-dialog-large"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'min(860px, 95vw)',
          padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem', paddingRight: '2.5rem' }}>
          <span
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#dc2626',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertCircle size={14} />
            <span>{campaign.category || 'Urgent Campaign'}</span>
          </span>

          <span
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#b45309',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Clock size={13} />
            <span>{daysLeft > 0 ? `${daysLeft} Days Remaining` : 'Closing Soon'}</span>
          </span>

          {campaign.featured && (
            <span
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#059669',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={13} />
              <span>Priority Mission</span>
            </span>
          )}
        </div>

        {/* Header Title */}
        <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', lineHeight: 1.3, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
          {campaign.title}
        </h2>

        {/* Location & Beneficiaries Meta Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          {campaign.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={16} color="var(--secondary)" />
              <span>{campaign.location}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Users size={16} color="var(--primary)" />
            <span>
              <strong>{Number(campaign.beneficiariesCount || 400).toLocaleString()}+</strong> Beneficiaries
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <CheckCircle2 size={16} color="#059669" />
            <span>
              <strong>{donors.toLocaleString()}</strong> Donors Backed
            </span>
          </div>
        </div>

        {/* Featured Image & Funding Progress Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
          {/* Campaign Image */}
          <div style={{ position: 'relative', height: '260px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <img
              src={campaign.image || campaign.featuredImage || campaign.img || '/assets/images/cause-3.jpg'}
              alt={campaign.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%)'
              }}
            />
            <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', color: 'white' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.9, letterSpacing: '0.05em' }}>
                Relief Operation
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {campaign.location || 'Verified Emergency Action'}
              </div>
            </div>
          </div>

          {/* Funding Card */}
          <div
            style={{
              background: 'var(--bg-alt)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Target Budget Mobilization
                </span>
                <span
                  style={{
                    background: 'white',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#ea580c',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <TrendingUp size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {percent}% Achieved
                </span>
              </div>

              {/* Progress track */}
              <div className="progress-track" style={{ height: '10px', marginBottom: '0.85rem' }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${percent}%`,
                    background: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 100%)'
                  }}
                />
              </div>

              {/* Raised vs Goal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount Raised</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)' }}>
                    ₹{raised.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required Goal</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    ₹{target.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: 'white', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Supporters</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  {donors.toLocaleString()} Backers
                </div>
              </div>
              <div style={{ background: 'white', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tax Exemption</div>
                <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <ShieldCheck size={14} /> 80G Certified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Target size={18} color="var(--primary)" /> Emergency Campaign Objective
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            {campaign.fullDescription || campaign.description}
          </p>
        </div>

        {/* Key Action Objectives */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={18} color="#059669" /> Immediate Milestones & Deliverables
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {objectives.map((obj, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-alt)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-light)'
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.4rem' }}
              onClick={() => {
                onClose();
                if (onOpenDonate) onOpenDonate(campaign.title);
              }}
            >
              <Heart size={16} fill="white" /> Donate to This Campaign
            </button>

            {onOpenVolunteer && (
              <button
                type="button"
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
                onClick={() => {
                  onClose();
                  onOpenVolunteer();
                }}
              >
                <HandHeart size={16} /> Volunteer
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleShare}
              title="Share Campaign"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              {copied ? <Check size={14} color="#059669" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
