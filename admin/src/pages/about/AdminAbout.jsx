import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAbout, deleteAbout } from "../../Redux/ActionCreators/AboutActionCreators";

export default function AdminAbout() {
  const AboutStateData = useSelector((state) => state.AboutStateData);
  const dispatch = useDispatch();

  const about = Array.isArray(AboutStateData) ? AboutStateData[0] : (AboutStateData?.data?.[0] || null);
  const hasRecord = Boolean(about);

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this About NGO profile?")) {
      dispatch(deleteAbout({ _id }));
    }
  }

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        {/* Heading */}
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-info-circle-fill text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Organization</p>
              <h1 className="h3 mb-1">About NGO</h1>
              <p className="text-muted mb-0">Overview, Mission, Vision, and Contact details.</p>
            </div>
          </div>
          {!hasRecord && (
            <div className="heading-actions">
              <Link className="btn btn-primary btn-sm" to="/about/create">
                <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Create NGO Profile
              </Link>
            </div>
          )}
        </div>

        {!hasRecord ? (
          <div className="panel text-center py-5">
            <i className="bi bi-building text-muted" style={{ fontSize: "3rem" }}></i>
            <p className="mt-3 mb-1 fw-semibold">No NGO Profile Created Yet</p>
            <p className="text-muted small mb-3">Add mission, vision, history, and official address.</p>
            <Link className="btn btn-primary btn-sm" to="/about/create">
              <i className="bi bi-plus-circle me-1"></i> Create NGO Profile
            </Link>
          </div>
        ) : (
          <div className="panel p-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
              <div className="d-flex gap-3 align-items-center flex-wrap">
                {about.logo ? (
                  <div className="about-logo-box">
                    <img
                      src={about.logo}
                      alt={about.ngoName}
                    />
                  </div>
                ) : (
                  <div
                    className="rounded bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3"
                    style={{ width: 84, height: 84, flexShrink: 0 }}
                  >
                    {about.ngoName ? about.ngoName.charAt(0) : "N"}
                  </div>
                )}
                <div>
                  <h2 className="h4 mb-1 fw-bold">{about.ngoName}</h2>
                  <p className="text-muted mb-1">{about.tagline || "Non-profit Organization"}</p>
                  {about.establishedYear && (
                    <span className="about-tag-badge">
                      <i className="bi bi-calendar3"></i> Est. {about.establishedYear}
                    </span>
                  )}
                </div>
              </div>

              <div className="d-flex gap-2">
                <Link className="btn btn-outline-primary btn-sm" to={`/about/update/${about._id}`}>
                  <i className="bi bi-pencil-square me-1"></i> Edit Profile
                </Link>
                {localStorage.getItem("role") === "Super Admin" || localStorage.getItem("role") === "superadmin" ? (
                  <button className="btn btn-outline-danger btn-sm" onClick={() => deleteRecord(about._id)}>
                    <i className="bi bi-trash3-fill me-1"></i> Delete
                  </button>
                ) : null}
              </div>
            </div>

            {about.aboutImage && (
              <div className="about-hero-banner mb-4">
                <img
                  src={about.aboutImage}
                  alt="About Hero"
                  className="w-100 d-block"
                  style={{ maxHeight: 340, objectFit: "cover" }}
                />
              </div>
            )}

            <div className="row g-4 mb-4">
              <div className="col-12 col-lg-6">
                <div className="about-mission-card">
                  <h3 className="h6 text-primary fw-bold text-uppercase mb-2">
                    <i className="bi bi-bullseye me-2"></i>Mission Statement
                  </h3>
                  <p className="mb-0" style={{ color: "var(--admin-text)", lineHeight: 1.6 }}>{about.mission}</p>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="about-vision-card">
                  <h3 className="h6 text-success fw-bold text-uppercase mb-2">
                    <i className="bi bi-eye-fill me-2"></i>Vision Statement
                  </h3>
                  <p className="mb-0" style={{ color: "var(--admin-text)", lineHeight: 1.6 }}>{about.vision}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="h6 fw-bold mb-2">About the NGO</h3>
              <p className="about-desc-content">
                {about.description}
              </p>
            </div>

            {about.objectives && about.objectives.length > 0 && (
              <div className="mb-4">
                <h3 className="h6 fw-bold mb-2">Core Objectives</h3>
                <div className="d-flex flex-column gap-2 mt-2">
                  {about.objectives.map((obj, i) => (
                    <div key={i} className="about-objective-item">
                      <i className="bi bi-check2-circle"></i>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-4" />

            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="about-contact-tile">
                  <div className="tile-label">
                    <i className="bi bi-envelope text-primary"></i> Contact Email
                  </div>
                  <div className="tile-value">{about.contactEmail || "—"}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="about-contact-tile">
                  <div className="tile-label">
                    <i className="bi bi-telephone text-success"></i> Contact Phone
                  </div>
                  <div className="tile-value">{about.contactPhone || "—"}</div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="about-contact-tile">
                  <div className="tile-label">
                    <i className="bi bi-geo-alt text-danger"></i> Registered Address
                  </div>
                  <div className="tile-value">
                    {about.address
                      ? [about.address.street, about.address.city, about.address.state, about.address.country, about.address.pincode]
                          .filter(Boolean)
                          .join(", ") || "—"
                      : "—"}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}