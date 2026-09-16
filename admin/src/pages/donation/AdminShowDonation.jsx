import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDonation } from "../../Redux/ActionCreators/DonationActionCreators";

export default function AdminShowDonation() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const DonationStateData = useSelector((state) => state.DonationStateData);

  useEffect(() => {
    dispatch(getDonation());
  }, [dispatch]);

  const list = Array.isArray(DonationStateData)
    ? DonationStateData
    : DonationStateData?.data || [];
  const donation = list.find((d) => d._id === _id);

  if (!donation) {
    return (
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4 text-center py-5">
          <p className="text-muted">Donation record not found.</p>
          <Link to="/donation" className="btn btn-outline-secondary btn-sm">Back to Donations</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-receipt text-danger" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Receipt & Ledger</p>
              <h1 className="h3 mb-1">Donation Details</h1>
              <p className="text-muted mb-0">Full breakdown of contribution and tax exemption info.</p>
            </div>
          </div>
          <div className="heading-actions d-flex gap-2">
            <Link className="btn btn-outline-secondary btn-sm" to="/donation">
              <i className="bi bi-arrow-left me-1"></i> Back
            </Link>
            <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
              <i className="bi bi-printer me-1"></i> Print Receipt
            </button>
          </div>
        </div>

        <div className="panel p-4">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100">
                <h6 className="fw-bold text-uppercase text-muted small mb-3">Donor Information</h6>
                <div className="mb-2">
                  <span className="text-muted small">Name:</span>
                  <div className="fw-semibold">
                    {donation.isAnonymous ? "Anonymous Supporter" : donation.donorName || "—"}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Email:</span>
                  <div className="fw-semibold">{donation.email || "—"}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Phone:</span>
                  <div className="fw-semibold">{donation.phone || "—"}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">PAN (80G Tax Exemption):</span>
                  <div className="fw-bold text-primary">{donation.panNumber || "Not Provided"}</div>
                </div>
                <div>
                  <span className="text-muted small">Address:</span>
                  <div>
                    {donation.address
                      ? [donation.address.street, donation.address.city, donation.address.state, donation.address.country, donation.address.pincode]
                          .filter(Boolean)
                          .join(", ") || "—"
                      : "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100">
                <h6 className="fw-bold text-uppercase text-muted small mb-3">Transaction Details</h6>
                <div className="mb-2">
                  <span className="text-muted small">Donation Amount:</span>
                  <div className="display-6 fw-bold text-success">
                    ₹{(Number(donation.amount) || 0).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Payment Status:</span>
                  <div>
                    <span
                      className={`badge text-capitalize ${
                        donation.paymentStatus === "completed"
                          ? "text-bg-success"
                          : donation.paymentStatus === "pending"
                          ? "text-bg-warning"
                          : "text-bg-secondary"
                      }`}
                    >
                      {donation.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Payment Gateway / Method:</span>
                  <div className="fw-semibold">{donation.paymentMethod || "Razorpay"}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Transaction / Payment ID:</span>
                  <div className="font-monospace small">{donation.transactionId || donation.paymentId || "—"}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Target Campaign:</span>
                  <div className="fw-semibold">{donation.campaign?.title || "General NGO Support"}</div>
                </div>
                <div>
                  <span className="text-muted small">Date & Time:</span>
                  <div>{donation.donationDate ? new Date(donation.donationDate).toLocaleString() : "—"}</div>
                </div>
              </div>
            </div>

            {donation.message && (
              <div className="col-12">
                <div className="p-3 bg-light rounded border">
                  <h6 className="fw-bold text-uppercase text-muted small mb-2">Donor Note</h6>
                  <p className="mb-0 text-muted fst-italic">"{donation.message}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
