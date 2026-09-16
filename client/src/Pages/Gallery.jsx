import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGallery } from '../Redux/ActionCreators/GalleryActionCreators';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const dispatch = useDispatch();
  const GalleryStateData = useSelector((state) => state.GalleryStateData);

  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  const defaultImages = [
    { id: 1, src: '/assets/images/image_1.jpg', category: 'Education', title: 'Interactive Learning in Village Classrooms' },
    { id: 2, src: '/assets/images/image_2.jpg', category: 'Healthcare', title: 'Pediatric Health & Immunization Camp' },
    { id: 3, src: '/assets/images/image_3.jpg', category: 'Water', title: 'Solar Well Inauguration in Drought Region' },
    { id: 4, src: '/assets/images/image_4.jpg', category: 'Food Relief', title: 'Daily Hot Meal Distribution' },
    { id: 5, src: '/assets/images/image_5.jpg', category: 'Education', title: 'Distribution of School Bags & Uniforms' },
    { id: 6, src: '/assets/images/image_6.jpg', category: 'Healthcare', title: 'Mobile Medical Van Checking Vitals' },
    { id: 7, src: '/assets/images/cause-1.jpg', category: 'Water', title: 'Clean Water Tap Setup for 150 Families' },
    { id: 8, src: '/assets/images/cause-2.jpg', category: 'Education', title: 'Digital Tablet Learning Session' },
    { id: 9, src: '/assets/images/cause-4.jpg', category: 'Empowerment', title: 'Women Vocational Sewing Workshop' },
  ];

  const rawGallery = Array.isArray(GalleryStateData)
    ? GalleryStateData
    : (GalleryStateData?.data || []);

  const images = rawGallery.length > 0
    ? rawGallery.map((g) => ({
        id: g._id,
        src: g.mediaUrl || g.imageUrl || g.pic || '/assets/images/image_1.jpg',
        category: g.category || 'General',
        title: g.title || g.description || 'NGO Field Moment'
      }))
    : defaultImages;

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];

  const filtered = activeTab === 'All'
    ? images
    : images.filter(img => img.category === activeTab);

  return (
    <div>
      {/* Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            Moments That Matter
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            Impact in Action Photo Gallery
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem' }}>
            Unfiltered snapshots of our field teams, volunteers, and the smiles of thousands of children we serve every day.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section">
        <div className="container">
          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid',
                  borderColor: activeTab === cat ? 'var(--primary)' : 'var(--border-light)',
                  background: activeTab === cat ? 'var(--primary)' : 'white',
                  color: activeTab === cat ? 'white' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-3">
            {filtered.map((img) => (
              <div
                key={img.id}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                  height: '280px',
                  group: 'true'
                }}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                    color: 'white'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#2dd4bf', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {img.category}
                  </span>
                  <h4 style={{ color: 'white', fontSize: '1.05rem', margin: '0.2rem 0 0.5rem 0' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <ZoomIn size={14} /> Click to enlarge
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '90%',
              background: 'black',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: 'none',
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={22} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain' }}
            />
            <div style={{ background: '#0f172a', padding: '1.25rem 1.75rem', color: 'white' }}>
              <span style={{ color: '#2dd4bf', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>
                {selectedImage.category}
              </span>
              <h3 style={{ color: 'white', fontSize: '1.25rem', marginTop: '0.25rem' }}>
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
