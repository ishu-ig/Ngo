import React from 'react';
import { X, MapPin, Heart } from 'lucide-react';

export default function StoryModal({ story, isOpen, onClose, onOpenDonate }) {
  if (!isOpen || !story) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="grid grid-2" style={{ gap: '2rem', alignItems: 'center' }}>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 'clamp(200px, 35vw, 320px)' }}>
            <img
              src={story.photo}
              alt={story.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className="section-tag" style={{ marginBottom: '0.5rem' }}>{story.program}</span>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>{story.name}'s Transformation</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <MapPin size={14} color="var(--primary)" /> {story.location}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              {story.fullStory || story.shortStory}
            </p>

            <div style={{ background: 'var(--bg-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
              <strong>Result / Transformation:</strong> {story.result}
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                onOpenDonate(story.program);
              }}
            >
              <Heart size={16} fill="white" /> Support Similar Children
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
