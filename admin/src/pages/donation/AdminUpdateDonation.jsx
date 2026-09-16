import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDonation, updateDonation } from "../../Redux/ActionCreators/DonationActionCreators";
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

export default function AdminUpdateDonation() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DonationStateData = useSelector((state) => state.DonationStateData);
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
    dispatch(getDonation());
    dispatch(getCampaign());
  }, [dispatch]);

  const campaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : CampaignStateData?.data || [];

  useEffect(() => {
    const list = Array.isArray(DonationStateData)
      ? DonationStateData
      : DonationStateData?.data || [];
    const item = list.find((d) => d._id === _id);
    if (item) {
      setData({
        donorName: item.donorName || "",
        email: item.email || "",
        phone: item.phone || "",
        amount: item.amount || "",
        currency: item.currency || "INR",
        paymentMethod: item.paymentMethod || "Razorpay",
        paymentStatus: item.paymentStatus || "completed",
        campaign: item.campaign?._id || item.campaign || "",
        isAnonymous: Boolean(item.isAnonymous),
        panNumber: item.panNumber || "",
        street: item.address?.street || "",
        city: item.address?.city || "",
        state: item.address?.state || "",
        country: item.address?.country || "India",
        pincode: item.address?.pincode || "",
        message: item.message || "",
        transactionId: item.transactionId || "",
      });
    }
  }, [DonationStateData, _id]);

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

    const payload = {
      _id,
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
      transactionId: data.transactionId,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
      },
    };

    dispatch(updateDonation(payload));
    navigate("/donation");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-danger" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Finances</p>
              <h1 className="h3 mb-1">Update Donation</h1>
              <p className="text-muted mb-0">Update payment status, 80G PAN, or receipt details.</p>
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
                  value={data.donorName}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Donor Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errorMessage.email ? "is-invalid" : ""}`}
                  value={data.email}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={data.phone}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Amount (INR) *</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={data.amount}
                  onChange={getInputData}
                  min="1"
                  required
                />
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
                <label className="form-label fw-semibold">PAN Card (For 80G)</label>
                <input
                  type="text"
                  name="panNumber"
                  className="form-control text-uppercase"
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
                  value={data.transactionId}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6 d-flex align-items-center mt-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isAnonSwitchEdit"
                    name="isAnonymous"
                    checked={data.isAnonymous}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isAnonSwitchEdit">
                    Anonymous Donation
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Donor Message</label>
                <textarea
                  name="message"
                  rows="2"
                  className="form-control"
                  value={data.message}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <hr className="my-2" />
                <h6 className="fw-bold mb-3">Donor Address</h6>
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
                  <i className="bi bi-check2-circle me-1"></i> Update Record
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
