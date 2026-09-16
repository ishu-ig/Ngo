import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaign } from '../Redux/ActionCreators/CampaignActionCreators';
import { getProject } from '../Redux/ActionCreators/ProjectActionCreators';
import { Heart, ShieldCheck, Sparkles, Gift, Building2, QrCode } from 'lucide-react';

export default function DonatePage({ onOpenDonate }) {
  const dispatch = useDispatch();
  const CampaignStateData = useSelector((state) => state.CampaignStateData);
  const ProjectStateData = useSelector((state) => state.ProjectStateData);

  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [selectedCause, setSelectedCause] = useState('Where Needed Most');

  useEffect(() => {
    dispatch(getCampaign());
    dispatch(getProject());
  }, [dispatch]);

  const rawCampaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : (CampaignStateData?.data || []);

  const rawProjects = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : (ProjectStateData?.data || []);

  const causesList = [
    'Where Needed Most (Recommended)',
    ...rawCampaigns.map(c => c.title),
    ...rawProjects.map(p => p.title)
  ];

  const presets = [500, 1000, 2500, 5000, 10000];

  const currentAmount = isCustom ? Number(customAmount) || 0 : amount;

  const getImpactMessage = (val) => {
    if (val < 1000) return 'Provides 100 hot nutritious meals and fruit packs for children at mobile learning centers.';
    if (val < 2500) return 'Funds full school supplies, uniform, backpack & digital library access for 2 rural students.';
    if (val < 5000) return 'Sponsors life-saving malnutrition stabilization kits & pediatric medicines for 8 infants.';
    return 'Funds clean drinking water infrastructure & filter installations for 200+ village residents.';
  };

  return (
    <div>
      {/* Header */}
      <section className="section-bg-dark" style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
            Invest In Human Dignity
          </span>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
            Give Today. Transform A Tomorrow.
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '680px', margin: '0 auto', fontSize: '1.15rem' }}>
            Your monthly or one-time contribution directly funds grassroots education, healthcare, and water systems. Eligible for 80G tax deductions.
          </p>
        </div>
      </section>

      {/* Main Donation Layout */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'flex-start', gap: '3.5rem' }}>
            {/* Donation Form Card */}
            <div className="donation-box" style={{ border: '2px solid var(--border-light)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Select Contribution</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                  Secure, transparent, and direct giving.
                </p>
              </div>

              {/* Frequency */}
              <div className="donation-freq-toggle">
                <button
                  type="button"
                  className={`donation-freq-btn ${frequency === 'monthly' ? 'active' : ''}`}
                  onClick={() => setFrequency('monthly')}
                >
                  <Sparkles size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
                  Monthly Giving (High Impact)
                </button>
                <button
                  type="button"
                  className={`donation-freq-btn ${frequency === 'one-time' ? 'active' : ''}`}
                  onClick={() => setFrequency('one-time')}
                >
                  One-Time Contribution
                </button>
              </div>

              {/* Cause Allocation Dropdown */}
              <div className="form-group">
                <label className="form-label">Direct Funds Towards</label>
                <select
                  className="form-control"
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                >
                  {causesList.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Amount Grid */}
              <div className="amount-grid">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`amount-btn ${!isCustom && amount === val ? 'active' : ''}`}
                    onClick={() => {
                      setIsCustom(false);
                      setAmount(val);
                    }}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="form-group">
                <label className="form-label">Or Custom Amount (₹ INR)</label>
                <input
                  type="number"
                  min="50"
                  placeholder="Enter custom amount in ₹"
                  className="form-control"
                  value={customAmount}
                  onChange={(e) => {
                    setIsCustom(true);
                    setCustomAmount(e.target.value);
                  }}
                />
              </div>

              {/* Dynamic Impact Banner */}
              <div className="impact-indicator" style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Your ₹{currentAmount.toLocaleString('en-IN')} {frequency === 'monthly' ? '/month' : ''} gift:</span>{' '}
                {getImpactMessage(currentAmount)}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                onClick={() => onOpenDonate(selectedCause)}
              >
                <Heart size={20} /> Proceed with ₹{currentAmount.toLocaleString('en-IN')} Donation
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ShieldCheck size={16} color="var(--primary)" /> 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>80G Tax Receipt</span>
                <span>•</span>
                <span>Cancel Anytime</span>
              </div>
            </div>

            {/* Ways to Give Info */}
            <div>
              <span className="section-tag">More Ways to Support</span>
              <h2 className="section-title">Diverse Ways to Power Our Mission</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                From corporate grants to legacy bequests, we offer tailored giving vehicles to align with your philanthropic vision.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)', display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Corporate CSR Partnerships</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Channel your company's mandatory CSR budgets into high-accountability village adoptions with quarterly audit metrics.
                    </p>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)', display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--secondary-subtle)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Gift size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Memorial & Celebratory Giving</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Honor a loved one's birthday, anniversary, or legacy by sponsoring a classroom library or solar clean water well in their name.
                    </p>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)', display: 'flex', gap: '1.25rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <QrCode size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Wire Transfer & Stock Donations</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                      Direct bank NEFT/RTGS transfers, stock transfers, and mutual fund grants offer significant capital gains tax exemptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
