import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../Redux/ActionCreators/AboutActionCreators';
import { getProject } from '../Redux/ActionCreators/ProjectActionCreators';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  HeartHandshake,
  Eye,
  Award,
  FileText,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Stethoscope,
  Users,
  Heart,
  TreePine,
  Utensils,
  Briefcase,
  Layers,
  MapPin
} from 'lucide-react';

export default function About({ onOpenDonate, onOpenVolunteer }) {
  const dispatch = useDispatch();
  const AboutStateData = useSelector((state) => state.AboutStateData);
  const ProjectStateData = useSelector((state) => state.ProjectStateData);

  useEffect(() => {
    dispatch(getAbout());
    dispatch(getProject());
  }, [dispatch]);

  const projectsList = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : (ProjectStateData?.data || []);

  const defaultPrograms = [
    {
      _id: 'prog-1',
      title: 'Shiksha Setu - Education for Every Child',
      category: 'Education',
      shortDescription: 'Equipping rural classrooms with modern learning supplies, digital tablets, uniforms, and certified teacher training to end illiteracy.',
      featuredImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
      location: 'Bihar & Uttar Pradesh',
      beneficiaries: { count: 4500 },
      budget: { raisedAmount: 1850000, targetAmount: 2500000 }
    },
    {
      _id: 'prog-2',
      title: 'Aarogya Vahini - Mobile Pediatric Healthcare',
      category: 'Healthcare',
      shortDescription: 'Deploying mobile health vans, free diagnostics, maternal clinics, and pediatric malnutrition treatments in remote areas.',
      featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
      location: 'Rajasthan & Madhya Pradesh',
      beneficiaries: { count: 12000 },
      budget: { raisedAmount: 2450000, targetAmount: 3200000 }
    },
    {
      _id: 'prog-3',
      title: 'Nari Shakti - Women Vocational Guilds',
      category: 'Women Empowerment',
      shortDescription: 'Conducting tailoring, handicraft, and digital skill workshops along with seed micro-grants for self-sustainable livelihoods.',
      featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      location: 'West Bengal & Odisha',
      beneficiaries: { count: 2800 },
      budget: { raisedAmount: 1400000, targetAmount: 1800000 }
    },
    {
      _id: 'prog-4',
      title: 'Bal Suraksha - Child Welfare & Rescue',
      category: 'Child Welfare',
      shortDescription: 'Rescuing vulnerable youth from forced child labor, providing safe shelters, foster support, and holistic trauma rehabilitation.',
      featuredImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      location: 'Delhi NCR & Haryana',
      beneficiaries: { count: 1600 },
      budget: { raisedAmount: 1950000, targetAmount: 2200000 }
    },
    {
      _id: 'prog-5',
      title: 'Prakriti Raksha - Clean Energy & Tree Plantation',
      category: 'Environment',
      shortDescription: 'Planting 100,000+ native trees, setting up solar village microgrids, and leading plastic-free community waste drives.',
      featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      location: 'Uttarakhand & Himachal',
      beneficiaries: { count: 8500 },
      budget: { raisedAmount: 1100000, targetAmount: 1500000 }
    },
    {
      _id: 'prog-6',
      title: 'Annapurna - Food & Disaster Relief Convoys',
      category: 'Disaster Relief',
      shortDescription: 'Delivering 3,500+ hot nutritious meals daily and distributing emergency ration kits during floods and climate crises.',
      featuredImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
      location: 'Assam, Bihar & Gujarat',
      beneficiaries: { count: 35000 },
      budget: { raisedAmount: 3600000, targetAmount: 4000000 }
    }
  ];

  const displayPrograms = projectsList.length > 0 ? projectsList : defaultPrograms;

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
      case 'Food & Relief':
        return <Utensils size={15} />;
      case 'Skill Development':
        return <Briefcase size={15} />;
      default:
        return <Layers size={15} />;
    }
  };

  const about = Array.isArray(AboutStateData)
    ? AboutStateData[0]
    : (AboutStateData?.data?.[0] || null);

  const ngoName = about?.ngoName || 'Subhashish Welfare Foundation';
  const tagline = about?.tagline || 'Empowering Humanity Through Compassion and Direct Action';
  const description = about?.description || (about?.establishedYear 
    ? `Founded in ${about.establishedYear}, we are dedicated to dismantling cycles of poverty, illiteracy, and disease through grassroots initiatives across 190+ districts.`
    : 'Founded in 2012, we are dedicated to dismantling cycles of poverty, illiteracy, and disease through grassroots initiatives across 190+ districts.');
  const mission = about?.mission || 'To provide sustainable education, emergency healthcare, clean water, and self-employment tools to underserved families.';
  const vision = about?.vision || 'A resilient society free from extreme poverty, preventable child mortality, and illiteracy by 2035.';
  const aboutImage = about?.aboutImage || '/assets/images/bg_2.jpg';
  const objectives = about?.objectives && about.objectives.length > 0 ? about.objectives : null;

  return (
    <div>
      {/* Page Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            About {ngoName}
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            {tagline}
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem' }}>
            {description}
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="section-tag">Our Guiding Purpose</span>
              <h2 className="section-title">A World Where Every Child Has Dignity and Equal Opportunity</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                {description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Target size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Our Mission</h3>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                      {mission}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--secondary-subtle)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Eye size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Our Vision</h3>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                      {vision}
                    </p>
                  </div>
                </div>

                {objectives && objectives.length > 0 && (
                  <div style={{ background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={20} color="var(--primary)" /> Core Objectives
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {objectives.map((obj, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button type="button" className="btn btn-primary" onClick={() => onOpenDonate()}>
                Support Our Mission <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <img
                src={aboutImage}
                alt={ngoName}
                style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', width: '100%', height: 'clamp(260px, 40vw, 480px)', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Values</span>
            <h2 className="section-title">The Principles Guiding Every Step</h2>
            <p className="section-subtitle">
              Every initiative, donation rupee, and volunteer hour is governed by our unyielding commitment to ethics.
            </p>
          </div>

          <div className="grid grid-3">
            <div style={{ background: 'white', padding: 'clamp(1.25rem, 3vw, 2rem)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <ShieldCheck size={36} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Radical Transparency</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                All financial accounts and project audit reports are published quarterly for public inspection. Zero hidden overheads.
              </p>
            </div>

            <div style={{ background: 'white', padding: 'clamp(1.25rem, 3vw, 2rem)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <HeartHandshake size={36} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Dignity & Respect</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                We treat every beneficiary as an empowered partner in their own upliftment, prioritizing human dignity above all else.
              </p>
            </div>

            <div style={{ background: 'white', padding: 'clamp(1.25rem, 3vw, 2rem)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <Award size={36} color="#0284c7" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Measurable Outcomes</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                We measure real-life transformation: school graduation rates, reductions in waterborne illness, and family income gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Various Social Programs & Key Initiatives */}
      <section className="section" id="about-programs">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Initiatives</span>
            <h2 className="section-title">Our Various Social Programs</h2>
            <p className="section-subtitle">
              Structured grassroots interventions driving lasting change across education, pediatric health, livelihoods, and disaster relief.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: '2rem' }}>
            {displayPrograms.map((prog, idx) => {
              const raised = Number(prog.budget?.raisedAmount) || 0;
              const target = Number(prog.budget?.targetAmount) || 1;
              const percent = Math.min(Math.round((raised / target) * 100), 100);

              return (
                <div
                  key={prog._id || idx}
                  className="cause-card"
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={prog.featuredImage || '/assets/images/cause-2.jpg'}
                      alt={prog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
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
                      {getCategoryIcon(prog.category)}
                      <span>{prog.category}</span>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                      {prog.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {prog.shortDescription || (prog.fullDescription ? prog.fullDescription.slice(0, 120) + '...' : '')}
                    </p>

                    {prog.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                        <MapPin size={14} color="var(--secondary)" />
                        <span>{prog.location}</span>
                      </div>
                    )}

                    {prog.beneficiaries?.count && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <Users size={14} color="var(--primary)" />
                        <span><strong>{Number(prog.beneficiaries.count).toLocaleString()}</strong> Beneficiaries impacted</span>
                      </div>
                    )}

                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Raised: ₹{raised.toLocaleString('en-IN')}</span>
                        <strong style={{ color: 'var(--primary)' }}>{percent}%</strong>
                      </div>
                      <div className="progress-track" style={{ height: '7px' }}>
                        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                        onClick={() => onOpenDonate(prog.title)}
                      >
                        Support Program
                      </button>
                      <Link
                        to="/causes"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Transparency Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag tag-accent">Accountability</span>
            <h2 className="section-title">Where Does Your Contribution Go?</h2>
            <p className="section-subtitle">
              We maintain one of the highest efficiency ratios in the non-profit sector.
            </p>
          </div>

          <div className="grid grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div style={{ background: 'var(--bg-alt)', padding: 'clamp(1.25rem, 3.5vw, 2.5rem)', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Fund Allocation Breakdown</h3>
              
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontWeight: 600 }}>
                  <span>Direct Program Services & Field Operations</span>
                  <span style={{ color: 'var(--primary)' }}>92%</span>
                </div>
                <div className="progress-track" style={{ height: '10px' }}>
                  <div className="progress-bar-fill" style={{ width: '92%', background: 'var(--primary)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontWeight: 600 }}>
                  <span>Community Outreach & Volunteer Training</span>
                  <span style={{ color: 'var(--secondary)' }}>5%</span>
                </div>
                <div className="progress-track" style={{ height: '10px' }}>
                  <div className="progress-bar-fill" style={{ width: '5%', background: 'var(--secondary)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontWeight: 600 }}>
                  <span>Administrative & Auditing Operations</span>
                  <span style={{ color: '#64748b' }}>3%</span>
                </div>
                <div className="progress-track" style={{ height: '10px' }}>
                  <div className="progress-bar-fill" style={{ width: '3%', background: '#64748b' }} />
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Download Audited Annual Reports</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                Our financial statements are audited by independent chartered accountants annually and filed with government regulatory authorities.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0.85rem 1.25rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <strong style={{ fontSize: '0.9rem' }}>Annual Impact & Financial Report 2025-26 (PDF)</strong>
                  </div>
                  <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>Download (2.4 MB)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0.85rem 1.25rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <strong style={{ fontSize: '0.9rem' }}>Tax Exemption 80G / 12A Certification (PDF)</strong>
                  </div>
                  <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>Download (1.1 MB)</span>
                </div>
              </div>

              <button type="button" className="btn btn-secondary" onClick={() => onOpenDonate()}>
                Make a Tax-Deductible Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founders */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Passionate Leaders on the Ground</h2>
            <p className="section-subtitle">
              Guided by experienced social workers, medical doctors, educators, and humanitarian executives.
            </p>
          </div>

          <div className="grid grid-4">
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/assets/images/person_4.jpg" alt="Subhashish Roy" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Subhashish Roy</h4>
                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Founder & Managing Trustee</span>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/assets/images/person_5.jpg" alt="Dr. Priya Sharma" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Dr. Priya Sharma</h4>
                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Head of Health Programs</span>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/assets/images/person_6.jpg" alt="Anand Varma" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Anand Varma</h4>
                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Director of Field Operations</span>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <img src="/assets/images/person_7.jpg" alt="Elena Vasquez" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Elena Vasquez</h4>
                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Volunteer Coordinator</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
