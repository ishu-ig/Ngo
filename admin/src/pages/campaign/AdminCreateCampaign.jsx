import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../Redux/ActionCreators/CampaignActionCreators";
import { getProject } from "../../Redux/ActionCreators/ProjectActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const STATUSES = ["upcoming", "active", "completed", "paused", "cancelled"];

export default function AdminCreateCampaign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ProjectStateData = useSelector((state) => state.ProjectStateData);

  const [data, setData] = useState({
    title: "",
    project: "",
    targetAmount: "",
    collectedAmount: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "active",
    description: "",
    featured: false,
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const projects = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : ProjectStateData?.data || [];

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
      image: err,
    }));
    if (!err && file) {
      setImage(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.title || !data.targetAmount || !data.startDate || !data.endDate || !data.description || !image) {
      alert("Please fill all mandatory fields (Title, Target Amount, Start Date, End Date, Description, Banner Image).");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    if (data.project) formData.append("project", data.project);
    formData.append("targetAmount", data.targetAmount);
    formData.append("collectedAmount", data.collectedAmount);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("featured", data.featured);
    formData.append("isActive", data.isActive);
    formData.append("image", image);

    dispatch(createCampaign(formData));
    navigate("/campaign");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-megaphone-fill text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Fundraising</p>
              <h1 className="h3 mb-1">Add Campaign</h1>
              <p className="text-muted mb-0">Create a fundraising drive or relief appeal.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/campaign">
              <i className="bi bi-arrow-left me-1"></i> Back to Campaigns
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Campaign Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  placeholder="e.g. Winter Clothes & Warm Blanket Drive"
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Linked Project (Optional)</label>
                <select name="project" className="form-select" value={data.project} onChange={getInputData}>
                  <option value="">-- None (Direct Fundraiser) --</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Target Amount (INR) *</label>
                <input
                  type="number"
                  name="targetAmount"
                  className={`form-control ${errorMessage.targetAmount ? "is-invalid" : ""}`}
                  placeholder="500000"
                  value={data.targetAmount}
                  onChange={getInputData}
                  min="1"
                  required
                />
                {errorMessage.targetAmount && <div className="invalid-feedback">{errorMessage.targetAmount}</div>}
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
                <label className="form-label fw-semibold">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={data.endDate}
                  onChange={getInputData}
                  required
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

              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Campaign Banner Image *</label>
                <input
                  type="file"
                  name="image"
                  className={`form-control ${errorMessage.image ? "is-invalid" : ""}`}
                  onChange={getInputFile}
                  required
                />
                {errorMessage.image && <div className="invalid-feedback">{errorMessage.image}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Campaign Story & Details *</label>
                <textarea
                  name="description"
                  rows="5"
                  className={`form-control ${errorMessage.description ? "is-invalid" : ""}`}
                  placeholder="Explain why this fundraiser is vital, how the funds will be utilized..."
                  value={data.description}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.description && <div className="invalid-feedback">{errorMessage.description}</div>}
              </div>

              <div className="col-12 col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="featuredSwitch"
                    name="featured"
                    checked={data.featured}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="featuredSwitch">
                    Highlight as Featured Campaign
                  </label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveCampSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveCampSwitch">
                    Active / Accept Donations
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/campaign" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-success px-4">
                  <i className="bi bi-check2-circle me-1"></i> Launch Campaign
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
