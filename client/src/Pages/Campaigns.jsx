import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaign } from '../Redux/ActionCreators/CampaignActionCreators';
import CampaignCard from '../Components/CampaignCard';
import CampaignModal from '../Components/CampaignModal';
import { defaultCampaigns } from '../data/defaultCampaigns';
import {
  Search,
  AlertTriangle,
  Clock,
  Sparkles,
  Heart,
  Droplet,
  Flame,
  ShieldAlert,
  Stethoscope,
  BookOpen
} from 'lucide-react';

export default function Campaigns({ onOpenDonate, onOpenVolunteer }) {
  const dispatch = useDispatch();
  const CampaignStateData = useSelector((state) => state.CampaignStateData);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getCampaign());
  }, [dispatch]);

  const rawCampaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : (CampaignStateData?.data || []);
  const allCampaigns = rawCampaigns.length > 0 ? rawCampaigns : defaultCampaigns;

  const featuredCampaign = allCampaigns.find((c) => c.featured) || allCampaigns[0];

  const categories = [
    'All',
    'Healthcare Emergency',
    'Clean Water',
    'Disaster Relief',
    'Winter Relief',
    'Education Rights',
    'Disability Support',
    'Nutrition & Hunger'
  ];

  const filteredCampaigns = allCampaigns.filter((camp) => {
    const title = camp.title || '';
    const desc = camp.shortDescription || camp.description || camp.fullDescription || '';
    const loc = camp.location || '';
    const cat = camp.category || '';

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      cat.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Calculate dynamic summary stats
  const totalRaised = allCampaigns.reduce(
    (sum, c) => sum + Number(c.collectedAmount ?? c.raisedAmount ?? c.raised ?? 0),
    0
  );
  const totalGoal = allCampaigns.reduce(
    (sum, c) => sum + Number(c.targetAmount ?? c.goal ?? 500000),
    0
  );
  const totalBeneficiaries = allCampaigns.reduce(
    (sum, c) => sum + Number(c.beneficiariesCount || 500),
    0
  );

  return (
    <div className="campaigns-page" style={{ paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #022c22 100%)',
          color: 'white',
          padding: 'clamp(3.5rem, 7vw, 5.5rem) 0 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <span
              className="section-tag tag-accent"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}
            >
              <AlertTriangle size={15} /> Emergency Relief Appeals
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-heading)'
              }}
            >
              Active Time-Sensitive Campaigns
            </h1>
            <p
              style={{
                color: '#cbd5e1',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: 1.65,
                marginBottom: '2rem'
              }}
            >
              When disaster strikes or critical medical crises arise, urgent intervention saves lives. Explore our active emergency relief drives and contribute directly to verified field operations.
            </p>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginTop: '2.5rem',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '1.75rem', color: '#fef08a', fontWeight: 800 }}>
                  {allCampaigns.length}
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Active Campaigns</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.75rem', color: '#6ee7b7', fontWeight: 800 }}>
                  ₹{(totalRaised / 100000).toFixed(1)}L+
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Emergency Funds Raised</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.75rem', color: '#93c5fd', fontWeight: 800 }}>
                  {totalBeneficiaries.toLocaleString()}+
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>People Receiving Aid</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.75rem', color: '#fca5a5', fontWeight: 800 }}>
                  100%
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Direct Field Allocation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaign Spotlight */}
      {featuredCampaign && (
        <section style={{ padding: '3.5rem 0 1.5rem', background: '#f8fafc' }}>
          <div className="container">
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag tag-accent" style={{ margin: 0 }}>
                🚨 Highest Priority Appeal
              </span>
            </div>
            <CampaignCard
              campaign={featuredCampaign}
              variant="featured"
              onOpenDonate={onOpenDonate}
              onOpenDetails={(camp) => setSelectedCampaign(camp)}
            />
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section style={{ padding: '2.5rem 0 1.5rem', background: 'white', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#f8fafc',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                maxWidth: '650px',
                width: '100%',
                margin: '0 auto'
              }}
            >
              <Search size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search campaigns by title, keywords, urgency, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.95rem',
                  background: 'transparent'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                      background: isActive ? 'var(--primary)' : 'white',
                      color: isActive ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>
              All Emergency Drives ({filteredCampaigns.length})
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </h2>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              100% tax-exempt under 80G. Instant payment receipt issued.
            </span>
          </div>

          {filteredCampaigns.length === 0 ? (
            <div
              style={{
                background: 'white',
                padding: '4rem 2rem',
                textAlign: 'center',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <Search size={30} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No campaigns match your search</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Try adjusting your search query or reset the filters.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="campaigns-grid">
              {filteredCampaigns.map((camp) => (
                <CampaignCard
                  key={camp._id || camp.id}
                  campaign={camp}
                  variant="card"
                  onOpenDonate={onOpenDonate}
                  onOpenDetails={(c) => setSelectedCampaign(c)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Campaign Detail Modal */}
      <CampaignModal
        campaign={selectedCampaign}
        isOpen={Boolean(selectedCampaign)}
        onClose={() => setSelectedCampaign(null)}
        onOpenDonate={onOpenDonate}
        onOpenVolunteer={onOpenVolunteer}
      />
    </div>
  );
}
