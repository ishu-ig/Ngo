import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../Redux/ActionCreators/EventActionCreators';
import { Calendar, Clock, MapPin, Users, Heart } from 'lucide-react';

export default function Events({ onOpenVolunteer, onOpenDonate }) {
  const dispatch = useDispatch();
  const EventStateData = useSelector((state) => state.EventStateData);

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const defaultEvents = [
    {
      id: 1,
      title: 'Free Pediatric Health & Dental Screening Camp',
      date: 'September 15, 2026',
      time: '9:00 AM - 4:00 PM',
      location: 'Community Center, Sector 4',
      image: '/assets/images/event-1.jpg',
      category: 'Health Camp',
      desc: 'Screening 600+ children for malnutrition, dental hygiene, vision defects, and administering free vaccines and vitamins.'
    },
    {
      id: 2,
      title: 'Annual "Run For Hope" 5K & 10K Charity Marathon',
      date: 'October 04, 2026',
      time: '6:30 AM Start',
      location: 'City Central Park',
      image: '/assets/images/event-2.jpg',
      category: 'Fundraiser',
      desc: 'Join 1,200 runners to sponsor school tuition kits and scholarships for 500 girl children in tribal villages.'
    },
    {
      id: 3,
      title: 'Mega Food & Ration Distribution Drive',
      date: 'October 22, 2026',
      time: '10:00 AM - 2:00 PM',
      location: 'Riverbank Settlement Cluster B',
      image: '/assets/images/event-3.jpg',
      category: 'Food Relief',
      desc: 'Distributing 1,500 dry ration kits (rice, pulses, oil, nutritional supplements) to flood-affected migrant laborers.'
    },
    {
      id: 4,
      title: 'Digital Literacy & Coding Workshop for Youth',
      date: 'November 10, 2026',
      time: '11:00 AM - 3:30 PM',
      location: 'Subhashish Learning Center, Block 7',
      image: '/assets/images/event-4.jpg',
      category: 'Education',
      desc: 'Hands-on basic coding and digital safety training led by tech volunteer mentors for high school students.'
    }
  ];

  const rawEvents = Array.isArray(EventStateData)
    ? EventStateData
    : (EventStateData?.data || []);

  const upcomingEvents = rawEvents.length > 0
    ? rawEvents.map((e) => ({
        id: e._id,
        title: e.title,
        date: e.startDate ? new Date(e.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (e.date || 'Upcoming'),
        time: e.time || `${e.startTime || '9:00 AM'} - ${e.endTime || '4:00 PM'}`,
        location: e.location?.venue || e.location?.city || e.venue || (typeof e.location === 'string' ? e.location : 'Community Center'),
        image: e.featuredImage || e.bannerImage || e.pic || '/assets/images/event-1.jpg',
        category: e.category || 'Community Drive',
        desc: e.shortDescription || e.description || ''
      }))
    : defaultEvents;

  return (
    <div>
      {/* Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            Join Us in the Field
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            Charity Drives & Community Events
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem' }}>
            Participate in our upcoming medical checkups, food drives, and fundraising marathons. Every volunteer makes an immediate difference.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="event-card">
                <div className="event-img" style={{ minWidth: '280px' }}>
                  <img src={evt.image} alt={evt.title} />
                  <span className="cause-category-badge" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    {evt.category}
                  </span>
                </div>
                <div className="event-content" style={{ padding: '2rem' }}>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={16} /> {evt.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={16} /> {evt.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                        <MapPin size={16} /> {evt.location}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>{evt.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {evt.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <Users size={16} color="var(--primary)" />
                      <span>Free Entry • Volunteers Welcome</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={onOpenVolunteer}
                      >
                        Volunteer Here
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => onOpenDonate(evt.title)}
                      >
                        <Heart size={14} /> Sponsor Event
                      </button>
                    </div>
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
