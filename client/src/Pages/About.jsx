import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../Redux/ActionCreators/AboutActionCreators';
import { getProject } from '../Redux/ActionCreators/ProjectActionCreators';
import { getCampaign } from '../Redux/ActionCreators/CampaignActionCreators';
import { getTeam } from '../Redux/ActionCreators/TeamActionCreators';
import { getTeamMember } from '../Redux/ActionCreators/TeamMemberActionCreators';
import { Link } from 'react-router-dom';
import ProgramModal from '../Components/ProgramModal';
import ProgramCard from '../Components/ProgramCard';
import CampaignModal from '../Components/CampaignModal';
import CampaignCard from '../Components/CampaignCard';
import { defaultCampaigns } from '../data/defaultCampaigns';
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
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function About({ onOpenDonate, onOpenVolunteer }) {
  const dispatch = useDispatch();
  const AboutStateData = useSelector((state) => state.AboutStateData);
  const ProjectStateData = useSelector((state) => state.ProjectStateData);
  const CampaignStateData = useSelector((state) => state.CampaignStateData);
  const TeamStateData = useSelector((state) => state.TeamStateData);
  const TeamMemberStateData = useSelector((state) => state.TeamMemberStateData);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    dispatch(getAbout());
    dispatch(getProject());
    dispatch(getCampaign());
    dispatch(getTeam());
    dispatch(getTeamMember());
  }, [dispatch]);

  const projectsList = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : (ProjectStateData?.data || []);

  const rawCampaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : (CampaignStateData?.data || []);
  const displayCampaigns = rawCampaigns.length > 0 ? rawCampaigns : defaultCampaigns;

  // ---- Team (database only, no sample data) ----
  const teamList = [
    ...(Array.isArray(TeamStateData) ? TeamStateData : (TeamStateData?.data || [])),
    ...(Array.isArray(TeamMemberStateData) ? TeamMemberStateData : (TeamMemberStateData?.data || []))
  ];
  const uniqueTeam = [];
  const seenIds = new Set();
  for (const m of teamList) {
    if (m && m._id && !seenIds.has(m._id.toString())) {
      seenIds.add(m._id.toString());
      uniqueTeam.push(m);
    }
  }
  const rawTeam = uniqueTeam.filter((m) => m && m.isActive !== false);

  // A member is a founder if flagged in the DB or if the designation mentions "founder"
  const isFounder = (m) =>
    m.isFounder === true || /founder/i.test(m.designation || '');

  // Row 1 (Executive Trustees & Leadership): founders only
  const firstRowLeaders = rawTeam.filter(isFounder);
  // Row 2 (Field Operations & Program Directors): everyone except founders
  const secondRowLeaders = rawTeam.filter((m) => !isFounder(m));


  const defaultPrograms = [
    {
      _id: 'prog-1',
      title: 'Shiksha Setu - Education for Every Child',
      category: 'Education',
      shortDescription: 'Equipping rural classrooms with modern learning supplies, digital tablets, uniforms, and certified teacher training to end illiteracy.',
      fullDescription: 'Shiksha Setu is our flagship rural education transformation program addressing acute drop-out rates across remote villages. We partner directly with underserved community schools to provide solar-powered digital tablets, age-appropriate STEM kits, bilingual storybooks, desks, and uniforms. Concurrently, our certified pedagogy trainers upskill village teachers and run remedial tutoring centers, ensuring every first-generation student achieves academic success.',
      objectives: [
        'Deploy solar-powered smart digital learning corners in 60+ rural schools',
        'Distribute comprehensive school kits (uniforms, bags, stationery, shoes) to 4,500+ pupils',
        'Train 180+ local teachers in interactive, outcome-based pedagogy',
        'Provide daily nutritional booster supplements to reduce classroom fatigue'
      ],
      targetGroup: 'Rural children aged 5–16 years, first-generation school goers',
      featuredImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
      location: 'Bihar & Uttar Pradesh',
      beneficiaries: { count: 4500, targetGroup: 'Rural Students' },
      budget: { raisedAmount: 1850000, targetAmount: 2500000 },
      status: 'ongoing',
      startDate: '2023-01-15'
    },
    {
      _id: 'prog-2',
      title: 'Aarogya Vahini - Mobile Pediatric Healthcare',
      category: 'Healthcare',
      shortDescription: 'Deploying mobile health vans, free diagnostics, maternal clinics, and pediatric malnutrition treatments in remote areas.',
      fullDescription: 'Aarogya Vahini bridges the critical healthcare divide in remote tribal and agrarian belts. Our specialized mobile medical clinics carry licensed physicians, neonatal nurses, and portable pathology equipment to hamlets situated over 40 km from the nearest government clinic. We deliver free preventative screenings, immunizations, high-grade anemia treatment, therapeutic nutrition packs, and maternal healthcare to vulnerable families.',
      objectives: [
        'Operate 8 GPS-tracked mobile clinical vans servicing 140+ remote hamlets',
        'Screen and treat over 12,000 children annually for acute malnutrition & rickets',
        'Administer mandatory childhood vaccinations and micronutrient drops',
        'Conduct antenatal checkups and safe-motherhood counseling for expectant mothers'
      ],
      targetGroup: 'Infants, pediatric patients (0–14 yrs), and expectant mothers',
      featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
      location: 'Rajasthan & Madhya Pradesh',
      beneficiaries: { count: 12000, targetGroup: 'Mothers & Children' },
      budget: { raisedAmount: 2450000, targetAmount: 3200000 },
      status: 'ongoing',
      startDate: '2022-08-10'
    },
    {
      _id: 'prog-3',
      title: 'Nari Shakti - Women Vocational Guilds',
      category: 'Women Empowerment',
      shortDescription: 'Conducting tailoring, handicraft, and digital skill workshops along with seed micro-grants for self-sustainable livelihoods.',
      fullDescription: 'Nari Shakti empowers marginalized and rural women to become financially independent micro-entrepreneurs. Through localized skill guilds, women receive intensive vocational training in precision tailoring, block-printing, eco-friendly jute bag fabrication, and organic food processing. Upon graduation, each woman is provided with a sewing machine or trade toolkit, alongside seed micro-grants and access to cooperative selling channels.',
      objectives: [
        'Train 2,800+ rural women in sustainable crafts, garment production, and digital bookkeeping',
        'Distribute 1,200+ commercial sewing machines and production starter packs',
        'Connect self-help groups directly with ethical retail buyers and e-commerce markets',
        'Conduct financial literacy, banking, and micro-loan management workshops'
      ],
      targetGroup: 'Marginalized, widowed, and low-income rural women',
      featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      location: 'West Bengal & Odisha',
      beneficiaries: { count: 2800, targetGroup: 'Women Artisans & Entrepreneurs' },
      budget: { raisedAmount: 1400000, targetAmount: 1800000 },
      status: 'ongoing',
      startDate: '2023-03-01'
    },
    {
      _id: 'prog-4',
      title: 'Bal Suraksha - Child Welfare & Rescue',
      category: 'Child Welfare',
      shortDescription: 'Rescuing vulnerable youth from forced child labor, providing safe shelters, foster support, and holistic trauma rehabilitation.',
      fullDescription: 'Bal Suraksha operates round-the-clock child protection interventions to eliminate hazardous child labor, prevent trafficking, and rescue runaway or abandoned children. Working in close collaboration with child welfare committees and local police units, our counselors provide immediate emergency sanctuary, medical care, psychological trauma therapy, legal representation, and reintegration into formal schooling.',
      objectives: [
        'Operate safe transitional emergency shelters equipped with counseling facilities',
        'Rescue youth from hazardous brick kilns, roadside motels, and industrial workshops',
        'Provide psycho-social rehabilitation and cognitive trauma healing therapies',
        'Facilitate complete family tracing, reunification, and formal school enrollment'
      ],
      targetGroup: 'Vulnerable street children, runaway youth, and child labor survivors',
      featuredImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      location: 'Delhi NCR & Haryana',
      beneficiaries: { count: 1600, targetGroup: 'Rescued Children' },
      budget: { raisedAmount: 1950000, targetAmount: 2200000 },
      status: 'ongoing',
      startDate: '2021-11-20'
    },
    {
      _id: 'prog-5',
      title: 'Prakriti Raksha - Clean Energy & Tree Plantation',
      category: 'Environment',
      shortDescription: 'Planting 100,000+ native trees, setting up solar village microgrids, and leading plastic-free community waste drives.',
      fullDescription: 'Prakriti Raksha combats deforestation, groundwater depletion, and energy poverty in fragile ecological zones. We drive high-density native tree plantations using Miyawaki afforestation methods, construct check dams to revive dried-up groundwater aquifers, and establish decentralized rooftop solar microgrids for rural community centers and clinics that face chronic blackouts.',
      objectives: [
        'Plant and nurture over 100,000 native saplings with an 88%+ survival guarantee',
        'Construct 35 rainwater catchment check dams to replenish farm aquifers',
        'Install solar microgrids across village clinics, schools, and streetlighting circuits',
        'Mobilize 15,000+ local youth in plastic waste collection and river cleanup campaigns'
      ],
      targetGroup: 'Rural agrarian families, hill communities, and ecological habitats',
      featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      location: 'Uttarakhand & Himachal',
      beneficiaries: { count: 8500, targetGroup: 'Rural Communities' },
      budget: { raisedAmount: 1100000, targetAmount: 1500000 },
      status: 'ongoing',
      startDate: '2022-06-05'
    },
    {
      _id: 'prog-6',
      title: 'Annapurna - Food & Disaster Relief Convoys',
      category: 'Disaster Relief',
      shortDescription: 'Delivering 3,500+ hot nutritious meals daily and distributing emergency ration kits during floods and climate crises.',
      fullDescription: 'Annapurna operates automated community kitchens and rapid-deployment disaster relief convoys. Every day, our teams prepare and deliver nutritious, freshly cooked hot meals to pediatric wards, daily-wage settlements, and shelter homes. During natural calamities such as floods, cyclones, or droughts, Annapurna deploys all-weather rescue vehicles loaded with clean drinking water rations, waterproof tarpaulins, dry grain supplies, and emergency hygiene kits.',
      objectives: [
        'Cook and distribute 3,500+ balanced, hygienically prepared hot meals every day',
        'Maintain a ready stockpile of emergency ration and medical kits for rapid disaster deployment',
        'Provide safe, clean drinking water filtration pouches during monsoon flood crises',
        'Distribute infant formula, protein mixes, and clean water canisters to affected families'
      ],
      targetGroup: 'Families experiencing food insecurity, daily wage earners, and disaster victims',
      featuredImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
      location: 'Assam, Bihar & Gujarat',
      beneficiaries: { count: 35000, targetGroup: 'Disaster Victims & Daily Wage Earners' },
      budget: { raisedAmount: 3600000, targetAmount: 4000000 },
      status: 'ongoing',
      startDate: '2020-10-15'
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
      <section className="section" id="mission">
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

          <div className="programs-grid">
            {displayPrograms.map((prog, idx) => (
              <ProgramCard
                key={prog._id || idx}
                program={prog}
                onOpenDonate={onOpenDonate}
                onOpenDetails={(p) => setSelectedProgram(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Active Relief Campaigns Section */}
      <section className="section" id="about-campaigns" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag tag-accent">Emergency Action</span>
            <h2 className="section-title">Active Time-Critical Campaigns</h2>
            <p className="section-subtitle">
              Alongside our ongoing sustainable development programs, we mobilize rapid crisis relief for acute medical emergencies, safe water access, and disaster rehabilitation.
            </p>
          </div>

          <div className="grid grid-3">
            {displayCampaigns.map((camp) => (
              <CampaignCard
                key={camp._id || camp.id}
                campaign={camp}
                variant="card"
                onOpenDonate={onOpenDonate}
                onOpenDetails={(c) => setSelectedCampaign(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Accountability & Reports */}
      <section className="section" id="reports">
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
      <section className="section section-bg-alt" id="leadership">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Passionate Leaders on the Ground</h2>
            <p className="section-subtitle">
              Guided by experienced social workers, medical doctors, educators, and humanitarian executives.
            </p>
          </div>

          {/* Row 1: Executive Trustees & Leadership (Founders only) */}
          {firstRowLeaders.length > 0 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    textTransform: 'uppercase',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: 'var(--primary, #0D9488)',
                    background: 'rgba(13, 148, 136, 0.08)',
                    padding: '4px 14px',
                    borderRadius: '999px'
                  }}
                >
                  Executive Trustees & Leadership
                </span>
              </div>

              <div className="leaders-executive-grid">
                {firstRowLeaders.map((member, idx) => {
                  const imageSrc =
                    member.profileImage ||
                    member.pic ||
                    member.image ||
                    `/assets/images/person_${idx + 4}.jpg`;

                  return (
                    <div key={member._id || `exec-${idx}`} className="leader-exec-card">
                      <div className="leader-exec-avatar-wrap">
                        <img
                          src={imageSrc}
                          alt={member.name}
                          className="leader-exec-avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name || 'Leader'
                            )}&background=0D9488&color=fff`;
                          }}
                        />
                        <span className="leader-exec-role-badge">Core Leader</span>
                      </div>

                      <div className="leader-exec-content-panel">
                        <span className="leader-exec-pill">
                          {member.designation || 'Founder'}
                        </span>

                        <h3 className="leader-exec-name">
                          {member.name}
                        </h3>

                        <p className="leader-exec-bio">
                          {member.shortBio && member.shortBio.trim().length > 6
                            ? member.shortBio
                            : 'Guiding high-impact humanitarian programs, strategic leadership, and sustainable community empowerment.'}
                        </p>

                        {/* Social links — always shown; uses stored URL or '#' fallback */}
                        <div className="leader-exec-socials">
                          {[
                            {
                              key: 'linkedin',
                              href: member.socialLinks?.linkedin || '#',
                              label: 'LinkedIn',
                              text: 'in',
                              bg: '#e8f3fb',
                              color: '#0077b5'
                            },
                            {
                              key: 'twitter',
                              href: member.socialLinks?.twitter || '#',
                              label: 'Twitter / X',
                              text: '𝕏',
                              bg: '#f1f5f9',
                              color: '#0f172a'
                            },
                            {
                              key: 'facebook',
                              href: member.socialLinks?.facebook || '#',
                              label: 'Facebook',
                              text: 'f',
                              bg: '#eef2fb',
                              color: '#1877f2'
                            },
                            {
                              key: 'instagram',
                              href: member.socialLinks?.instagram || '#',
                              label: 'Instagram',
                              text: '✦',
                              bg: '#fdf2f8',
                              color: '#e4405f'
                            }
                          ].map(({ key, href, label, text, bg, color }) => (
                            <a
                              key={key}
                              href={href}
                              target={href !== '#' ? '_blank' : undefined}
                              rel="noopener noreferrer"
                              title={label}
                              onClick={href === '#' ? (e) => e.preventDefault() : undefined}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: bg,
                                color: color,
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                opacity: href === '#' ? 0.55 : 1,
                                cursor: href === '#' ? 'default' : 'pointer'
                              }}
                            >
                              {text}
                            </a>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Row 2: Field Operations & Program Directors (no founders) */}
          {secondRowLeaders.length > 0 && (
            <>
              <div className="team-swiper-section-header">
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      textTransform: 'uppercase',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      color: 'var(--primary, #0D9488)',
                      marginBottom: '0.35rem',
                      background: 'rgba(13, 148, 136, 0.08)',
                      padding: '4px 12px',
                      borderRadius: '999px'
                    }}
                  >
                    On the Ground
                  </span>
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: 'var(--text-main, #1e293b)',
                      margin: 0
                    }}
                  >
                    Field Operations & Program Directors
                  </h3>
                  <p
                    style={{
                      margin: '0.25rem 0 0 0',
                      fontSize: '0.925rem',
                      color: 'var(--text-muted, #64748b)'
                    }}
                  >
                    Spearheading community welfare, healthcare vans, school kits, and emergency response.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="team-nav-btn team-swiper-prev"
                    aria-label="Previous Team Members"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="team-nav-btn team-swiper-next"
                    aria-label="Next Team Members"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={{
                    prevEl: '.team-swiper-prev',
                    nextEl: '.team-swiper-next'
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    el: '.team-swiper-pagination'
                  }}
                  loop={true}
                  loopAdditionalSlides={4}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    560: {
                      slidesPerView: 2,
                      spaceBetween: 16
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 20
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 24
                    }
                  }}
                  style={{ paddingBottom: '2.5rem' }}
                >
                  {secondRowLeaders.map((member, idx) => {
                    const imageSrc =
                      member.profileImage ||
                      member.pic ||
                      member.image ||
                      `/assets/images/person_${(idx % 8) + 1}.jpg`;

                    return (
                      <SwiperSlide key={member._id || `slide-${idx}`} style={{ height: 'auto' }}>
                        <div className="team-swiper-card">
                          <div className="team-swiper-img-box">
                            <img
                              src={imageSrc}
                              alt={member.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  member.name || 'Member'
                                )}&background=0D9488&color=fff`;
                              }}
                            />
                          </div>
                          <div className="team-swiper-body">
                            <span
                              style={{
                                color: 'var(--primary, #0D9488)',
                                fontSize: '0.825rem',
                                fontWeight: 700,
                                marginBottom: '0.35rem',
                                display: 'block'
                              }}
                            >
                              {member.designation}
                            </span>
                            <h4
                              style={{
                                fontSize: '1.1rem',
                                marginBottom: '0.35rem',
                                fontWeight: 700,
                                color: 'var(--text-main, #1e293b)'
                              }}
                            >
                              {member.name}
                            </h4>
                            {member.shortBio && (
                              <p
                                style={{
                                  fontSize: '0.825rem',
                                  color: 'var(--text-muted, #64748b)',
                                  lineHeight: 1.5,
                                  margin: '0 0 0.85rem 0',
                                  flexGrow: 1,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {member.shortBio}
                              </p>
                            )}
                            {member.socialLinks && Object.values(member.socialLinks).some(Boolean) && (
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  gap: '0.5rem',
                                  marginTop: 'auto',
                                  paddingTop: '0.65rem',
                                  borderTop: '1px solid #f8fafc'
                                }}
                              >
                                {member.socialLinks.linkedin && (
                                  <a
                                    href={member.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      background: '#eff6ff',
                                      color: '#0077b5',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      textDecoration: 'none'
                                    }}
                                    title="LinkedIn"
                                  >
                                    in
                                  </a>
                                )}
                                {member.socialLinks.twitter && (
                                  <a
                                    href={member.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      background: '#f1f5f9',
                                      color: '#0f172a',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      textDecoration: 'none'
                                    }}
                                    title="Twitter"
                                  >
                                    𝕏
                                  </a>
                                )}
                                {member.socialLinks.facebook && (
                                  <a
                                    href={member.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      background: '#eff6ff',
                                      color: '#1877f2',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      textDecoration: 'none'
                                    }}
                                    title="Facebook"
                                  >
                                    fb
                                  </a>
                                )}
                                {member.socialLinks.instagram && (
                                  <a
                                    href={member.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      background: '#fdf2f8',
                                      color: '#e4405f',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      textDecoration: 'none'
                                    }}
                                    title="Instagram"
                                  >
                                    ig
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <div
                  className="team-swiper-pagination"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                    gap: '4px'
                  }}
                />
              </div>
            </>
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