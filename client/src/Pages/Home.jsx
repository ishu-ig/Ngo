import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../Redux/ActionCreators/AboutActionCreators';
import { getBlog } from '../Redux/ActionCreators/BlogActionCreators';
import { getTestimonial } from '../Redux/ActionCreators/TestimonialActionCreators';
import { getPartner } from '../Redux/ActionCreators/PartnerActionCreators';
import { getGallery } from '../Redux/ActionCreators/GalleryActionCreators';
import { getProject } from '../Redux/ActionCreators/ProjectActionCreators';
import { createContactUs } from '../Redux/ActionCreators/ContactUsActionCreators';
import ProgramModal from '../Components/ProgramModal';
import ProgramCard from '../Components/ProgramCard';
import CampaignModal from '../Components/CampaignModal';
import CampaignCard from '../Components/CampaignCard';
import { getCampaign } from '../Redux/ActionCreators/CampaignActionCreators';
import { defaultCampaigns } from '../data/defaultCampaigns';
import {
  Heart,
  Play,
  BookOpen,
  Stethoscope,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  TreePine,
  Utensils,
  Briefcase,
  Home as HomeIcon,
  Handshake,
  Share2,
  Megaphone,
  Send,
  Phone,
  Mail,
  Building,
  UserCheck,
  FileText
} from 'lucide-react';

