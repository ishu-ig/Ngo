import React from 'react';
import {
  BookOpen,
  Stethoscope,
  Users,
  Heart,
  TreePine,
  Utensils,
  Briefcase,
  Layers,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function ProgramCard({
  program,
  onOpenDonate,
  onOpenDetails
}) {
  if (!program) return null;

  const raised = Number(program.budget?.raisedAmount ?? program.raised ?? 0);
  const target = Number(program.budget?.targetAmount ?? program.target ?? program.goal ?? 1);
  const percent = Math.min(Math.round((raised / target) * 100), 100);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Education':
        return <BookOpen size={14} />;
      case 'Healthcare':
        return <Stethoscope size={14} />;
      case 'Women Empowerment':
        return <Users size={14} />;
      case 'Child Welfare':
        return <Heart size={14} />;
      case 'Environment':
        return <TreePine size={14} />;
      case 'Disaster Relief':
      case 'Food & Relief':
        return <Utensils size={14} />;
      case 'Clean Water':
        return <Layers size={14} />;
      case 'Skill Development':
        return <Briefcase size={14} />;
      default:
        return <Sparkles size={14} />;
    }
  };

  const imgUrl = program.featuredImage || program.img || '/assets/images/cause-2.jpg';
  const category = program.category || 'Initiative';

  return (
    <div className="cause-card program-card">
      <div
        className="cause-img-box"
        onClick={() => onOpenDetails && onOpenDetails(program)}
        title={`View ${program.title} details`}
      >
        <img
          src={imgUrl}
          alt={program.title}
          className="cause-img"
          loading="lazy"
        />
        <div className="cause-category-badge">
          {getCategoryIcon(category)}
          <span>{category}</span>
        </div>
      </div>

      <div className="cause-body">
        <h3
          className="cause-title"
          onClick={() => onOpenDetails && onOpenDetails(program)}
          title={program.title}
        >
          {program.title}
        </h3>

        {/* Long description - visible on desktop, hidden on mobile */}
        <p className="cause-desc">
          {program.shortDescription || program.desc || (program.fullDescription ? program.fullDescription.slice(0, 100) + '...' : '')}
        </p>

        {/* Location & Beneficiaries - visible on desktop, hidden on mobile */}
        {program.location && (
          <div className="cause-meta-item location-meta">
            <MapPin size={13} color="var(--secondary)" />
            <span>{program.location}</span>
          </div>
        )}

        {program.beneficiaries?.count && (
          <div className="cause-meta-item beneficiaries-meta">
            <Users size={13} color="var(--primary)" />
            <span><strong>{Number(program.beneficiaries.count).toLocaleString()}</strong> Beneficiaries impacted</span>
          </div>
        )}

        {/* Progress Bar & Stats - always visible */}
        <div className="cause-progress">
          <div className="cause-progress-labels">
            <span className="cause-raised-label">Raised: ₹{raised.toLocaleString('en-IN')}</span>
            <strong className="cause-percent-label">{percent}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        {/* Action Buttons - Perfectly Aligned at bottom */}
        <div className="cause-actions" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-primary btn-sm support-btn"
            onClick={() => onOpenDonate && onOpenDonate(program.title)}
          >
            <span className="btn-text-full">Support Program</span>
            <span className="btn-text-short">Support</span>
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm details-btn"
            onClick={() => onOpenDetails && onOpenDetails(program)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
