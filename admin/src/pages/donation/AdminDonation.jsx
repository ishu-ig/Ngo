import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDonation,
  deleteDonation,
} from "../../Redux/ActionCreators/DonationActionCreators";

export default function AdminDonation() {
  const DonationStateData = useSelector((state) => state.DonationStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this donation record?")) {
      dispatch(deleteDonation({ _id }));
    }
  }

  useEffect(() => {
    dispatch(getDonation());
  }, [dispatch]);

  const donations = Array.isArray(DonationStateData)
    ? DonationStateData
    : DonationStateData?.data || [];

  const filteredData = donations.filter(
    (d) =>
      d.donorName?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase()) ||
      d.paymentMethod?.toLowerCase().includes(search.toLowerCase()) ||
      d.paymentStatus?.toLowerCase().includes(search.toLowerCase())
  );

  const totalRaised = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const completedDonations = donations.filter((d) => d.paymentStatus === "completed");

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
              <h1 className="h3 mb-1">Donations</h1>
              <p className="text-muted mb-0">Track donor contributions, receipts, and 80G data.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/donation/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Record Offline Donation
            </Link>
          </div>
        </div>

        {/* Metric Summary */}
        <section className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-primary">
              <div className="metric-top">
                <span className="metric-label">Total Contributions</span>
                <span className="metric-icon"><i className="bi bi-receipt"></i></span>
              </div>
              <div className="metric-value">{donations.length}</div>
              <div className="metric-meta"><span>all transactions</span></div>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-success">
              <div className="metric-top">
                <span className="metric-label">Total Funds Raised</span>
                <span className="metric-icon"><i className="bi bi-cash-stack"></i></span>
              </div>
              <div className="metric-value">₹{totalRaised.toLocaleString("en-IN")}</div>
              <div className="metric-meta"><span>INR collected</span></div>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-warning">
              <div className="metric-top">
                <span className="metric-label">Completed Payments</span>
                <span className="metric-icon"><i className="bi bi-check2-all"></i></span>
              </div>
              <div className="metric-value">{completedDonations.length}</div>
              <div className="metric-meta"><span>verified receipts</span></div>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-danger">
              <div className="metric-top">
                <span className="metric-label">Anonymous Donors</span>
                <span className="metric-icon"><i className="bi bi-incognito"></i></span>
              </div>
              <div className="metric-value">
                {donations.filter((d) => d.isAnonymous).length}
              </div>
              <div className="metric-meta"><span>private contributions</span></div>
            </article>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Donations Ledger</span>
              </h2>
              <p className="text-muted mb-0">Full record of all incoming funds.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by donor, email, method..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Donor</th>
                  <th>Contact</th>
                  <th>Amount</th>
                  <th>Campaign</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="fw-semibold">
                          {item.isAnonymous ? (
                            <span className="text-muted fst-italic">Anonymous</span>
                          ) : (
                            item.donorName || "Supporter"
                          )}
                        </div>
                        {item.panNumber && (
                          <div className="small text-muted">PAN: {item.panNumber}</div>
                        )}
                      </td>
                      <td>
                        <div>{item.email || "—"}</div>
                        <small className="text-muted">{item.phone || ""}</small>
                      </td>
                      <td className="fw-bold text-success">
                        ₹{(Number(item.amount) || 0).toLocaleString("en-IN")}
                      </td>
                      <td>
                        {item.campaign?.title ? (
                          <span className="badge text-bg-light border text-truncate d-inline-block" style={{ maxWidth: 140 }}>
                            {item.campaign.title}
                          </span>
                        ) : (
                          <span className="text-muted small">General Fund</span>
                        )}
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{item.paymentMethod || "Razorpay"}</span>
                      </td>
                      <td>
                        <span
                          className={`badge text-capitalize ${
                            item.paymentStatus === "completed"
                              ? "text-bg-success"
                              : item.paymentStatus === "pending"
                              ? "text-bg-warning"
                              : item.paymentStatus === "failed"
                              ? "text-bg-danger"
                              : "text-bg-secondary"
                          }`}
                        >
                          {item.paymentStatus || "completed"}
                        </span>
                      </td>
                      <td>
                        <div className="small text-muted">
                          {item.donationDate ? new Date(item.donationDate).toLocaleDateString() : "—"}
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/donation/view/${item._id}`} className="btn btn-outline-info" title="View Details">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link to={`/donation/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          {localStorage.getItem("role") === "Super Admin" || localStorage.getItem("role") === "superadmin" ? (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteRecord(item._id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-4">
                      {search ? `No donations found matching "${search}"` : "No donation records found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
