import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVolunteer, updateVolunteer } from "../../Redux/ActionCreators/VolunteerActionCreators";

export default function AdminShowVolunteer() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const VolunteerStateData = useSelector((state) => state.VolunteerStateData);

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

  if (!volunteer) {
    return (
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4 text-center py-5">
          <p className="text-muted">Volunteer profile not found.</p>
          <Link to="/volunteer" className="btn btn-outline-secondary btn-sm">Back to Volunteers</Link>
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
              <i className="bi bi-pencil-square me-1"></i> Edit
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom">
            <div>
              <h2 className="h4 fw-bold mb-1">{volunteer.name}</h2>
              <p className="text-muted mb-0">
                {volunteer.occupation ? `${volunteer.occupation} • ` : ""}
                {[volunteer.city, volunteer.state].filter(Boolean).join(", ")}
              </p>
            </div>
            <div className="d-flex gap-2">
              {volunteer.applicationStatus !== "approved" && (
                <button className="btn btn-success btn-sm" onClick={() => setStatus("approved")}>
                  <i className="bi bi-check-circle me-1"></i> Approve Application
                </button>
              )}
              {volunteer.applicationStatus !== "rejected" && (
                <button className="btn btn-danger btn-sm" onClick={() => setStatus("rejected")}>
                  <i className="bi bi-x-circle me-1"></i> Reject
                </button>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100">
                <h6 className="fw-bold text-uppercase text-muted small mb-3">Contact & Personal Details</h6>
                <div className="mb-2">
                  <span className="text-muted small">Email:</span>
                  <div className="fw-semibold">{volunteer.email}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Phone:</span>
                  <div className="fw-semibold">{volunteer.phone}</div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Date of Birth:</span>
                  <div className="fw-semibold">
                    {volunteer.dateOfBirth ? new Date(volunteer.dateOfBirth).toLocaleDateString() : "—"}
                  </div>
                </div>
                <div>
                  <span className="text-muted small">Address:</span>
                  <div>{volunteer.address || "—"}</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border h-100">
                <h6 className="fw-bold text-uppercase text-muted small mb-3">Availability & Role Fit</h6>
                <div className="mb-2">
                  <span className="text-muted small">Availability:</span>
                  <div>
                    <span className="badge text-bg-light border text-capitalize fs-6">
                      {volunteer.availability || "flexible"}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Status:</span>
                  <div>
                    <span
                      className={`badge text-capitalize ${
                        volunteer.applicationStatus === "approved"
                          ? "text-bg-success"
                          : volunteer.applicationStatus === "pending"
                          ? "text-bg-warning"
                          : volunteer.applicationStatus === "in-review"
                          ? "text-bg-info"
                          : "text-bg-danger"
                      }`}
                    >
                      {volunteer.applicationStatus}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Key Skills:</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {volunteer.skills && volunteer.skills.length > 0 ? (
                      volunteer.skills.map((s, i) => (
                        <span key={i} className="badge bg-secondary-subtle text-secondary border">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">Not specified</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-muted small">Areas of Interest:</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {volunteer.areasOfInterest && volunteer.areasOfInterest.length > 0 ? (
                      volunteer.areasOfInterest.map((a, i) => (
                        <span key={i} className="badge bg-primary-subtle text-primary border">
                          {a}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">Not specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {volunteer.message && (
              <div className="col-12">
                <div className="p-3 bg-light rounded border">
                  <h6 className="fw-bold text-uppercase text-muted small mb-2">Statement of Motivation</h6>
                  <p className="mb-0 text-muted" style={{ whiteSpace: "pre-line" }}>
                    {volunteer.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
