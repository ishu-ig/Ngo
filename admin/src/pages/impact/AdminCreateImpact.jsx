import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createImpact } from "../../Redux/ActionCreators/ImpactActionCreators";
import formValidator from "../../FormValidators/formValidator";

const COMMON_ICONS = [
  { label: "Heart (Care / Relief)", value: "heart-fill" },
  { label: "People (Community / Beneficiaries)", value: "people-fill" },
  { label: "Mortarboard (Education / Schools)", value: "mortarboard-fill" },
  { label: "Tree (Environment / Green)", value: "tree-fill" },
  { label: "House (Shelter / Infrastructure)", value: "house-heart-fill" },
  { label: "Cup / Food (Nutrition / Meals)", value: "cup-hot-fill" },
  { label: "Award (Achievements)", value: "trophy-fill" },
  { label: "Globe (Nationwide / Outreach)", value: "globe-central-south-asia" },
];

export default function AdminCreateImpact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    value: "",
    description: "",
    icon: "heart-fill",
    isActive: true,
  });

  const [errorMessage, setErrorMessage] = useState({});

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

    if (!data.title || !data.value) {
      alert("Please provide Title and Metric Value.");
      return;
    }

    dispatch(createImpact(data));
    navigate("/impact");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-graph-up-arrow text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Impact Metrics</p>
              <h1 className="h3 mb-1">Add Impact Metric</h1>
              <p className="text-muted mb-0">Record a key achievement statistic (e.g. 50k+ Lives Touched).</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/impact">
              <i className="bi bi-arrow-left me-1"></i> Back to Impact
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Metric Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  placeholder="e.g. Underprivileged Children Educated"
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Display Value * (e.g. 50,000+, 99.4%, ₹2.5 Cr)</label>
                <input
                  type="text"
                  name="value"
                  className="form-control"
                  placeholder="e.g. 25,000+"
                  value={data.value}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Icon Symbol</label>
                <select name="icon" className="form-select" value={data.icon} onChange={getInputData}>
                  {COMMON_ICONS.map((ic) => (
                    <option key={ic.value} value={ic.value}>{ic.label}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Brief Explanation</label>
                <textarea
                  name="description"
                  rows="2"
                  className="form-control"
                  placeholder="Verified across 12 rural districts over 4 years of grassroots work."
                  value={data.description}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveImpactSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveImpactSwitch">
                    Display on Homepage Impact Counter
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/impact" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-success px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Metric
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
