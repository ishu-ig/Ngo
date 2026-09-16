import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAbout } from "../../Redux/ActionCreators/AboutActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

export default function AdminCreateAbout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    ngoName: "",
    tagline: "",
    description: "",
    mission: "",
    vision: "",
    objectives: "",
    establishedYear: new Date().getFullYear(),
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [files, setFiles] = useState({
    logo: null,
    aboutImage: null,
  });

  const [errorMessage, setErrorMessage] = useState({});

  function getInputData(e) {
    const { name, value } = e.target;
    setErrorMessage((prev) => ({
      ...prev,
      [name]: formValidator(e),
    }));
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function getInputFile(e) {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    const err = imageValidator(e);
    setErrorMessage((prev) => ({
      ...prev,
      [name]: err,
    }));
    if (!err && file) {
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.ngoName || !data.description || !data.mission || !data.vision) {
      alert("Please fill all mandatory fields (NGO Name, Description, Mission, Vision).");
      return;
    }

    const formData = new FormData();
    formData.append("ngoName", data.ngoName);
    formData.append("tagline", data.tagline);
    formData.append("description", data.description);
    formData.append("mission", data.mission);
    formData.append("vision", data.vision);

    if (data.objectives) {
      const objectivesArr = data.objectives
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean);
      objectivesArr.forEach((obj) => formData.append("objectives[]", obj));
    }

    if (data.establishedYear) formData.append("establishedYear", data.establishedYear);
    formData.append("contactEmail", data.contactEmail);
    formData.append("contactPhone", data.contactPhone);

    const addressObj = {
      street: data.street,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
    };
    formData.append("address", JSON.stringify(addressObj));

    if (files.logo) formData.append("logo", files.logo);
    if (files.aboutImage) formData.append("aboutImage", files.aboutImage);

    dispatch(createAbout(formData));
    navigate("/about");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-info-circle-fill text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Organization</p>
              <h1 className="h3 mb-1">Create NGO Profile</h1>
              <p className="text-muted mb-0">Set up identity, mission, and background.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/about">
              <i className="bi bi-arrow-left me-1"></i> Back to About
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">NGO Name *</label>
                <input
                  type="text"
                  name="ngoName"
                  className={`form-control ${errorMessage.ngoName ? "is-invalid" : ""}`}
                  placeholder="e.g. Hope Foundation India"
                  value={data.ngoName}
                  onChange={getInputData}
                  required
                />
                {errorMessage.ngoName && <div className="invalid-feedback">{errorMessage.ngoName}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Tagline / Slogan</label>
                <input
                  type="text"
                  name="tagline"
                  className="form-control"
                  placeholder="e.g. Empowering communities, restoring lives."
                  value={data.tagline}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Established Year</label>
                <input
                  type="number"
                  name="establishedYear"
                  className="form-control"
                  value={data.establishedYear}
                  onChange={getInputData}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  className={`form-control ${errorMessage.contactEmail ? "is-invalid" : ""}`}
                  placeholder="contact@ngo.org"
                  value={data.contactEmail}
                  onChange={getInputData}
                />
                {errorMessage.contactEmail && <div className="invalid-feedback">{errorMessage.contactEmail}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  className="form-control"
                  placeholder="+91 9876543210"
                  value={data.contactPhone}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">NGO Logo</label>
                <input type="file" name="logo" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">About / Banner Image</label>
                <input type="file" name="aboutImage" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">About NGO Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  className={`form-control ${errorMessage.description ? "is-invalid" : ""}`}
                  placeholder="Comprehensive description of the NGO, its founding story, and purpose..."
                  value={data.description}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.description && <div className="invalid-feedback">{errorMessage.description}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Mission Statement *</label>
                <textarea
                  name="mission"
                  rows="3"
                  className={`form-control ${errorMessage.mission ? "is-invalid" : ""}`}
                  placeholder="What is the mission of this NGO?"
                  value={data.mission}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.mission && <div className="invalid-feedback">{errorMessage.mission}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Vision Statement *</label>
                <textarea
                  name="vision"
                  rows="3"
                  className={`form-control ${errorMessage.vision ? "is-invalid" : ""}`}
                  placeholder="What is the vision for the future?"
                  value={data.vision}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.vision && <div className="invalid-feedback">{errorMessage.vision}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Core Objectives (one per line)</label>
                <textarea
                  name="objectives"
                  rows="3"
                  className="form-control"
                  placeholder="Provide education to underprivileged children&#10;Promote sustainable healthcare in rural areas&#10;Empower women through vocational training"
                  value={data.objectives}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <hr className="my-2" />
                <h6 className="fw-bold mb-3">Registered Office Address</h6>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  placeholder="123 Social Welfare Lane"
                  value={data.street}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="New Delhi"
                  value={data.city}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="Delhi"
                  value={data.state}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={data.country}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  placeholder="110001"
                  value={data.pincode}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/about" className="btn btn-outline-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}