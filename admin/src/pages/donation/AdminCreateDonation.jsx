import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDonation } from "../../Redux/ActionCreators/DonationActionCreators";
import { getCampaign } from "../../Redux/ActionCreators/CampaignActionCreators";
import formValidator from "../../FormValidators/formValidator";

const PAYMENT_METHODS = [
  "Razorpay",
  "Stripe",
  "PayPal",
  "UPI",
  "Bank Transfer",
  "Cash",
  "Card",
  "Net Banking",
  "Other",
];

const PAYMENT_STATUSES = ["pending", "completed", "failed", "refunded"];

export default function AdminCreateDonation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CampaignStateData = useSelector((state) => state.CampaignStateData);

  const [data, setData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    currency: "INR",
    paymentMethod: "Cash",
    paymentStatus: "completed",
    campaign: "",
    isAnonymous: false,
    panNumber: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    message: "",
    transactionId: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getCampaign());
  }, [dispatch]);

  const campaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : CampaignStateData?.data || [];

  function getInputData(e) {
    const { name, value, type, checked } = e.target;
    setErrorMessage((prev) => ({
      ...prev,
      [name]: formValidator(e),
    }));
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.donorName || !data.email || !data.amount) {
      alert("Please fill mandatory donor fields (Name, Email, Amount).");
      return;
    }

    const payload = {
      donorName: data.donorName,
      email: data.email,
      phone: data.phone,
      amount: Number(data.amount),
      currency: data.currency,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      campaign: data.campaign || null,
      isAnonymous: data.isAnonymous,
      panNumber: data.panNumber,
      message: data.message,
      transactionId: data.transactionId || undefined,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
      },
    };

    dispatch(createDonation(payload));
    navigate("/donation");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-heart-fill text-danger" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Finances</p>
              <h1 className="h3 mb-1">Record Donation</h1>
              <p className="text-muted mb-0">Record an offline or direct bank transfer donation.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/donation">
              <i className="bi bi-arrow-left me-1"></i> Back to Donations
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Donor Full Name *</label>
                <input
                  type="text"
                  name="donorName"
                  className={`form-control ${errorMessage.donorName ? "is-invalid" : ""}`}
                  placeholder="e.g. Ramesh Gupta"
                  value={data.donorName}
                  onChange={getInputData}
                  required
                />
                {errorMessage.donorName && <div className="invalid-feedback">{errorMessage.donorName}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Donor Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errorMessage.email ? "is-invalid" : ""}`}
                  placeholder="ramesh@example.com"
                  value={data.email}
                  onChange={getInputData}
                  required
                />
                {errorMessage.email && <div className="invalid-feedback">{errorMessage.email}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="+91 9876543210"
                  value={data.phone}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Amount (INR) *</label>
                <input
                  type="number"
                  name="amount"
                  className={`form-control ${errorMessage.amount ? "is-invalid" : ""}`}
                  placeholder="5000"
                  value={data.amount}
                  onChange={getInputData}
                  min="1"
                  required
                />
                {errorMessage.amount && <div className="invalid-feedback">{errorMessage.amount}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Campaign</label>
                <select name="campaign" className="form-select" value={data.campaign} onChange={getInputData}>
                  <option value="">-- General NGO Fund --</option>
                  {campaigns.map((c) => (
                    <option key={c._id} value={c._id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Payment Method</label>
                <select name="paymentMethod" className="form-select" value={data.paymentMethod} onChange={getInputData}>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Payment Status</label>
                <select name="paymentStatus" className="form-select text-capitalize" value={data.paymentStatus} onChange={getInputData}>
                  {PAYMENT_STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">PAN Card (For 80G Tax Exemption)</label>
                <input
                  type="text"
                  name="panNumber"
                  className="form-control text-uppercase"
                  placeholder="ABCDE1234F"
                  value={data.panNumber}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Transaction / Reference ID</label>
                <input
                  type="text"
                  name="transactionId"
                  className="form-control"
                  placeholder="TXN-2026-00123"
                  value={data.transactionId}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6 d-flex align-items-center mt-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isAnonSwitch"
                    name="isAnonymous"
                    checked={data.isAnonymous}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isAnonSwitch">
                    Mark as Anonymous Donation
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Donor Note / Message</label>
                <textarea
                  name="message"
                  rows="2"
                  className="form-control"
                  placeholder="e.g. In memory of loved ones, or specific instructions"
                  value={data.message}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <hr className="my-2" />
                <h6 className="fw-bold mb-3">Donor Address (For 80G Certificate Receipt)</h6>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Street</label>
                <input type="text" name="street" className="form-control" value={data.street} onChange={getInputData} />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label">City</label>
                <input type="text" name="city" className="form-control" value={data.city} onChange={getInputData} />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label">State</label>
                <input type="text" name="state" className="form-control" value={data.state} onChange={getInputData} />
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/donation" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Donation
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
