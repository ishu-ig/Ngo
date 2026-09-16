import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProject } from "../../Redux/ActionCreators/ProjectActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const CATEGORIES = [
  "Education",
  "Healthcare",
  "Environment",
  "Women Empowerment",
  "Child Welfare",
  "Disaster Relief",
  "Poverty Alleviation",
  "Animal Welfare",
  "Skill Development",
  "Community Development",
  "Other",
];

const STATUSES = ["planned", "ongoing", "completed", "on-hold"];

export default function AdminCreateProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    category: "Education",
    location: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "ongoing",
    beneficiaryCount: 0,
    targetGroup: "",
    shortDescription: "",
    fullDescription: "",
    isActive: true,
  });

  const [featuredImage, setFeaturedImage] = useState(null);
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

  function getInputFile(e) {
    const file = e.target.files[0];
    const err = imageValidator(e);
    setErrorMessage((prev) => ({
      ...prev,
      featuredImage: err,
    }));
    if (!err && file) {
      setFeaturedImage(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.title || !data.shortDescription || !data.fullDescription || !featuredImage) {
      alert("Please fill all mandatory fields (Title, Short Description, Full Description, Featured Image).");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("location", data.location);
    formData.append("startDate", data.startDate);
    if (data.endDate) formData.append("endDate", data.endDate);
    formData.append("status", data.status);
    formData.append(
      "beneficiaries",
      JSON.stringify({
        count: Number(data.beneficiaryCount) || 0,
        targetGroup: data.targetGroup,
      })
    );
    formData.append("shortDescription", data.shortDescription);
    formData.append("fullDescription", data.fullDescription);
    formData.append("isActive", data.isActive);
    formData.append("featuredImage", featuredImage);

    dispatch(createProject(formData));
    navigate("/project");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-folder-plus text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Programs</p>
              <h1 className="h3 mb-1">Add New Project</h1>
              <p className="text-muted mb-0">Launch a community program or mission.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/project">
              <i className="bi bi-arrow-left me-1"></i> Back to Projects
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  placeholder="e.g. Rural Clean Water Initiative"
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Category *</label>
                <select name="category" className="form-select" value={data.category} onChange={getInputData}>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g. Varanasi, UP"
                  value={data.location}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={data.startDate}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">End Date (Optional)</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={data.endDate}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Status</label>
                <select name="status" className="form-select text-capitalize" value={data.status} onChange={getInputData}>
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Beneficiary Count</label>
                <input
                  type="number"
                  name="beneficiaryCount"
                  className="form-control"
                  placeholder="e.g. 5000"
                  value={data.beneficiaryCount}
                  onChange={getInputData}
                  min="0"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Target Group</label>
                <input
                  type="text"
                  name="targetGroup"
                  className="form-control"
                  placeholder="e.g. School Children, Women Farmers"
                  value={data.targetGroup}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Featured Image *</label>
                <input
                  type="file"
                  name="featuredImage"
                  className={`form-control ${errorMessage.featuredImage ? "is-invalid" : ""}`}
                  onChange={getInputFile}
                  required
                />
                {errorMessage.featuredImage && <div className="invalid-feedback">{errorMessage.featuredImage}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Short Summary / Description *</label>
                <textarea
                  name="shortDescription"
                  rows="2"
                  className={`form-control ${errorMessage.shortDescription ? "is-invalid" : ""}`}
                  placeholder="Brief 1-2 sentence overview of the project"
                  value={data.shortDescription}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.shortDescription && <div className="invalid-feedback">{errorMessage.shortDescription}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Full Project Details *</label>
                <textarea
                  name="fullDescription"
                  rows="5"
                  className={`form-control ${errorMessage.fullDescription ? "is-invalid" : ""}`}
                  placeholder="Detailed goals, impact metrics, implementation roadmap..."
                  value={data.fullDescription}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.fullDescription && <div className="invalid-feedback">{errorMessage.fullDescription}</div>}
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveSwitch">
                    Publish immediately (Active)
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/project" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
