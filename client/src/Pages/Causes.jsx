import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaign } from '../Redux/ActionCreators/CampaignActionCreators';
import { getProject } from '../Redux/ActionCreators/ProjectActionCreators';
import { Heart, Search, CheckCircle2 } from 'lucide-react';

export default function Causes({ onOpenDonate }) {
  const dispatch = useDispatch();
  const CampaignStateData = useSelector((state) => state.CampaignStateData);
  const ProjectStateData = useSelector((state) => state.ProjectStateData);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getCampaign());
    dispatch(getProject());
  }, [dispatch]);

  const defaultCauses = [
    {
      id: 1,
      title: 'Clean Drinking Water for 25 Rural Villages',
      category: 'Water',
      img: '/assets/images/cause-1.jpg',
      raised: 425000,
      goal: 500000,
      donors: 840,
      desc: 'Installing solar-powered deep bore wells and community water filtration units to eradicate waterborne illness in arid regions.'
    },
    {
      id: 2,
      title: 'School Kits & Digital Classrooms for 1,000 Kids',
      category: 'Education',
      img: '/assets/images/cause-2.jpg',
      raised: 382000,
      goal: 450000,
      donors: 620,
      desc: 'Providing comprehensive learning supplies, tablets, uniform kits, and teacher support for remote village schools.'
    },
    {
      id: 3,
      title: 'Mobile Pediatric Clinics & Malnutrition Care',
      category: 'Healthcare',
      img: '/assets/images/cause-3.jpg',
      raised: 684000,
      goal: 850000,
      donors: 1240,
      desc: 'Deploying equipped ambulances with doctors, free diagnostic tests, vaccinations, and high-protein supplements.'
    },
    {
      id: 4,
      title: 'Vocational Training & Micro-Grants for Women',
      category: 'Empowerment',
      img: '/assets/images/cause-4.jpg',
      raised: 290000,
      goal: 350000,
      donors: 410,
      desc: 'Empowering marginalized women with sewing, craftsmanship, and micro-entrepreneurship financial assistance.'
    },
    {
      id: 5,
      title: 'Emergency Warm Winter Clothing & Blankets',
      category: 'Relief',
      img: '/assets/images/cause-5.jpg',
      raised: 189000,
      goal: 220000,
      donors: 390,
      desc: 'Distributing thermal winter kits, jackets, and insulated blankets to families living in vulnerable makeshift shelters.'
    },
    {
      id: 6,
      title: 'Daily Mid-Day Nutritious Meals Program',
      category: 'Food Relief',
      img: '/assets/images/cause-6.jpg',
      raised: 540000,
      goal: 600000,
      donors: 980,
      desc: 'Delivering freshly cooked hot, balanced meals daily to over 3,500 underprivileged school children.'
    }
  ];

  const rawCampaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : (CampaignStateData?.data || []);

  const rawProjects = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : (ProjectStateData?.data || []);

  const combinedBackend = [
    ...rawCampaigns.map((c) => ({
      id: c._id,
      title: c.title,
      category: c.category || 'Campaign',
      img: c.image || c.pic || '/assets/images/cause-1.jpg',
      raised: c.raisedAmount || c.currentAmount || 0,
      goal: c.targetAmount || c.goalAmount || 500000,
      donors: c.donorsCount || Math.floor((c.raisedAmount || 10000) / 450) || 12,
      desc: c.shortDescription || c.description || ''
    })),
    ...rawProjects.map((p) => ({
      id: p._id,
      title: p.title,
      category: p.category || 'Program',
      img: p.featuredImage || p.pic || '/assets/images/cause-2.jpg',
      raised: p.budgetSpent || p.raisedAmount || 300000,
      goal: p.totalBudget || p.targetAmount || 600000,
      donors: p.beneficiariesCount || 150,
      desc: p.shortDescription || p.description || ''
    }))
  ];

  const allCauses = combinedBackend.length > 0 ? combinedBackend : defaultCauses;

  const dynamicCategories = ['All', ...Array.from(new Set(allCauses.map(c => c.category).filter(Boolean)))];

  const filtered = allCauses.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            Every Rupee Counts
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            Active Relief Campaigns & Causes
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem' }}>
            Choose a campaign to support. 100% of your tax-deductible gift directly funds critical grassroots operations.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'white', padding: '1.25rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
            {/* Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border-light)',
                    background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-alt)',
                    color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: 'min(240px, 100%)', flex: '1 1 200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search causes..."
                className="form-control form-control-sm"
                style={{ borderRadius: 'var(--radius-full)', paddingLeft: '2.4rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Causes Grid */}
          <div className="programs-grid">
            {filtered.map((cause) => {
              const pct = Math.min(100, Math.round((cause.raised / (cause.goal || 1)) * 100));
              return (
                <div key={cause.id} className="cause-card">
                  <div className="cause-img">
                    <img src={cause.img} alt={cause.title} />
                    <span className="cause-category-badge">{cause.category}</span>
                  </div>

                  <div className="cause-body">
                    <h3 className="cause-title">{cause.title}</h3>
                    <p className="cause-desc">{cause.desc}</p>

                    <div className="cause-progress">
                      <div className="progress-track">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>

                      <div className="progress-labels">
                        <span><strong>₹{cause.raised?.toLocaleString('en-IN')}</strong> raised ({pct}%)</span>
                        <span>Goal: <strong>₹{cause.goal?.toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={15} color="var(--primary)" /> {cause.donors} supporters
                      </span>

                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => onOpenDonate(cause.title)}
                      >
                        <Heart size={14} /> Donate Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
