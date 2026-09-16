import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGallery } from "../../Redux/ActionCreators/GalleryActionCreators";
import { getProject } from "../../Redux/ActionCreators/ProjectActionCreators";
import { getEvent } from "../../Redux/ActionCreators/EventActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const GALLERY_CATEGORIES = [
  "Events",
  "Projects",
  "Campaigns",
  "Community",
  "Volunteers",
  "General",
];

export default function AdminCreateGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ProjectStateData = useSelector((state) => state.ProjectStateData);
  const EventStateData = useSelector((state) => state.EventStateData);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "General",
    mediaType: "image",
    project: "",
    event: "",
    isActive: true,
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getProject());
    dispatch(getEvent());
  }, [dispatch]);

  const projects = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : ProjectStateData?.data || [];

  const events = Array.isArray(EventStateData)
    ? EventStateData
    : EventStateData?.data || [];

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
      mediaUrl: err,
    }));
    if (!err && file) {
      setMediaFile(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.title || !mediaFile) {
      alert("Please provide Title and Media File.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("mediaType", data.mediaType);
    if (data.project) formData.append("project", data.project);
    if (data.event) formData.append("event", data.event);
    formData.append("isActive", data.isActive);
    formData.append("mediaUrl", mediaFile);

    dispatch(createGallery(formData));
    navigate("/gallery");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-cloud-arrow-up-fill text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Visual Media</p>
              <h1 className="h3 mb-1">Upload Media</h1>
              <p className="text-muted mb-0">Add a new photo or video to the public gallery.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/gallery">
              <i className="bi bi-arrow-left me-1"></i> Back to Gallery
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Media Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  placeholder="e.g. Free Meal Distribution Drive - Day 1"
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Category *</label>
                <select name="category" className="form-select" value={data.category} onChange={getInputData}>
                  {GALLERY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Media Type</label>
                <select name="mediaType" className="form-select text-capitalize" value={data.mediaType} onChange={getInputData}>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Linked Project (Optional)</label>
                <select name="project" className="form-select" value={data.project} onChange={getInputData}>
                  <option value="">-- None --</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Linked Event (Optional)</label>
                <select name="event" className="form-select" value={data.event} onChange={getInputData}>
                  <option value="">-- None --</option>
                  {events.map((ev) => (
                    <option key={ev._id} value={ev._id}>{ev.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Upload Media File *</label>
                <input
                  type="file"
                  name="mediaUrl"
                  className={`form-control ${errorMessage.mediaUrl ? "is-invalid" : ""}`}
                  onChange={getInputFile}
                  required
                />
                {errorMessage.mediaUrl && <div className="invalid-feedback">{errorMessage.mediaUrl}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Caption / Description</label>
                <textarea
                  name="description"
                  rows="2"
                  className="form-control"
                  placeholder="Short note about where/when this was captured..."
                  value={data.description}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveGalSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveGalSwitch">
                    Display on Public Website Gallery
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/gallery" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-info text-white px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Media
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
