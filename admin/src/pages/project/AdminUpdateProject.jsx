import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject, updateProject } from "../../Redux/ActionCreators/ProjectActionCreators";
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

export default function AdminUpdateProject() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ProjectStateData = useSelector((state) => state.ProjectStateData);

  const [data, setData] = useState({
    title: "",
    category: "Education",
    location: "",
    startDate: "",
    endDate: "",
    status: "ongoing",
    beneficiaryCount: 0,
    targetGroup: "",
    shortDescription: "",
    fullDescription: "",
    isActive: true,
  });

  const [existingImage, setExistingImage] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(ProjectStateData)
      ? ProjectStateData
      : ProjectStateData?.data || [];
    const item = list.find((p) => p._id === _id);
    if (item) {
      setData({
        title: item.title || "",
        category: item.category || "Education",
        location: item.location || "",
        startDate: item.startDate ? item.startDate.split("T")[0] : "",
        endDate: item.endDate ? item.endDate.split("T")[0] : "",
        status: item.status || "ongoing",
        beneficiaryCount: item.beneficiaries?.count || 0,
        targetGroup: item.beneficiaries?.targetGroup || "",
        shortDescription: item.shortDescription || "",
        fullDescription: item.fullDescription || "",
        isActive: Boolean(item.isActive),
      });
      setExistingImage(item.featuredImage || "");
    }
  }, [ProjectStateData, _id]);

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

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("location", data.location);
    if (data.startDate) formData.append("startDate", data.startDate);
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
    if (featuredImage) formData.append("featuredImage", featuredImage);

    dispatch(updateProject(formData));
    navigate("/project");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Programs</p>
              <h1 className="h3 mb-1">Update Project</h1>
              <p className="text-muted mb-0">Modify program scope, progress, or beneficiaries.</p>
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
                  value={data.targetGroup}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Featured Image</label>
                {existingImage && (
                  <div className="mb-2">
                    <img src={existingImage} alt="Current" height={50} className="rounded border" />
                  </div>
                )}
                <input type="file" name="featuredImage" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Short Summary *</label>
                <textarea
                  name="shortDescription"
                  rows="2"
                  className="form-control"
                  value={data.shortDescription}
                  onChange={getInputData}
                  required
                ></textarea>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Full Project Details *</label>
                <textarea
                  name="fullDescription"
                  rows="5"
                  className="form-control"
                  value={data.fullDescription}
                  onChange={getInputData}
                  required
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveSwitchEdit">
                    Project is Active
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/project" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Update Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
