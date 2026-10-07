import React from 'react';
import {
  Heart,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CampaignCard({
  campaign,
  onOpenDonate,
  onOpenDetails,
  variant = 'card'
}) {
  if (!campaign) return null;

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
  const imgUrl = campaign.image || campaign.featuredImage || campaign.img || '/assets/images/cause-3.jpg';
  const category = campaign.category || 'Urgent Campaign';

  // Featured variant (Hero banner for section 6 on Home page)
  if (variant === 'featured') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #022c22 0%, #0f766e 100%)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          color: 'white',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <div className="grid grid-2" style={{ alignItems: 'center' }}>
          <div style={{ padding: 'clamp(1.5rem, 4vw, 3.5rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="section-tag tag-accent" style={{ margin: 0 }}>
                🚨 Featured Urgent Campaign
              </span>
              <span style={{ fontSize: '0.85rem', color: '#fef08a', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>Deadline: {daysLeft} Days Left</span>
              </span>
            </div>

            <h2
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: 'white', lineHeight: 1.2, cursor: onOpenDetails ? 'pointer' : 'default' }}
              onClick={() => onOpenDetails && onOpenDetails(campaign)}
              title={onOpenDetails ? 'Click for campaign details' : ''}
            >
              {campaign.title}
            </h2>

            <p style={{ color: '#ccfbf1', fontSize: '1.05rem', lineHeight: 1.65 }}>
              {campaign.shortDescription || campaign.description}
            </p>

            {/* Progress Bar & Stats */}
            <div style={{ margin: '0.5rem 0' }}>
              <div className="progress-track" style={{ height: '12px', background: 'rgba(255, 255, 255, 0.2)' }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${percent}%`,
                    background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#e0f2fe', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                <span>Amount Raised: <strong style={{ color: '#fef08a' }}>₹{raised.toLocaleString('en-IN')}</strong></span>
                <span>Amount Required: <strong style={{ color: 'white' }}>₹{target.toLocaleString('en-IN')}</strong> ({percent}%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.35rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                <span>Beneficiaries: <strong>{Number(campaign.beneficiariesCount || 400).toLocaleString()}+ Impacted</strong></span>
                <span>Donors: <strong>{donors.toLocaleString()} Backers</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-lg pulse-animation"
                onClick={() => onOpenDonate && onOpenDonate(campaign.title)}
              >
                <Heart size={18} fill="white" />
                Donate Now
              </button>
              {onOpenDetails && (
                <button
                  type="button"
                  className="btn btn-outline-white btn-lg"
                  onClick={() => onOpenDetails(campaign)}
                >
                  View Campaign Details
                </button>
              )}
            </div>
          </div>

          <div
            style={{ width: '100%', height: 'clamp(260px, 40vw, 480px)', cursor: onOpenDetails ? 'pointer' : 'default', overflow: 'hidden' }}
            onClick={() => onOpenDetails && onOpenDetails(campaign)}
          >
            <img
              src={imgUrl}
              alt={campaign.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Variant (for grids in Home, About, Causes)
  return (
    <div
      className="cause-card campaign-card"
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        height: '100%'
      }}
    >
      {/* Thumbnail Header */}
      <div
        className="cause-img-box"
        style={{ position: 'relative', height: '200px', overflow: 'hidden', cursor: onOpenDetails ? 'pointer' : 'default' }}
        onClick={() => onOpenDetails && onOpenDetails(campaign)}
        title={onOpenDetails ? `View ${campaign.title} details` : ''}
      >
        <img
          src={imgUrl}
          alt={campaign.title}
          className="cause-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        />

        {/* Category Badge */}
        <div
          className="cause-category-badge"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <AlertCircle size={13} color="#f87171" />
          <span>{category}</span>
        </div>

        {/* Deadline Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(234, 88, 12, 0.85)',
            backdropFilter: 'blur(6px)',
            color: 'white',
            padding: '4px 9px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Clock size={12} />
          <span>{daysLeft}d left</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="cause-body" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3
          className="cause-title"
          style={{ fontSize: '1.1rem', marginBottom: '0.55rem', lineHeight: 1.35, cursor: onOpenDetails ? 'pointer' : 'default', transition: 'color 0.2s ease' }}
          onClick={() => onOpenDetails && onOpenDetails(campaign)}
          onMouseEnter={(e) => { if (onOpenDetails) e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; }}
        >
          {campaign.title}
        </h3>

        <p className="cause-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem', flexGrow: 1 }}>
          {campaign.shortDescription || campaign.description || ''}
        </p>

        {/* Location & Beneficiaries Meta */}
        <div className="cause-meta-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {campaign.location && (
            <div className="location-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} color="var(--secondary)" />
              <span className="text-truncate">{campaign.location}</span>
            </div>
          )}

          <div className="beneficiaries-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Users size={13} color="var(--primary)" />
              <span><strong>{Number(campaign.beneficiariesCount || 400).toLocaleString()}+</strong> Beneficiaries</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={13} color="#059669" />
              <span><strong>{donors}</strong> Donors</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="cause-progress" style={{ marginBottom: '1.15rem' }}>
          <div className="cause-progress-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Raised: <strong>₹{raised.toLocaleString('en-IN')}</strong></span>
            <strong style={{ color: '#ea580c' }}>{percent}%</strong>
          </div>
          <div className="progress-track" style={{ height: '7px' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${percent}%`,
                background: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 100%)'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <span>Goal: ₹{target.toLocaleString('en-IN')}</span>
            <span>Target Reached</span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="cause-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm support-btn"
            style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            onClick={() => onOpenDonate && onOpenDonate(campaign.title)}
          >
            <Heart size={13} fill="white" />
            <span className="btn-text-full">Donate Now</span>
            <span className="btn-text-short">Donate</span>
          </button>
          {onOpenDetails && (
            <button
              type="button"
              className="btn btn-outline btn-sm details-btn"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.82rem' }}
              onClick={() => onOpenDetails(campaign)}
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
