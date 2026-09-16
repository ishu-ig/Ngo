import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, Sparkles, CreditCard, AlertCircle } from 'lucide-react';
import TechnicalModal from './TechnicalModal';

export default function DonationModal({ isOpen, onClose, defaultCause = null }) {
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Donor Info, 3: Success Receipt
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receiptTxnId, setReceiptTxnId] = useState('');
  const [showTechnicalModal, setShowTechnicalModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: '',
    wantsTaxReceipt: true,
  });

  if (!isOpen) return null;

  const presets = [500, 1000, 2500, 5000];

  const getImpactMessage = (val) => {
    if (val < 1000) return 'Provides a week of warm, nutritious meals for 5 children.';
    if (val < 2500) return 'Funds school uniforms, books & digital learning kits for 1 child.';
    if (val < 5000) return 'Provides critical pediatric health checkups & emergency medicines for 10 kids.';
    return 'Sponsors complete 1-year education, healthcare, and nutrition for a child in need.';
  };

  const currentAmount = isCustom ? Number(customAmount) || 0 : amount;

  const handlePresetClick = (val) => {
    setIsCustom(false);
    setAmount(val);
  };

  const handleCustomChange = (e) => {
    setIsCustom(true);
    setCustomAmount(e.target.value);
  };

  const handleSubmitDonor = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Trigger the technical maintenance modal popup
    setShowTechnicalModal(true);
  };

  const handleReset = () => {
    setStep(1);
    setReceiptTxnId('');
    setErrorMsg('');
    setProcessing(false);
    setShowTechnicalModal(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleReset}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleReset} aria-label="Close modal">
          <X size={20} />
        </button>

        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--secondary-subtle)',
                color: 'var(--secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}>
                <Heart size={26} />
              </div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>
                {defaultCause ? `Support: ${defaultCause}` : 'Make a Life-Changing Impact'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                100% transparent. 80G tax benefits applicable.
              </p>
            </div>

            {/* Frequency Selector */}
            <div className="donation-freq-toggle">
              <button
                type="button"
                className={`donation-freq-btn ${frequency === 'monthly' ? 'active' : ''}`}
                onClick={() => setFrequency('monthly')}
              >
                <Sparkles size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
                Give Monthly (Recommended)
              </button>
              <button
                type="button"
                className={`donation-freq-btn ${frequency === 'one-time' ? 'active' : ''}`}
                onClick={() => setFrequency('one-time')}
              >
                One-Time Gift
              </button>
            </div>

            {/* Amount Grid */}
            <div className="amount-grid">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={`amount-btn ${!isCustom && amount === val ? 'active' : ''}`}
                  onClick={() => handlePresetClick(val)}
                >
                  ₹{val.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <input
                type="number"
                placeholder="Or enter custom amount (₹ INR)"
                className="custom-amount-input"
                value={isCustom ? customAmount : ''}
                onChange={handleCustomChange}
                min="50"
              />
            </div>

            {/* Impact Banner */}
            <div className="impact-preview">
              <Sparkles size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Your Impact:</strong> {getImpactMessage(currentAmount)}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
              onClick={() => setStep(2)}
              disabled={currentAmount <= 0}
            >
              Continue with ₹{currentAmount.toLocaleString('en-IN')} {frequency === 'monthly' ? '/ month' : ''}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} color="var(--primary)" />
              256-Bit SSL Encrypted & 80G Tax-Deductible Donation
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Donor Information</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Summary: <strong style={{ color: 'var(--primary)' }}>₹{currentAmount.toLocaleString('en-IN')} ({frequency})</strong>
            </p>

            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "0.75rem", borderRadius: "var(--radius-md)", color: "#dc2626", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", fontSize: "0.85rem" }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitDonor}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address * (For 80G Tax Receipt)</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (For Payment Confirmation)</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="taxReceipt"
                  checked={formData.wantsTaxReceipt}
                  onChange={(e) => setFormData({ ...formData, wantsTaxReceipt: e.target.checked })}
                />
                <label htmlFor="taxReceipt" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Send official 80G tax exemption certificate
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                  onClick={() => setStep(1)}
                  disabled={processing}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  disabled={processing}
                >
                  <CreditCard size={18} />
                  {processing ? "Opening Gateway..." : `Pay ₹${currentAmount.toLocaleString('en-IN')} via Razorpay`}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={42} />
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Thank You, {formData.name || 'Generous Donor'}!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Your generous contribution of <strong style={{ color: 'var(--primary)' }}>₹{currentAmount.toLocaleString('en-IN')}</strong> has been processed successfully. An official 80G tax receipt and project update have been emailed to <strong>{formData.email}</strong>.
            </p>
            <div style={{ background: 'var(--bg-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Payment Reference: <strong style={{ color: 'var(--primary)' }}>{receiptTxnId || `#SWF-${Math.floor(100000 + Math.random() * 900000)}`}</strong>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleReset} style={{ width: '100%' }}>
              Back to Foundation
            </button>
          </div>
        )}
      </div>

      <TechnicalModal
        isOpen={showTechnicalModal}
        onClose={() => setShowTechnicalModal(false)}
      />
    </div>
  );
}
