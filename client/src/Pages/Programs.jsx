import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../Redux/ActionCreators/ProjectActionCreators';
import ProgramModal from '../Components/ProgramModal';
import ProgramCard from '../Components/ProgramCard';
import { defaultPrograms } from '../data/defaultPrograms';
import {
  Search,
  BookOpen,
  Stethoscope,
  Users,
  Heart,
  TreePine,
  Utensils,
  Briefcase,
  Layers,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function Programs({ onOpenDonate, onOpenVolunteer }) {
  const dispatch = useDispatch();
  const ProjectStateData = useSelector((state) => state.ProjectStateData);

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const rawProjects = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : (ProjectStateData?.data || []);
  const allPrograms = rawProjects.length > 0 ? rawProjects : defaultPrograms;

  const categories = [
    'All',
    'Education',
    'Healthcare',
    'Women Empowerment',
    'Child Welfare',
    'Environment',
    'Disaster Relief',
    'Clean Water',
    'Skill Development'
  ];

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Education':
        return <BookOpen size={15} />;
      case 'Healthcare':
        return <Stethoscope size={15} />;
      case 'Women Empowerment':
        return <Users size={15} />;
      case 'Child Welfare':
        return <Heart size={15} />;
      case 'Environment':
        return <TreePine size={15} />;
      case 'Disaster Relief':
        return <Utensils size={15} />;
      case 'Clean Water':
        return <Layers size={15} />;
      case 'Skill Development':
        return <Briefcase size={15} />;
      default:
        return <Sparkles size={15} />;
    }
  };

  const filteredPrograms = allPrograms.filter((prog) => {
    const title = prog.title || '';
    const desc = prog.shortDescription || prog.description || prog.fullDescription || '';
    const loc = prog.location || '';
    const cat = prog.category || '';

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

  return (
    <div className="programs-page" style={{ paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #1e293b 100%)',
          color: 'white',
          padding: 'clamp(3.5rem, 7vw, 5.5rem) 0 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span
              className="section-tag tag-accent"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}
            >
              <Sparkles size={14} /> Sustainable Grassroots Initiatives
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
              Our Social Welfare Programs
            </h1>
            <p
              style={{
                color: '#e2e8f0',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: 1.65,
                marginBottom: '2rem'
              }}
            >
              Dismantling poverty, child malnutrition, and illiteracy through 8 mission-driven, permanent social pillars designed for self-sustaining grassroots transformation.
            </p>

            {/* Quick Stat Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginTop: '2.5rem',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '1.8rem', color: '#fef08a', fontWeight: 800 }}>
                  {allPrograms.length}
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Core Programs</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.8rem', color: 'white', fontWeight: 800 }}>
                  190+
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Districts Active</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.8rem', color: '#a7f3d0', fontWeight: 800 }}>
                  125K+
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Direct Lives Touched</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.8rem', color: 'white', fontWeight: 800 }}>
                  92%
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>Program Spend Ratio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '2.5rem 0 1.5rem', background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                maxWidth: '650px',
                width: '100%',
                margin: '0 auto'
              }}
            >
              <Search size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search programs by keyword, title, state, or focus area..."
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
                    {cat !== 'All' && getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>
              Showing {filteredPrograms.length} {filteredPrograms.length === 1 ? 'Program' : 'Programs'}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </h2>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Click on any program for comprehensive milestones & operational details
            </span>
          </div>

          {filteredPrograms.length === 0 ? (
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
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No programs match your search</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Try adjusting your search keywords or switching category filters.
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
            <div className="programs-grid">
              {filteredPrograms.map((prog, idx) => (
                <ProgramCard
                  key={prog._id || prog.id || idx}
                  program={prog}
                  onOpenDonate={onOpenDonate}
                  onOpenDetails={(p) => setSelectedProgram(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Program Detail Modal */}
      <ProgramModal
        program={selectedProgram}
        isOpen={Boolean(selectedProgram)}
        onClose={() => setSelectedProgram(null)}
        onOpenDonate={onOpenDonate}
        onOpenVolunteer={onOpenVolunteer}
      />
    </div>
  );
}
