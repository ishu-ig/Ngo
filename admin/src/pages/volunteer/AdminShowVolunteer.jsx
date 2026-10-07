import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVolunteer, updateVolunteer } from "../../Redux/ActionCreators/VolunteerActionCreators";

export default function AdminShowVolunteer() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const VolunteerStateData = useSelector((state) => state.VolunteerStateData);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    dispatch(getVolunteer());
  }, [dispatch]);

  const list = Array.isArray(VolunteerStateData)
    ? VolunteerStateData
    : VolunteerStateData?.data || [];
  const volunteer = list.find((v) => v._id === _id);

  function setStatus(status) {
    dispatch(updateVolunteer({ _id, applicationStatus: status }));
  }

  function handleCopy(text, field) {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  function getAge(dob) {
    if (!dob) return null;
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? age : null;
  }

  if (!volunteer) {
    return (
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <div className="panel text-center py-5">
            <div className="mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--admin-surface-soft)",
                  color: "var(--admin-muted)",
                  border: "1px solid var(--admin-border)",
                  fontSize: "1.75rem",
                }}
              >
                <i className="bi bi-person-x"></i>
              </span>
            </div>
            <h2 className="h5 fw-bold mb-2">Volunteer Profile Not Found</h2>
            <p className="text-muted mb-4">The volunteer record you are looking for does not exist or may have been removed.</p>
            <Link to="/volunteer" className="btn btn-primary btn-sm">
              <i className="bi bi-arrow-left me-1"></i> Back to Volunteers
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const initials = volunteer.name
    ? volunteer.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "V";

  const skillsList = Array.isArray(volunteer.skills)
    ? volunteer.skills.flatMap((s) => (typeof s === "string" ? s.split(",") : s)).map((s) => s?.trim()).filter(Boolean)
    : typeof volunteer.skills === "string"
    ? volunteer.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const areasList = Array.isArray(volunteer.areasOfInterest)
    ? volunteer.areasOfInterest.flatMap((a) => (typeof a === "string" ? a.split(",") : a)).map((a) => a?.trim()).filter(Boolean)
    : typeof volunteer.areasOfInterest === "string"
    ? volunteer.areasOfInterest.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  const age = getAge(volunteer.dateOfBirth);

  const statusConfig = {
    approved: {
      label: "Approved",
      icon: "bi-check-circle-fill",
      className: "volunteer-status-approved",
    },
    "in-review": {
      label: "In Review",
      icon: "bi-search",
      className: "volunteer-status-in-review",
    },
    pending: {
      label: "Pending",
      icon: "bi-clock-history",
      className: "volunteer-status-pending",
    },
    rejected: {
      label: "Rejected",
      icon: "bi-x-circle-fill",
      className: "volunteer-status-rejected",
    },
  };

  const currentStatus = statusConfig[volunteer.applicationStatus] || {
    label: volunteer.applicationStatus,
    icon: "bi-info-circle",
    className: "volunteer-status-pending",
  };

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        {/* Page Header */}
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-person-badge-fill text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Community</p>
              <h1 className="h3 mb-1">Volunteer Application Profile</h1>
              <p className="text-muted mb-0">Candidate background, skills, and availability.</p>
            </div>
          </div>
          <div className="heading-actions d-flex gap-2">
            <Link className="btn btn-outline-secondary btn-sm" to="/volunteer">
              <i className="bi bi-arrow-left me-1"></i> Back
            </Link>
            <Link className="btn btn-primary btn-sm" to={`/volunteer/update/${_id}`}>
              <i className="bi bi-pencil-square me-1"></i> Edit Profile
            </Link>
          </div>
        </div>

        {/* Candidate Hero Card */}
        <div className="volunteer-profile-hero">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="volunteer-avatar-badge" title={volunteer.name}>
                {initials}
              </div>
              <div>
                <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                  <h2 className="h4 fw-bold mb-0 text-break">{volunteer.name}</h2>
                  <span className={`volunteer-status-badge ${currentStatus.className}`}>
                    <i className={`bi ${currentStatus.icon}`}></i>
                    {currentStatus.label}
                  </span>
                  <span
                    className={`badge ${
                      volunteer.isActive !== false ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {volunteer.isActive !== false ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-muted mb-0 d-flex align-items-center flex-wrap gap-2 small">
                  {volunteer.occupation && (
                    <span>
                      <i className="bi bi-briefcase me-1"></i>
                      {volunteer.occupation}
                    </span>
                  )}
                  {[volunteer.city, volunteer.state].filter(Boolean).length > 0 && (
                    <span>
                      <i className="bi bi-geo-alt me-1"></i>
                      {[volunteer.city, volunteer.state].filter(Boolean).join(", ")}
                    </span>
                  )}
                  {volunteer.createdAt && (
                    <span>
                      <i className="bi bi-calendar3 me-1"></i>
                      Applied: {new Date(volunteer.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Status Control Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              {volunteer.applicationStatus !== "approved" && (
                <button
                  className="btn btn-success btn-sm d-inline-flex align-items-center gap-1"
                  onClick={() => setStatus("approved")}
                >
                  <i className="bi bi-check-circle"></i> Approve
                </button>
              )}
              {volunteer.applicationStatus !== "in-review" && (
                <button
                  className="btn btn-outline-info btn-sm d-inline-flex align-items-center gap-1"
                  onClick={() => setStatus("in-review")}
                >
                  <i className="bi bi-search"></i> Mark In-Review
                </button>
              )}
              {volunteer.applicationStatus !== "rejected" && (
                <button
                  className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                  onClick={() => setStatus("rejected")}
                >
                  <i className="bi bi-x-circle"></i> Reject
                </button>
              )}
              {volunteer.applicationStatus !== "pending" && (
                <button
                  className="btn btn-outline-warning btn-sm d-inline-flex align-items-center gap-1"
                  onClick={() => setStatus("pending")}
                >
                  <i className="bi bi-arrow-counterclockwise"></i> Reset to Pending
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="row g-4">
          {/* Left Column: Personal & Contact Information */}
          <div className="col-12 col-xl-5 col-lg-6">
            <div className="d-flex flex-column gap-4">
              {/* Contact Details Card */}
              <div className="volunteer-detail-card">
                <div className="volunteer-card-header">
                  <h3 className="volunteer-card-title">
                    <i className="bi bi-person-lines-fill"></i>
                    Contact & Personal Information
                  </h3>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-envelope-at"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Email Address</div>
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <a href={`mailto:${volunteer.email}`} className="volunteer-info-link">
                        {volunteer.email || "—"}
                      </a>
                      {volunteer.email && (
                        <button
                          type="button"
                          className="btn btn-link btn-sm p-0 text-muted"
                          title="Copy Email"
                          onClick={() => handleCopy(volunteer.email, "email")}
                        >
                          <i className={copiedField === "email" ? "bi bi-check-lg text-success" : "bi bi-copy"}></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Phone Number</div>
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <a href={`tel:${volunteer.phone}`} className="volunteer-info-link">
                        {volunteer.phone || "—"}
                      </a>
                      {volunteer.phone && (
                        <button
                          type="button"
                          className="btn btn-link btn-sm p-0 text-muted"
                          title="Copy Phone"
                          onClick={() => handleCopy(volunteer.phone, "phone")}
                        >
                          <i className={copiedField === "phone" ? "bi bi-check-lg text-success" : "bi bi-copy"}></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Date of Birth & Age</div>
                    <div className="volunteer-info-value">
                      {volunteer.dateOfBirth ? (
                        <>
                          {new Date(volunteer.dateOfBirth).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          {age !== null && (
                            <span className="text-muted fw-normal ms-2 small">({age} years old)</span>
                          )}
                        </>
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Residential Address</div>
                    <div className="volunteer-info-value">{volunteer.address || "—"}</div>
                    {[volunteer.city, volunteer.state].filter(Boolean).length > 0 && (
                      <div className="text-muted small mt-1">
                        {[volunteer.city, volunteer.state].filter(Boolean).join(", ")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-person-workspace"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Occupation</div>
                    <div className="volunteer-info-value">{volunteer.occupation || "Not Specified"}</div>
                  </div>
                </div>
              </div>

              {/* Application Details Card */}
              <div className="volunteer-detail-card">
                <div className="volunteer-card-header">
                  <h3 className="volunteer-card-title">
                    <i className="bi bi-card-checklist"></i>
                    Application Management
                  </h3>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-flag"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Application Status</div>
                    <div className="mt-1" style={{ maxWidth: 220 }}>
                      <select
                        className="form-select form-select-sm"
                        value={volunteer.applicationStatus}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                          background: "var(--admin-surface-soft)",
                          borderColor: "var(--admin-border)",
                          color: "var(--admin-text-strong)",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-review">In-Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-calendar-plus"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Application Submitted</div>
                    <div className="volunteer-info-value">
                      {volunteer.createdAt ? new Date(volunteer.createdAt).toLocaleString() : "—"}
                    </div>
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Last Updated</div>
                    <div className="volunteer-info-value">
                      {volunteer.updatedAt ? new Date(volunteer.updatedAt).toLocaleString() : "—"}
                    </div>
                  </div>
                </div>

                <div className="volunteer-info-item">
                  <div className="volunteer-info-icon">
                    <i className="bi bi-hash"></i>
                  </div>
                  <div className="volunteer-info-content">
                    <div className="volunteer-info-label">Application ID</div>
                    <div className="volunteer-info-value font-monospace small text-muted">
                      {volunteer._id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Availability, Skills, and Statement */}
          <div className="col-12 col-xl-7 col-lg-6">
            <div className="d-flex flex-column gap-4">
              {/* Availability & Skills Card */}
              <div className="volunteer-detail-card">
                <div className="volunteer-card-header">
                  <h3 className="volunteer-card-title">
                    <i className="bi bi-stars"></i>
                    Availability & Role Fit
                  </h3>
                </div>

                {/* Availability Schedule */}
                <div className="mb-4">
                  <div className="volunteer-info-label mb-2">Availability Schedule</div>
                  <div>
                    <span className="volunteer-badge-avail text-capitalize">
                      <i className="bi bi-calendar2-check text-primary"></i>
                      {volunteer.availability || "Flexible"}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="volunteer-info-label mb-2">Key Skills & Proficiencies</div>
                  <div className="d-flex flex-wrap gap-2">
                    {skillsList.length > 0 ? (
                      skillsList.map((skill, index) => (
                        <span key={index} className="volunteer-chip volunteer-chip-skill">
                          <i className="bi bi-check-circle-fill text-primary small"></i>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted small fst-italic">No specific skills listed.</span>
                    )}
                  </div>
                </div>

                {/* Areas of Interest */}
                <div>
                  <div className="volunteer-info-label mb-2">Areas of Interest & Causes</div>
                  <div className="d-flex flex-wrap gap-2">
                    {areasList.length > 0 ? (
                      areasList.map((area, index) => (
                        <span key={index} className="volunteer-chip volunteer-chip-interest">
                          <i className="bi bi-heart-fill small"></i>
                          {area}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted small fst-italic">No specific areas of interest listed.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Statement of Motivation Card */}
              <div className="volunteer-detail-card">
                <div className="volunteer-card-header">
                  <h3 className="volunteer-card-title">
                    <i className="bi bi-chat-quote-fill"></i>
                    Statement of Motivation
                  </h3>
                </div>

                {volunteer.message ? (
                  <div className="volunteer-quote-box">
                    <div className="d-flex align-items-center gap-2 mb-2 text-primary opacity-75">
                      <i className="bi bi-quote fs-4"></i>
                      <span className="small fw-semibold text-uppercase tracking-wider">Candidate's Note</span>
                    </div>
                    <p style={{ whiteSpace: "pre-line" }}>{volunteer.message}</p>
                  </div>
                ) : (
                  <div className="p-3 text-center text-muted fst-italic">
                    No personal statement or motivation note provided for this application.
                  </div>
                )}
              </div>

              {/* Quick Contact & Action Panel */}
              <div className="volunteer-detail-card">
                <div className="volunteer-card-header">
                  <h3 className="volunteer-card-title">
                    <i className="bi bi-lightning-charge-fill"></i>
                    Communication & Quick Actions
                  </h3>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {volunteer.email && (
                    <a
                      href={`mailto:${volunteer.email}`}
                      className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-envelope"></i> Send Email
                    </a>
                  )}
                  {volunteer.phone && (
                    <a
                      href={`tel:${volunteer.phone}`}
                      className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-telephone"></i> Call Candidate
                    </a>
                  )}
                  <Link
                    to={`/volunteer/update/${_id}`}
                    className="btn btn-outline-info btn-sm d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-pencil-square"></i> Edit Application
                  </Link>
                  <Link
                    to="/volunteer"
                    className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-arrow-left"></i> All Volunteers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

