import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../Redux/ActionCreators/BlogActionCreators';
import {
  Calendar,
  Clock,
  Eye,
  Tag,
  ArrowLeft,
  Share2,
  Check,
  HeartHandshake,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function BlogDetail({ onOpenDonate }) {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BlogStateData = useSelector((state) => state.BlogStateData);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(getBlog());
    window.scrollTo(0, 0);
  }, [dispatch, _id]);

  const rawBlogs = Array.isArray(BlogStateData)
    ? BlogStateData
    : (BlogStateData?.data || []);

  const blog = rawBlogs.find((b) => b._id === _id || b.slug === _id || String(b.id) === _id);

  // Fallback / Related blogs
  const relatedBlogs = rawBlogs
    .filter((b) => (b._id !== _id && b.slug !== _id && String(b.id) !== _id))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || 'Inspiring NGO Story');
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!blog && rawBlogs.length > 0) {
    return (
      <div style={{ padding: '6rem 1rem', textAlign: 'center', minHeight: '60vh' }}>
        <div className="container">
          <BookOpen size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Story Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            The story or field report you are looking for does not exist or has been archived.
          </p>
          <Link to="/blog" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to News & Dispatches
          </Link>
        </div>
      </div>
    );
  }

  const title = blog?.title || 'Stories of Hope, Transformation & Grassroots Impact';
  const category = blog?.category || 'Field Dispatch';
  const dateStr = blog?.publishedDate || blog?.createdAt
    ? new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'August 2026';
  const authorName = blog?.author?.name || blog?.authorName || 'Field Operations Editorial';
  const authorRole = blog?.author?.role || 'Humanitarian Reporter';
  const authorPic = blog?.author?.profilePic || '/assets/images/person_4.jpg';
  const heroImage = blog?.featuredImage || blog?.pic || '/assets/images/image_1.jpg';
  const shortDesc = blog?.shortDescription || '';
  const content = blog?.content || '';
  const readTime = blog?.readTime || `${Math.max(2, Math.ceil((content.length || 500) / 400))} min read`;
  const views = blog?.views || 1240;
  const tags = Array.isArray(blog?.tags) && blog.tags.length > 0
    ? blog.tags
    : ['Humanitarian', 'Grassroots', 'Empowerment'];

  // Helper to format markdown headers / paragraphs
  const renderFormattedContent = (rawText) => {
    if (!rawText) return null;

    const sections = rawText.split('\n\n');
    return sections.map((sec, idx) => {
      const trimmed = sec.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginTop: '2.25rem',
              marginBottom: '1rem',
              lineHeight: 1.35
            }}
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '1rem',
              lineHeight: 1.3
            }}
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return (
          <blockquote
            key={idx}
            style={{
              margin: '2rem 0',
              padding: '1.25rem 1.75rem',
              borderLeft: '4px solid var(--primary)',
              background: 'var(--bg-alt)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--text-primary)'
            }}
          >
            {trimmed}
          </blockquote>
        );
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map((item) => item.replace(/^[-*]\s+/, ''));
        return (
          <ul
            key={idx}
            style={{
              paddingLeft: '1.5rem',
              margin: '1.25rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7
            }}
          >
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={idx}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.85,
            marginBottom: '1.35rem'
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div style={{ background: '#fcfcfd', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Top Breadcrumbs & Back Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dispatches</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {title}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/blog')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={15} /> All Stories
          </button>
        </div>
      </div>

      {/* Article Header */}
      <article className="container" style={{ maxWidth: '880px', marginTop: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <span
            className="section-tag"
            style={{
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              borderColor: 'rgba(20, 184, 166, 0.25)',
              marginBottom: '1.25rem'
            }}
          >
            {category}
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '1.5rem'
            }}
          >
            {title}
          </h1>

          {/* Metadata bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-light)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src={authorPic}
                alt={authorName}
                style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left' }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.85rem' }}>{authorName}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{authorRole}</span>
              </div>
            </div>

            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={15} color="var(--primary)" /> {dateStr}
            </span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={15} color="var(--secondary)" /> {readTime}
            </span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Eye size={15} /> {views.toLocaleString()} views
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '2.5rem'
          }}
        >
          <img
            src={heroImage}
            alt={title}
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Lead Excerpt Callout */}
        {shortDesc && (
          <div
            style={{
              background: 'white',
              border: '1px solid var(--border-light)',
              borderLeft: '4px solid var(--secondary)',
              padding: '1.5rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'var(--text-primary)',
              fontWeight: 500,
              marginBottom: '2.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {shortDesc}
          </div>
        )}

        {/* Main Article Body */}
        <div
          style={{
            background: 'white',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.5rem'
          }}
        >
          {renderFormattedContent(content)}

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginTop: '2.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid var(--border-light)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <Tag size={15} /> Topic Tags:
            </span>
            {tags.map((t, idx) => (
              <span
                key={idx}
                style={{
                  background: 'var(--bg-alt)',
                  color: 'var(--text-secondary)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  border: '1px solid var(--border-light)'
                }}
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Social Share Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1.75rem',
              padding: '1.25rem',
              background: 'var(--bg-alt)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
              <Share2 size={16} color="var(--primary)" /> Share This Field Report:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={handleShare}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', background: 'white' }}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => shareOnSocial('whatsapp')}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', background: 'white' }}
              >
                WhatsApp
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => shareOnSocial('twitter')}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', background: 'white' }}
              >
                Twitter / X
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => shareOnSocial('linkedin')}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', background: 'white' }}
              >
                LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio Box */}
        <div
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}
        >
          <img
            src={authorPic}
            alt={authorName}
            style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', fontWeight: 700 }}>
              Written By
            </span>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
              {authorName}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
              Frontline documentarian and humanitarian writer reporting on grassroots rural development, healthcare innovations, and youth empowerment.
            </p>
          </div>
        </div>

        {/* Support CTA Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #0d9488 100%)',
            color: 'white',
            padding: 'clamp(2rem, 5vw, 3rem)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '4rem'
          }}
        >
          <HeartHandshake size={44} style={{ marginBottom: '1rem', opacity: 0.95 }} />
          <h3 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.75rem', color: 'white' }}>
            Be The Reason Another Story Is Written
          </h3>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.75rem auto', fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6 }}>
            Every rupee donated directly finances clean water plants, mobile hospital clinics, and school supplies for children in need.
          </p>
          <button
            type="button"
            className="btn"
            style={{
              background: 'white',
              color: 'var(--primary)',
              fontWeight: 700,
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-md)'
            }}
            onClick={() => onOpenDonate && onOpenDonate(category)}
          >
            Support Our Work <ArrowRight size={18} />
          </button>
        </div>

        {/* Related Stories Grid */}
        {relatedBlogs.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span className="section-tag" style={{ marginBottom: '0.5rem' }}>More Dispatches</span>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Read Other Inspiring Stories</h3>
              </div>
              <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                View All <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-3" style={{ gap: '1.5rem' }}>
              {relatedBlogs.map((rel) => (
                <div
                  key={rel._id || rel.slug}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img
                      src={rel.featuredImage || rel.pic || '/assets/images/image_1.jpg'}
                      alt={rel.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                      {rel.category || 'Story'}
                    </span>
                    <h4 style={{ fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.65rem' }}>
                      {rel.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem', flexGrow: 1 }}>
                      {rel.shortDescription?.slice(0, 80) || rel.content?.slice(0, 80)}...
                    </p>
                    <Link
                      to={`/blog/${rel._id || rel.slug}`}
                      style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', marginTop: 'auto' }}
                    >
                      Read Full Story <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
