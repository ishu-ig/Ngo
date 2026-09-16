import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlog } from '../Redux/ActionCreators/BlogActionCreators';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';

export default function Blog() {
  const dispatch = useDispatch();
  const BlogStateData = useSelector((state) => state.BlogStateData);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const defaultArticles = [
    {
      id: 1,
      title: 'How Clean Water Revitalized 25 Drought-Stricken Villages in 1 Year',
      excerpt: 'Access to safe drinking water reduced waterborne child hospitalizations by 74% and allowed 1,200 young girls to return to school full-time.',
      date: 'August 12, 2026',
      author: 'Dr. Priya Sharma',
      readTime: '4 min read',
      image: '/assets/images/image_1.jpg',
      category: 'Field Report'
    },
    {
      id: 2,
      title: 'Breaking The Cycle: From Working In Brick Kilns To Top High School Honors',
      excerpt: 'Meet Ramesh, a 14-year-old boy whose life took a complete turn after our mobile school team discovered his family in rural Bihar.',
      date: 'July 28, 2026',
      author: 'Anand Varma',
      readTime: '6 min read',
      image: '/assets/images/image_2.jpg',
      category: 'Success Story'
    },
    {
      id: 3,
      title: 'Pediatric Healthcare on Wheels: Inside Our Mobile Ambulance Fleet',
      excerpt: 'A day in the life of our frontline doctors navigating unpaved forest trails to deliver emergency newborn care.',
      date: 'July 14, 2026',
      author: 'Dr. Aris Thorne',
      readTime: '5 min read',
      image: '/assets/images/image_3.jpg',
      category: 'Healthcare'
    },
    {
      id: 4,
      title: 'Empowering 400 Women Through Micro-Tailoring Cooperatives',
      excerpt: 'How localized financial training and sewing equipment grants turned dependent homemakers into thriving micro-entrepreneurs.',
      date: 'June 30, 2026',
      author: 'Elena Vasquez',
      readTime: '4 min read',
      image: '/assets/images/image_4.jpg',
      category: 'Empowerment'
    },
    {
      id: 5,
      title: 'Nutrition Over Hunger: Scaling Our Daily Hot Meal Kitchens',
      excerpt: 'Providing 3,500 balanced, protein-rich lunches daily is driving a dramatic surge in school attendance across slum settlements.',
      date: 'June 18, 2026',
      author: 'Subhashish Roy',
      readTime: '3 min read',
      image: '/assets/images/image_5.jpg',
      category: 'Nutrition'
    },
    {
      id: 6,
      title: 'Annual Social Impact Audit 2025: Key Milestones & Financials',
      excerpt: 'A complete, transparent report on where every donated rupee went, our outcomes, and our expansion roadmap for 2026-2028.',
      date: 'May 25, 2026',
      author: 'Audit Committee',
      readTime: '8 min read',
      image: '/assets/images/image_6.jpg',
      category: 'Transparency'
    }
  ];

  const rawBlogs = Array.isArray(BlogStateData)
    ? BlogStateData
    : (BlogStateData?.data || []);

  const articles = rawBlogs.length > 0
    ? rawBlogs.map((b) => ({
        id: b._id,
        slug: b.slug || b._id,
        title: b.title,
        excerpt: b.shortDescription || (b.content ? b.content.slice(0, 140) + '...' : ''),
        date: b.publishedDate || b.createdAt ? new Date(b.publishedDate || b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
        author: b.author?.name || b.authorName || 'Editorial Team',
        readTime: b.readTime || `${Math.max(2, Math.ceil((b.content?.length || 500) / 400))} min read`,
        image: b.featuredImage || b.pic || '/assets/images/image_1.jpg',
        category: b.category || 'Dispatches'
      }))
    : defaultArticles;

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            News & Field Dispatches
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            Stories of Hope, Transformation & Impact
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem' }}>
            Read real updates straight from our ground teams, beneficiary interviews, and annual progress assessments.
          </p>
        </div>
      </section>

      {/* Search & Blog Grid */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '480px', margin: '0 auto 3rem auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search stories, topics, or authors..."
              className="form-control"
              style={{ borderRadius: 'var(--radius-full)', paddingLeft: '2.8rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <Link
                  to={`/blog/${item.slug || item.id}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="cause-category-badge" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      {item.category}
                    </span>
                  </div>
                </Link>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={13} /> {item.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} /> {item.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                    <Link
                      to={`/blog/${item.slug || item.id}`}
                      style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {item.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={13} /> {item.author}
                    </span>
                    <Link
                      to={`/blog/${item.slug || item.id}`}
                      style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}
                    >
                      Read Story <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