export default function Home({
  onOpenDonate,
  onOpenVideo,
  onOpenVolunteer,
  onOpenPartner,
  onOpenStory,
  onOpenImpactReport
}) {
  const dispatch = useDispatch();

  const AboutStateData = useSelector((state) => state.AboutStateData);
  const BlogStateData = useSelector((state) => state.BlogStateData);
  const TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  const PartnerStateData = useSelector((state) => state.PartnerStateData);
  const GalleryStateData = useSelector((state) => state.GalleryStateData);
  const ProjectStateData = useSelector((state) => state.ProjectStateData);
  const CampaignStateData = useSelector((state) => state.CampaignStateData);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    dispatch(getAbout());
    dispatch(getBlog());
    dispatch(getTestimonial());
    dispatch(getPartner());
    dispatch(getGallery());
    dispatch(getProject());
    dispatch(getCampaign());
  }, [dispatch]);

  // Gallery active tab
  const [activeGalleryTab, setActiveGalleryTab] = useState('All');
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  // Campaigns normalization from Redux CampaignStateData (with fallback to curated defaults)
  const rawCampaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : (CampaignStateData?.data || []);
  const displayCampaigns = rawCampaigns.length > 0 ? rawCampaigns : defaultCampaigns;
  const featuredCampaign = displayCampaigns.find((c) => c.featured) || displayCampaigns[0];
  const otherCampaigns = displayCampaigns.filter(
    (c) => (c._id || c.id) !== (featuredCampaign?._id || featuredCampaign?.id)
  );

  // 8 Core Programs (Enriched with objectives, impact metrics & background)
  const programs = [
    {
      id: 1,
      _id: 'prog-1',
      title: 'Education for Every Child',
      category: 'Education',
      icon: BookOpen,
      featuredImage: '/assets/images/cause-2.jpg',
      img: '/assets/images/cause-2.jpg',
      shortDescription: 'Equipping rural classrooms with modern learning supplies, digital tablets, uniforms, and certified teacher training to end illiteracy.',
      desc: 'Equipping rural classrooms with modern learning supplies, digital tablets, uniforms, and certified teacher training to end illiteracy.',
      fullDescription: 'Shiksha Setu equips rural community schools with solar-powered digital tablets, age-appropriate STEM kits, bilingual storybooks, desks, and uniforms. Concurrently, our certified pedagogy trainers upskill village teachers and run remedial tutoring centers to eliminate school dropouts.',
      objectives: [
        'Deploy solar-powered smart digital learning corners in 60+ rural schools',
        'Distribute comprehensive school kits (uniforms, bags, stationery, shoes) to 4,500+ pupils',
        'Train 180+ local teachers in interactive, outcome-based pedagogy',
        'Provide daily nutritional booster supplements to reduce classroom fatigue'
      ],
      location: 'Bihar & Uttar Pradesh',
      beneficiaries: { count: 4500, targetGroup: 'Rural Students' },
      budget: { raisedAmount: 1850000, targetAmount: 2500000 },
      status: 'ongoing',
      startDate: '2023-01-15'
    },
    {
      id: 2,
      _id: 'prog-2',
      title: 'Healthcare & Pediatric Care',
      category: 'Healthcare',
      icon: Stethoscope,
      featuredImage: '/assets/images/cause-3.jpg',
      img: '/assets/images/cause-3.jpg',
      shortDescription: 'Deploying mobile health vans, free diagnostics, maternal clinics, and pediatric malnutrition treatments in remote areas.',
      desc: 'Deploying mobile health vans, free diagnostics, maternal clinics, and pediatric malnutrition treatments in remote areas.',
      fullDescription: 'Our specialized mobile medical clinics carry licensed physicians, neonatal nurses, and portable pathology equipment to tribal and rural hamlets situated over 40 km from the nearest government clinic, providing doorstep preventative screenings, immunizations, and maternal healthcare.',
      objectives: [
        'Operate 8 GPS-tracked mobile clinical vans servicing 140+ remote hamlets',
        'Screen and treat over 12,000 children annually for acute malnutrition & rickets',
        'Administer mandatory childhood vaccinations and micronutrient drops',
        'Conduct antenatal checkups and safe-motherhood counseling for expectant mothers'
      ],
      location: 'Rajasthan & Madhya Pradesh',
      beneficiaries: { count: 12000, targetGroup: 'Mothers & Children' },
      budget: { raisedAmount: 2450000, targetAmount: 3200000 },
      status: 'ongoing',
      startDate: '2022-08-10'
    },
    {
      id: 3,
      _id: 'prog-3',
      title: 'Women Empowerment & Vocations',
      category: 'Women Empowerment',
      icon: Users,
      featuredImage: '/assets/images/cause-4.jpg',
      img: '/assets/images/cause-4.jpg',
      shortDescription: 'Conducting tailoring, handicraft, and digital skill workshops along with seed micro-grants for self-sustainable livelihood.',
      desc: 'Conducting tailoring, handicraft, and digital skill workshops along with seed micro-grants for self-sustainable livelihood.',
      fullDescription: 'Through localized skill guilds, marginalized women receive intensive vocational training in precision tailoring, block-printing, and handicraft production. Upon graduation, each woman is provided with a sewing machine or trade toolkit alongside seed micro-grants.',
      objectives: [
        'Train 2,800+ rural women in sustainable crafts, garment production, and digital bookkeeping',
        'Distribute 1,200+ commercial sewing machines and production starter packs',
        'Connect self-help groups directly with ethical retail buyers and e-commerce markets',
        'Conduct financial literacy, banking, and micro-loan management workshops'
      ],
      location: 'West Bengal & Odisha',
      beneficiaries: { count: 2800, targetGroup: 'Women Artisans & Entrepreneurs' },
      budget: { raisedAmount: 1400000, targetAmount: 1800000 },
      status: 'ongoing',
      startDate: '2023-03-01'
    },
    {
      id: 4,
      _id: 'prog-4',
      title: 'Child Welfare & Protection',
      category: 'Child Welfare',
      icon: Heart,
      featuredImage: '/assets/images/image_2.jpg',
      img: '/assets/images/image_2.jpg',
      shortDescription: 'Rescuing vulnerable youth from forced child labor, providing safe shelter, foster support, and holistic rehabilitation.',
      desc: 'Rescuing vulnerable youth from forced child labor, providing safe shelter, foster support, and holistic rehabilitation.',
      fullDescription: 'Bal Suraksha operates round-the-clock child protection interventions to eliminate hazardous child labor, prevent trafficking, and rescue runaway children, providing emergency shelter, trauma counseling, legal aid, and formal school re-enrollment.',
      objectives: [
        'Operate safe transitional emergency shelters equipped with counseling facilities',
        'Rescue youth from hazardous brick kilns, roadside motels, and industrial workshops',
        'Provide psycho-social rehabilitation and cognitive trauma healing therapies',
        'Facilitate complete family tracing, reunification, and formal school enrollment'
      ],
      location: 'Delhi NCR & Haryana',
      beneficiaries: { count: 1600, targetGroup: 'Rescued Children' },
      budget: { raisedAmount: 1950000, targetAmount: 2200000 },
      status: 'ongoing',
      startDate: '2021-11-20'
    },
    {
      id: 5,
      _id: 'prog-5',
      title: 'Environmental & Clean Energy',
      category: 'Environment',
      icon: TreePine,
      featuredImage: '/assets/images/image_3.jpg',
      img: '/assets/images/image_3.jpg',
      shortDescription: 'Planting 100,000+ native trees, setting up solar village grids, and leading plastic-free waste management drives.',
      desc: 'Planting 100,000+ native trees, setting up solar village grids, and leading plastic-free waste management drives.',
      fullDescription: 'Combating deforestation, groundwater depletion, and energy poverty in fragile ecological zones through high-density Miyawaki afforestation, rainwater check dams, and decentralized rooftop solar microgrids for rural health clinics.',
      objectives: [
        'Plant and nurture over 100,000 native saplings with an 88%+ survival guarantee',
        'Construct 35 rainwater catchment check dams to replenish farm aquifers',
        'Install solar microgrids across village clinics, schools, and streetlighting circuits',
        'Mobilize 15,000+ local youth in plastic waste collection and river cleanup campaigns'
      ],
      location: 'Uttarakhand & Himachal',
      beneficiaries: { count: 8500, targetGroup: 'Rural Communities' },
      budget: { raisedAmount: 1100000, targetAmount: 1500000 },
      status: 'ongoing',
      startDate: '2022-06-05'
    },
    {
      id: 6,
      _id: 'prog-6',
      title: 'Food & Emergency Relief',
      category: 'Food & Relief',
      icon: Utensils,
      featuredImage: '/assets/images/cause-6.jpg',
      img: '/assets/images/cause-6.jpg',
      shortDescription: 'Delivering 3,500+ hot nutritious mid-day meals daily and distributing emergency ration kits during natural disasters.',
      desc: 'Delivering 3,500+ hot nutritious mid-day meals daily and distributing emergency ration kits during natural disasters.',
      fullDescription: 'Operating automated community kitchens and rapid-deployment disaster relief convoys, delivering nutritious hot meals daily to pediatric wards and shelter homes, and distributing survival packs during floods and natural crises.',
      objectives: [
        'Cook and distribute 3,500+ balanced, hygienically prepared hot meals every day',
        'Maintain a ready stockpile of emergency ration and medical kits for rapid disaster deployment',
        'Provide safe, clean drinking water filtration pouches during monsoon flood crises',
        'Distribute infant formula, protein mixes, and clean water canisters to affected families'
      ],
      location: 'Assam, Bihar & Gujarat',
      beneficiaries: { count: 35000, targetGroup: 'Disaster Victims & Daily Wage Earners' },
      budget: { raisedAmount: 3600000, targetAmount: 4000000 },
      status: 'ongoing',
      startDate: '2020-10-15'
    },
    {
      id: 7,
      _id: 'prog-7',
      title: 'Livelihood & Skill Development',
      category: 'Skill Development',
      icon: Briefcase,
      featuredImage: '/assets/images/image_4.jpg',
      img: '/assets/images/image_4.jpg',
      shortDescription: 'Vocational technical training, electrical, plumbing, and computer literacy certifications for marginalized youth.',
      desc: 'Vocational technical training, electrical, plumbing, and computer literacy certifications for marginalized youth.',
      fullDescription: 'Providing industry-aligned vocational certifications in electrical trades, plumbing, solar maintenance, and computer literacy for underprivileged youth, paired with professional toolkits and verified local employment placement.',
      objectives: [
        'Conduct 6-month hands-on certified vocational apprenticeship programs',
        'Provide graduates with professional toolkits and trade starter kits',
        'Equip modern computer labs for digital literacy and coding fundamentals',
        'Facilitate guaranteed placement interviews with regional employers'
      ],
      location: 'Jharkhand & Chhattisgarh',
      beneficiaries: { count: 3200, targetGroup: 'Youth Job Seekers' },
      budget: { raisedAmount: 1650000, targetAmount: 2100000 },
      status: 'ongoing',
      startDate: '2022-09-12'
    },
    {
      id: 8,
      _id: 'prog-8',
      title: 'Rural Community Development',
      category: 'Rural Development',
      icon: HomeIcon,
      featuredImage: '/assets/images/cause-1.jpg',
      img: '/assets/images/cause-1.jpg',
      shortDescription: 'Installing solar-powered deep bore water wells, community sanitation blocks, and disaster-resilient village community shelters.',
      desc: 'Installing solar-powered deep bore water wells, community sanitation blocks, and disaster-resilient village community shelters.',
      fullDescription: 'Transforming rural infrastructure through deep solar-powered bore wells with multi-stage filtration units, modern public sanitation facilities, clean paving, and disaster-resilient community centers.',
      objectives: [
        'Install 25 solar-powered deep borewells with clean drinking water filtration',
        'Construct modern hygienic gender-separated community sanitation facilities',
        'Erect cyclone- and earthquake-resilient multi-purpose community centers',
        'Train village maintenance committees for perpetual infrastructure upkeep'
      ],
      location: 'Maharashtra & Karnataka',
      beneficiaries: { count: 18000, targetGroup: 'Village Residents' },
      budget: { raisedAmount: 2900000, targetAmount: 3500000 },
      status: 'ongoing',
      startDate: '2021-04-18'
    }
  ];

  const projectsList = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : (ProjectStateData?.data || []);

  const displayPrograms = projectsList.length > 0 ? projectsList : programs;

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
      case 'Rural Development':
      case 'Community Development':
        return <HomeIcon size={15} />;
      default:
        return <Sparkles size={15} />;
    }
  };

  // Success Stories (as specified in PDF)
  const successStories = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      location: 'Rural Bihar, India',
      photo: '/assets/images/person_1.jpg',
      program: 'Child Education Program',
      shortStory: 'Rescued from working 12-hour shifts at a roadside brick kiln. Enrolled in our digital learning center and topped his district science exam.',
      fullStory: 'Ramesh was 11 years old when our field survey team met him working in dangerous conditions at a kiln. We supported his family with a monthly ration stipend so Ramesh could return to school. After 3 years of dedicated tutoring, Ramesh secured the 1st rank in his district high school examination and is now on a full engineering scholarship.',
      result: '100% Grade A+ Honors & Full STEM Scholarship'
    },
    {
      id: 2,
      name: 'Sunita Devi',
      location: 'Sundarbans Cluster, India',
      photo: '/assets/images/person_2.jpg',
      program: 'Women Empowerment Program',
      shortStory: 'After losing her husband, Sunita completed our 6-month master tailoring workshop and now runs a cooperative employing 6 women.',
      fullStory: 'Facing severe debt and poverty, Sunita joined our vocational skill hub in 2024. She mastered modern apparel design and received an initial sewing machine grant. Today, her micro-enterprise generates ₹35,000/month, allowing her to send both of her daughters to private English medium school.',
      result: 'Self-Sustaining Business Owner & 6 Local Jobs Created'
    },
    {
      id: 3,
      name: 'Baby Ananya (Mother Kavita)',
      location: 'Thane Tribal Belt, India',
      photo: '/assets/images/person_3.jpg',
      program: 'Mobile Pediatric Healthcare',
      shortStory: 'Diagnosed with Grade-3 acute malnutrition at 8 months old. Fully restored to optimal weight and health after 90 days of clinical nutrition therapy.',
      fullStory: 'When our mobile medical ambulance reached village Jamunpada, baby Ananya weighed merely 4.2 kg at 8 months. Our pediatricians immediately administered high-calorie therapeutic paste, infant vitamins, and monitored her vitals bi-weekly. Today, Ananya is thriving, walking, and completely healthy.',
      result: 'Full Recovery from Severe Acute Malnutrition (SAM)'
    }
  ];

  // Gallery items & categories (as specified in PDF)
  const galleryCategories = [
    'All',
    'Education Programs',
    'Healthcare Camps',
    'Food Distribution',
    'Volunteer Activities',
    'Community Events',
    'Workshops',
    'Environmental Activities'
  ];

  const galleryItems = [
    { id: 1, src: '/assets/images/image_1.jpg', category: 'Education Programs', title: 'Village Smart Classroom Session' },
    { id: 2, src: '/assets/images/image_2.jpg', category: 'Healthcare Camps', title: 'Free Pediatric Checkup Camp' },
    { id: 3, src: '/assets/images/image_3.jpg', category: 'Environmental Activities', title: 'Solar Well & Water Tap Launch' },
    { id: 4, src: '/assets/images/image_4.jpg', category: 'Food Distribution', title: 'Hot Nutritious Meal Drive' },
    { id: 5, src: '/assets/images/image_5.jpg', category: 'Volunteer Activities', title: 'Youth Volunteers Packing School Kits' },
    { id: 6, src: '/assets/images/image_6.jpg', category: 'Workshops', title: 'Women Tailoring & Vocational Training' },
    { id: 7, src: '/assets/images/event-1.jpg', category: 'Community Events', title: 'Annual Community Sports & Health Day' },
    { id: 8, src: '/assets/images/event-2.jpg', category: 'Volunteer Activities', title: '5K Run For Education Fundraiser' },
    { id: 9, src: '/assets/images/event-3.jpg', category: 'Food Distribution', title: 'Emergency Flood Relief Ration Dispatch' }
  ];

  const defaultBlogPosts = [
    {
      id: 1,
      title: 'Solar Water Filtration Units Transform 25 Drought-Stricken Villages',
      category: 'Field Report',
      date: 'August 14, 2026',
      img: '/assets/images/image_1.jpg',
      desc: 'Access to safe drinking water reduced waterborne diseases by 74% and enabled 1,200 young girls to attend school regularly.'
    },
    {
      id: 2,
      title: 'Inside Our Frontline Mobile Ambulance Fleet in Remote Forest Belts',
      category: 'Healthcare News',
      date: 'August 02, 2026',
      img: '/assets/images/image_2.jpg',
      desc: 'How our traveling pediatricians navigate rough terrains to deliver newborn vaccinations and emergency neonatal care.'
    },
    {
      id: 3,
      title: 'Empowering 400 Women Through Micro-Tailoring Cooperatives',
      category: 'Success Dispatch',
      date: 'July 20, 2026',
      img: '/assets/images/image_4.jpg',
      desc: 'Financial literacy and sewing equipment grants turned dependent homemakers into thriving micro-entrepreneurs.'
    }
  ];

  const defaultPartners = [
    { name: 'Global Impact Trust', type: 'CSR Partner' },
    { name: 'Tata Memorial Outreach', type: 'Healthcare Partner' },
    { name: 'Infosys Foundation Grant', type: 'Corporate Sponsor' },
    { name: 'UNICEF Community Ally', type: 'Institutional Partner' },
    { name: 'National Health Mission', type: 'Government Partner' },
    { name: 'Rotary International', type: 'Supporting Organization' }
  ];

  // Dynamic Backend Data with Rich Fallbacks
  const about = Array.isArray(AboutStateData) ? AboutStateData[0] : (AboutStateData?.data?.[0] || null);

  const rawTestimonials = Array.isArray(TestimonialStateData) ? TestimonialStateData : (TestimonialStateData?.data || []);
  const successStoriesToDisplay = rawTestimonials.length > 0
    ? rawTestimonials.map((t) => ({
        id: t._id,
        name: t.name,
        location: t.designation || t.location || 'Beneficiary Story',
        photo: t.image || t.pic || '/assets/images/person_1.jpg',
        program: t.program || 'Community Impact',
        shortStory: t.message || t.testimonial || '',
        fullStory: t.message || t.testimonial || '',
        result: t.result || 'Empowered & Transformed'
      }))
    : successStories;

  const rawBlogs = Array.isArray(BlogStateData) ? BlogStateData : (BlogStateData?.data || []);
  const blogPostsToDisplay = rawBlogs.length > 0
    ? rawBlogs.slice(0, 3).map((b) => ({
        id: b._id,
        slug: b.slug || b._id,
        title: b.title,
        category: b.category || 'Field Report',
        date: b.publishedDate || b.createdAt ? new Date(b.publishedDate || b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent',
        img: b.featuredImage || b.pic || '/assets/images/image_1.jpg',
        desc: b.shortDescription || (b.content ? b.content.slice(0, 130) + '...' : '')
      }))
    : defaultBlogPosts;

  const rawGallery = Array.isArray(GalleryStateData) ? GalleryStateData : (GalleryStateData?.data || []);
  const galleryItemsToDisplay = rawGallery.length > 0
    ? rawGallery.slice(0, 9).map((g) => ({
        id: g._id,
        src: g.mediaUrl || g.imageUrl || g.pic || '/assets/images/image_1.jpg',
        category: g.category || 'Volunteer Activities',
        title: g.title || 'Community Impact Moment'
      }))
    : galleryItems;

  const filteredGallery = activeGalleryTab === 'All'
    ? galleryItemsToDisplay
    : galleryItemsToDisplay.filter(g => g.category?.toLowerCase().includes(activeGalleryTab.toLowerCase()) || activeGalleryTab.toLowerCase().includes(g.category?.toLowerCase()));

  // Partners & Sponsors list
  const rawPartners = Array.isArray(PartnerStateData) ? PartnerStateData : (PartnerStateData?.data || []);
  const partnersToDisplay = rawPartners.length > 0
    ? rawPartners.map((p) => ({
        name: p.name,
        type: p.partnershipType || p.partnerType || 'CSR Partner'
      }))
    : defaultPartners;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    dispatch(createContactUs({
      name: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      subject: contactForm.subject,
      message: contactForm.message
    }));
    setContactSubmitted(true);
  };

  return (
    <>
      {/* ===================================================================
          2. HERO SECTION
          =================================================================== */}
      <section
        className="hero-wrapper"
        style={{ backgroundImage: `url(/assets/images/bg_7.jpg)` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} color="#fbbf24" />
              <span>Empowering Lives • Transforming Futures {about?.establishedYear ? `Since ${about.establishedYear}` : 'Since 2012'}</span>
            </div>

            <h1 className="hero-title">
              Together, We Can Create a <span className="highlight">Better Tomorrow</span>
            </h1>

            <p className="hero-description">
              {about?.description || `${about?.ngoName || 'Subhashish'} Welfare Foundation is a grassroots non-profit dedicated to uplifting vulnerable communities through free child education, mobile medical healthcare, clean drinking water, and sustainable women livelihoods.`}
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-secondary btn-lg pulse-animation"
                onClick={() => onOpenDonate()}
              >
                <Heart size={20} fill="white" />
                Donate Now
              </button>

              <button
                type="button"
                className="btn btn-outline-white btn-lg"
                onClick={onOpenVolunteer}
              >
                <UserCheck size={18} />
                Become a Volunteer
              </button>

              <button
                type="button"
                className="btn btn-outline-white btn-lg"
                onClick={onOpenVideo}
                style={{ border: 'none', background: 'rgba(255, 255, 255, 0.12)' }}
              >
                <Play size={18} fill="currentColor" />
                Watch Video
              </button>
            </div>

            {/* Impact Highlights Bar */}
            <div className="hero-impact-strip">
              <div className="hero-impact-item">
                <strong>10,000+</strong>
                <span>Lives Impacted</span>
              </div>
              <div className="hero-impact-item">
                <strong>5,000+</strong>
                <span>Children Supported</span>
              </div>
              <div className="hero-impact-item">
                <strong>2,500+</strong>
                <span>Volunteers Enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. IMPACT STATISTICS
          =================================================================== */}
      <section className="section" style={{ padding: '3.5rem 0', background: 'linear-gradient(135deg, #042f2e 0%, #0f766e 100%)', color: 'white' }}>
        <div className="container">
          <div className="grid grid-4" style={{ textAlign: 'center' }}>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#fef08a' }}>10,000+</div>
              <div className="stat-label">Lives Directly Impacted</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#fef08a' }}>5,000+</div>
              <div className="stat-label">Children Educated & Supported</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#fef08a' }}>2,500+</div>
              <div className="stat-label">Active Field Volunteers</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#fef08a' }}>25+</div>
              <div className="stat-label">Communities Reached</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#2dd4bf" />
              <span><strong>150+</strong> Projects Completed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#2dd4bf" />
              <span><strong>100%</strong> Donations Utilized with Transparency (80G Tax-Deductible)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. ABOUT / OUR MISSION
          =================================================================== */}
      <section className="section" id="about-mission-section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="section-tag">About / Our Mission</span>
              <h2 className="section-title">Committed to Grassroots Social Transformation</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Subhashish Welfare Foundation is a non-governmental organization established with the core conviction that every human deserves access to quality education, healthcare, clean water, and social dignity.
              </p>

              {/* Mission & Vision & Objectives */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>Our Mission</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    To provide high-quality education, primary pediatric medical care, clean drinking water, and vocational training directly to underserved populations with complete transparency.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--secondary)' }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', color: 'var(--secondary)' }}>Our Vision</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    A world where poverty, illiteracy, and preventable illnesses no longer limit human potential, enabling every child to thrive.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #0284c7' }}>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', color: '#0284c7' }}>Who We Help & The Change We Create</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    We work with orphaned & underprivileged children, daily-wage migrant families, rural women, and disaster victims to establish lasting economic independence and health security.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-primary">
                  Learn More About Us <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onOpenVolunteer}
                >
                  Join Our Mission
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
                <img
                  src="/assets/images/bg_1.jpg"
                  alt="Subhashish Foundation Mission"
                  style={{ width: '100%', height: 'clamp(260px, 40vw, 480px)', objectFit: 'cover' }}
                />
              </div>
              <div className="mission-award-badge">
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-subtle)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={26} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.3rem', display: 'block', lineHeight: 1.1 }}>12+ Years</strong>
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Of Compassionate Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. OUR PROGRAMS / CAUSES
          =================================================================== */}
      <section className="section section-bg-alt" id="programs-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Programs & Causes</span>
            <h2 className="section-title">Holistic Initiatives Creating Lasting Change</h2>
            <p className="section-subtitle">
              From classrooms to mobile clinics, our 8 core social programs tackle the root causes of poverty.
            </p>
          </div>

          <div className="programs-grid">
            {displayPrograms.slice(0, 6).map((prog, idx) => (
              <ProgramCard
                key={prog._id || prog.id || idx}
                program={prog}
                onOpenDonate={onOpenDonate}
                onOpenDetails={(p) => setSelectedProgram(p)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
            <Link
              to="/programs"
              className="btn btn-outline btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <span>View All {displayPrograms.length} Social Programs</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. FEATURED CAMPAIGN & URGENT RELIEF APPEALS
          =================================================================== */}
      <section className="section" id="featured-campaign-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag tag-accent">Urgent Appeals</span>
            <h2 className="section-title">Critical & Time-Sensitive Campaigns</h2>
            <p className="section-subtitle">
              Every second counts. Your rapid contribution helps us deliver urgent medical relief, nutritional care, and flood recovery directly to vulnerable communities.
            </p>
          </div>

          {featuredCampaign && (
            <CampaignCard
              campaign={featuredCampaign}
              variant="featured"
              onOpenDonate={onOpenDonate}
              onOpenDetails={(camp) => setSelectedCampaign(camp)}
            />
          )}

          {otherCampaigns.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 700 }}>
                  Other Active Emergency Relief Causes
                </h3>
                <Link to="/campaigns" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  View All Campaigns ({displayCampaigns.length}) <ArrowRight size={15} />
                </Link>
              </div>
              <div className="campaigns-grid">
                {otherCampaigns.slice(0, 6).map((camp) => (
                  <CampaignCard
                    key={camp._id || camp.id}
                    campaign={camp}
                    variant="card"
                    onOpenDonate={onOpenDonate}
                    onOpenDetails={(c) => setSelectedCampaign(c)}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
                <Link
                  to="/campaigns"
                  className="btn btn-secondary btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <span>Explore All {displayCampaigns.length} Emergency Campaigns</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          7. OUR IMPACT (BEFORE / AFTER & METRICS)
          =================================================================== */}
      <section className="section section-bg-alt" id="impact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Impact</span>
            <h2 className="section-title">Measurable, Real-World Transformation</h2>
            <p className="section-subtitle">
              We monitor every milestone. Here is the verified before-and-after change achieved across our field locations.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
            <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>150+</div>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>Projects Completed</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Schools, clinics & solar water wells</span>
            </div>
            <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--font-heading)' }}>25+</div>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>Locations Covered</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Across 4 major state districts</span>
            </div>
            <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0284c7', fontFamily: 'var(--font-heading)' }}>10,000+</div>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>People Benefited</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Children, mothers & elderlies</span>
            </div>
            <div style={{ background: 'white', padding: '1.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#16a34a', fontFamily: 'var(--font-heading)' }}>92%</div>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>Fund Efficiency</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Direct program expenditure ratio</span>
            </div>
          </div>

          {/* Before & After Comparison Cards */}
          <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.25rem, 3vw, 2rem)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Water & Sanitation Program</span>
              <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0 1rem 0' }}>Village Drinking Water Security (Arid Cluster)</h3>
              
              <div className="grid grid-2" style={{ gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.85rem' }}>❌ BEFORE INTERVENTION</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    Women walked 6 km daily; 68% child waterborne diarrhea incidence rate.
                  </p>
                </div>
                <div>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>✅ AFTER SUBHASHISH WELL</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    24/7 Solar filtration tap in village center; 0 waterborne cases recorded in 18 months.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.25rem, 3vw, 2rem)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Girl Child Education</span>
              <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0 1rem 0' }}>School Attendance & Digital Literacy</h3>
              
              <div className="grid grid-2" style={{ gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.85rem' }}>❌ BEFORE INTERVENTION</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    62% girl child dropout rate after grade 5 due to lack of uniforms & books.
                  </p>
                </div>
                <div>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>✅ AFTER SUBHASHISH KITS</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    98.4% retention rate with full digital tablet classrooms and evening mentorship.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={onOpenImpactReport}
            >
              <FileText size={18} /> View & Download Impact Report (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. SUCCESS STORIES
          =================================================================== */}
      <section className="section" id="stories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Real Transformation</span>
            <h2 className="section-title">Success Stories from Our Beneficiaries</h2>
            <p className="section-subtitle">
              Every number is a human life restored. Meet the individuals whose lives were forever transformed through your contributions.
            </p>
          </div>

          <div className="grid grid-3">
            {successStoriesToDisplay.map((story) => (
              <div
                key={story.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '220px', position: 'relative' }}>
                  <img
                    src={story.photo}
                    alt={story.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="cause-category-badge" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                    {story.program}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{story.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <MapPin size={14} color="var(--primary)" /> {story.location}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                    "{story.shortStory}"
                  </p>

                  <div style={{ background: 'var(--primary-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                    ✨ {story.result}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => onOpenStory(story)}
                  >
                    Read Full Story &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          9. PHOTO / VIDEO GALLERY
          =================================================================== */}
      <section className="section section-bg-alt" id="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ground Level Action</span>
            <h2 className="section-title">Photo & Video Gallery</h2>
            <p className="section-subtitle">
              Authentic snapshots of our field teams, medical camps, classrooms, and disaster relief operations.
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveGalleryTab(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid',
                  borderColor: activeGalleryTab === cat ? 'var(--primary)' : 'var(--border-light)',
                  background: activeGalleryTab === cat ? 'var(--primary)' : 'white',
                  color: activeGalleryTab === cat ? 'white' : 'var(--text-secondary)',
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

          {/* Gallery Grid */}
          <div className="grid grid-3" style={{ marginBottom: '2.5rem' }}>
            {filteredGallery.slice(0, 6).map((img) => (
              <div
                key={img.id}
                style={{
                  height: '240px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1rem',
                  color: 'white'
                }}>
                  <span style={{ fontSize: '0.72rem', color: '#2dd4bf', fontWeight: 700, textTransform: 'uppercase' }}>{img.category}</span>
                  <h4 style={{ fontSize: '0.975rem', color: 'white' }}>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/gallery" className="btn btn-outline">
              View Full Gallery
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenVideo}
            >
              <Play size={16} fill="white" /> Watch Videos (Field Documentary)
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          10. HOW YOU CAN HELP (5 ACTION PILLARS)
          =================================================================== */}
      <section className="section" id="how-you-can-help-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag tag-accent">Take Action Today</span>
            <h2 className="section-title">How You Can Help</h2>
            <p className="section-subtitle">
              Every individual and corporate organization has a unique superpower to create positive change. Choose how you want to stand with us.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: '1.75rem' }}>
            {/* 1. DONATE */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#fef2f2', color: '#dc2626' }}>
                <Heart size={26} fill="#dc2626" />
              </div>
              <h3>1. DONATE</h3>
              <p>Support our education, food, and mobile clinic programs financially. Every rupee goes 100% directly to the field with 80G tax benefits.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onOpenDonate()}
              >
                Donate Now &rarr;
              </button>
            </div>

            {/* 2. VOLUNTEER */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <UserCheck size={26} />
              </div>
              <h3>2. VOLUNTEER</h3>
              <p>Give your time, professional knowledge, and skills. Join our teaching cohorts, medical health camps, or digital media teams.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={onOpenVolunteer}
              >
                Become a Volunteer &rarr;
              </button>
            </div>

            {/* 3. PARTNER WITH US */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Handshake size={26} />
              </div>
              <h3>3. PARTNER WITH US</h3>
              <p>Collaborate through Corporate Social Responsibility (CSR), institutional grants, employer matching gifts, or cause sponsorships.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={onOpenPartner}
              >
                CSR Collaboration &rarr;
              </button>
            </div>

            {/* 4. FUNDRAISE */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                <Megaphone size={26} />
              </div>
              <h3>4. FUNDRAISE</h3>
              <p>Host a birthday fundraiser, school charity drive, or marathon challenge to mobilize resources for children in need.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => onOpenDonate('Fundraiser Drive')}
              >
                Start a Fundraiser &rarr;
              </button>
            </div>

            {/* 5. SPREAD AWARENESS */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#faf5ff', color: '#9333ea' }}>
                <Share2 size={26} />
              </div>
              <h3>5. SPREAD AWARENESS</h3>
              <p>Amplify our mission by sharing campaigns on social media, advocating for child rights, and inviting friends to participate.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'Subhashish Welfare Foundation', url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Website link copied to clipboard! Share with your community.");
                  }
                }}
              >
                Share Mission &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          11. PARTNERS / SPONSORS
          =================================================================== */}
      <section className="section section-bg-alt" id="partners-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">Collaborative Strength</span>
            <h2 className="section-title">Our Partners & Institutional Sponsors</h2>
            <p className="section-subtitle">
              Proudly collaborating with forward-thinking enterprises, government bodies, and international agencies to scale social impact.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: '1.25rem', marginBottom: '2rem' }}>
            {partnersToDisplay.map((p, idx) => (
              <div
                key={p.name || idx}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: 'var(--primary)'
                }}>
                  <Building size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-primary)' }}>{p.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onOpenPartner}>
              Become an Official Partner / CSR Sponsor &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          12. LATEST NEWS / BLOG
          =================================================================== */}
      <section className="section" id="news-blog-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Dispatches from the Field</span>
            <h2 className="section-title">Latest News & Impact Updates</h2>
            <p className="section-subtitle">
              Stay informed on our recent community drives, policy research, and heartwarming volunteer achievements.
            </p>
          </div>

          <div className="grid grid-3">
            {blogPostsToDisplay.map((post) => (
              <div
                key={post.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Link to={`/blog/${post.slug || post.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: '190px', overflow: 'hidden', position: 'relative' }}>
                    <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="cause-category-badge" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={13} /> {post.date}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    <Link to={`/blog/${post.slug || post.id}`} style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {post.desc}
                  </p>
                  <Link to={`/blog/${post.slug || post.id}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto', textDecoration: 'none' }}>
                    Read Full Story <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          13. DONATION CTA SECTION
          =================================================================== */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #042f2e 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fed7aa', border: '1px solid rgba(255, 255, 255, 0.25)', marginBottom: '1.25rem' }}>
            Give Hope Today
          </span>
          <h2 style={{ fontSize: '2.75rem', color: 'white', marginBottom: '1.25rem' }}>
            Your Support Can Change a Life
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.25rem' }}>
            Every contribution helps us reach another child, family, and community. Join thousands of compassionate citizens making an enduring difference.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary btn-lg pulse-animation"
              onClick={() => onOpenDonate()}
            >
              <Heart size={20} fill="white" /> Donate Now
            </button>
            <Link to="/causes" className="btn btn-outline-white btn-lg">
              Support a Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          14. NEWSLETTER SECTION
          =================================================================== */}
      <section className="section" style={{ background: 'var(--bg-darker)', color: 'white', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.75rem' }}>
            Stay Connected With Our Mission
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '2rem' }}>
            Receive monthly impact reports, field photographs, and event invitations directly in your inbox. No spam.
          </p>

          {!newsletterSubscribed ? (
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: '1 1 300px',
                  padding: '0.85rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0.85rem 2rem' }}>
                <Send size={16} /> Subscribe
              </button>
            </form>
          ) : (
            <div style={{ background: 'rgba(20, 184, 166, 0.2)', border: '1px solid #14b8a6', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} />
              <span>Thank you for subscribing! You are now connected with our updates.</span>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          15. CONTACT / GET IN TOUCH
          =================================================================== */}
      <section className="section" id="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">Contact Us & Visit Our Center</h2>
            <p className="section-subtitle">
              Have questions about volunteering, donations, 80G tax exemptions, or partnership proposals?
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: '3rem' }}>
            {/* Office Details & Google Map */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <MapPin size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Office Address</strong>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      204 Hope Avenue, Social Impact Block, New Delhi, 110001, India
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <Phone size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Phone Number & Helpline</strong>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      +1 (800) 555-0199 / +91 98765 43210 (Mon–Sat, 9AM–7PM)
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <Mail size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Email Inquiries</strong>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      care@subhashishfoundation.org • csr@subhashishfoundation.org
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '240px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)' }}>
                <iframe
                  src="https://maps.google.com/maps?q=New+Delhi,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  title="Subhashish Welfare Foundation Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)' }}>
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Send Us a Message</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Fill out this inquiry form and our coordinator will respond within 24 hours.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Your Full Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+1 (555) 000-0000"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Subject</label>
                    <select
                      className="form-control"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    >
                      <option>General Inquiry</option>
                      <option>Donation & 80G Tax Exemption</option>
                      <option>Volunteer Opportunities</option>
                      <option>CSR / Corporate Sponsorship</option>
                      <option>Media & Press Inquiries</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea
                      required
                      className="form-control"
                      rows="3"
                      placeholder="How can we assist you or collaborate?"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#dcfce7',
                    color: '#16a34a',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
                    Thank you, <strong>{contactForm.name}</strong>. We will get back to you at <strong>{contactForm.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
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
    </>
  );
}
