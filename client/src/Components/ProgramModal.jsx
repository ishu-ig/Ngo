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
  BookOpen,
  Stethoscope,
  TreePine,
  Utensils,
  Briefcase,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Check,
  HandHeart
} from 'lucide-react';

export default function ProgramModal({
  program,
  isOpen,
  onClose,
  onOpenDonate,
  onOpenVolunteer
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !program) return null;

  const raised = Number(program.budget?.raisedAmount ?? program.raised) || 0;
  const target = Number(program.budget?.targetAmount ?? program.target ?? program.goal) || 1;
  const percent = Math.min(Math.round((raised / target) * 100), 100);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Education':
        return <BookOpen size={15} />;
      case 'Healthcare':
        return <Stethoscope size={15} />;
      case 'Women Empowerment':
      case 'Empowerment':
        return <Users size={15} />;
      case 'Child Welfare':
        return <Heart size={15} />;
      case 'Environment':
        return <TreePine size={15} />;
      case 'Disaster Relief':
      case 'Food & Relief':
        return <Utensils size={15} />;
      case 'Skill Development':
        return <Briefcase size={15} />;
      default:
        return <Layers size={15} />;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: program.title,
          text: program.shortDescription || program.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const objectives = program.objectives || [
    'Execute targeted grassroots field interventions in direct coordination with village leaders',
    'Deliver essential learning, nutrition, and medical resources to verified beneficiary households',
    'Conduct continuous impact assessment and transparent outcome reporting',
    'Establish self-sustaining community committees for long-term viability'
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
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {getCategoryIcon(program.category)}
            <span>{program.category || 'Social Initiative'}</span>
          </span>

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
            <span>{program.status ? program.status.toUpperCase() : 'ACTIVE PROGRAM'}</span>
          </span>
        </div>

        {/* Header Title */}
        <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', lineHeight: 1.3, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
          {program.title}
        </h2>

        {/* Location & Beneficiaries Meta Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          {program.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={16} color="var(--secondary)" />
              <span>{program.location}</span>
            </div>
          )}

          {program.beneficiaries?.count && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Users size={16} color="var(--primary)" />
              <span>
                <strong>{Number(program.beneficiaries.count).toLocaleString()}</strong> Beneficiaries Impacted
              </span>
            </div>
          )}

          {program.startDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={16} color="var(--text-muted)" />
              <span>Started: {new Date(program.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          )}
        </div>

        {/* Featured Image & Funding Progress Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
          {/* Program Image */}
          <div style={{ position: 'relative', height: '260px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <img
              src={program.featuredImage || '/assets/images/cause-2.jpg'}
              alt={program.title}
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
                Field Operation
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {program.targetGroup || (program.beneficiaries?.targetGroup) || 'Verified Grassroots Program'}
              </div>
            </div>
          </div>

          {/* Funding & Impact Card */}
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
                  Program Funding Goal
                </span>
                <span
                  style={{
                    background: 'white',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <TrendingUp size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {percent}% Funded
                </span>
              </div>

              {/* Progress bar */}
              <div className="progress-track" style={{ height: '9px', marginBottom: '0.85rem' }}>
                <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
              </div>

              {/* Raised vs Goal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount Mobilized</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)' }}>
                    ₹{raised.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Budget</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    ₹{target.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: 'white', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Beneficiaries</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  {Number(program.beneficiaries?.count || 1200).toLocaleString()}+
                </div>
              </div>
              <div style={{ background: 'white', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tax Benefit</div>
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
            <Target size={18} color="var(--primary)" /> About this Social Program
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            {program.fullDescription || program.shortDescription}
          </p>
        </div>

        {/* Key Objectives / Action Items */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={18} color="#059669" /> Key Objectives & Impact Highlights
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
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.4rem' }}
              onClick={() => {
                onClose();
                if (onOpenDonate) onOpenDonate(program.title);
              }}
            >
              <Heart size={16} fill="white" /> Support This Program
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
              title="Share Program"
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
