import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTeam } from "../../Redux/ActionCreators/TeamActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

export default function AdminCreateTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    designation: "",
    shortBio: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    github: "",
    website: "",
    isActive: true,
  });

  const [profileImage, setProfileImage] = useState(null);
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
      profileImage: err,
    }));
    if (!err && file) {
      setProfileImage(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.name || !data.designation || !profileImage) {
      alert("Please fill mandatory fields (Name, Designation, and Profile Photo).");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("shortBio", data.shortBio);
    formData.append("isActive", data.isActive);
    formData.append("profileImage", profileImage);

    const socialLinks = {
      linkedin: data.linkedin,
      twitter: data.twitter,
      facebook: data.facebook,
      instagram: data.instagram,
      github: data.github,
      website: data.website,
    };
    formData.append("socialLinks", JSON.stringify(socialLinks));

    dispatch(createTeam(formData));
    navigate("/team");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-person-plus-fill text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Organization</p>
              <h1 className="h3 mb-1">Add Team Member</h1>
              <p className="text-muted mb-0">Add a new leadership or key staff member profile.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/team">
              <i className="bi bi-arrow-left me-1"></i> Back to Team
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Member Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errorMessage.name ? "is-invalid" : ""}`}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={data.name}
                  onChange={getInputData}
                  required
                />
                {errorMessage.name && <div className="invalid-feedback">{errorMessage.name}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Designation / Role *</label>
                <input
                  type="text"
                  name="designation"
                  className={`form-control ${errorMessage.designation ? "is-invalid" : ""}`}
                  placeholder="e.g. Executive Director, Head of Medical Operations"
                  value={data.designation}
                  onChange={getInputData}
                  required
                />
                {errorMessage.designation && <div className="invalid-feedback">{errorMessage.designation}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Profile Photo *</label>
                <input
                  type="file"
                  name="profileImage"
                  className={`form-control ${errorMessage.profileImage ? "is-invalid" : ""}`}
                  onChange={getInputFile}
                  required
                />
                {errorMessage.profileImage && <div className="invalid-feedback">{errorMessage.profileImage}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Short Bio</label>
                <textarea
                  name="shortBio"
                  rows="3"
                  className="form-control"
                  placeholder="Brief background, credentials, and achievements..."
                  value={data.shortBio}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <hr className="my-2" />
                <h6 className="fw-bold mb-3">Social & Professional Links</h6>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  className="form-control"
                  placeholder="https://linkedin.com/in/username"
                  value={data.linkedin}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Twitter / X URL</label>
                <input
                  type="url"
                  name="twitter"
                  className="form-control"
                  placeholder="https://twitter.com/username"
                  value={data.twitter}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Website / Portfolio</label>
                <input
                  type="url"
                  name="website"
                  className="form-control"
                  placeholder="https://personalwebsite.org"
                  value={data.website}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveTeamSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveTeamSwitch">
                    Visible on Website Team Page
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/team" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Team Member
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
