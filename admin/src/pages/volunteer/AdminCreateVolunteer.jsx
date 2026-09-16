import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createVolunteer } from "../../Redux/ActionCreators/VolunteerActionCreators";
import formValidator from "../../FormValidators/formValidator";

const AVAILABILITY_OPTIONS = [
  "weekdays",
  "weekends",
  "flexible",
  "full-time",
  "part-time",
  "occasional",
];

const STATUS_OPTIONS = ["pending", "approved", "rejected", "in-review"];

export default function AdminCreateVolunteer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    occupation: "",
    skills: "",
    areasOfInterest: "",
    availability: "flexible",
    message: "",
    applicationStatus: "approved",
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

    if (!data.name || !data.email || !data.phone) {
      alert("Please fill mandatory volunteer fields (Name, Email, Phone).");
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth || null,
      address: data.address,
      city: data.city,
      state: data.state,
      occupation: data.occupation,
      skills: data.skills
        ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      areasOfInterest: data.areasOfInterest
        ? data.areasOfInterest.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      availability: data.availability,
      message: data.message,
      applicationStatus: data.applicationStatus,
      isActive: data.isActive,
    };

    dispatch(createVolunteer(payload));
    navigate("/volunteer");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-person-plus text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Community</p>
              <h1 className="h3 mb-1">Add Volunteer</h1>
              <p className="text-muted mb-0">Register a new community volunteer directly.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/volunteer">
              <i className="bi bi-arrow-left me-1"></i> Back to Volunteers
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Volunteer Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errorMessage.name ? "is-invalid" : ""}`}
                  placeholder="Ananya Sharma"
                  value={data.name}
                  onChange={getInputData}
                  required
                />
                {errorMessage.name && <div className="invalid-feedback">{errorMessage.name}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errorMessage.email ? "is-invalid" : ""}`}
                  placeholder="ananya@example.com"
                  value={data.email}
                  onChange={getInputData}
                  required
                />
                {errorMessage.email && <div className="invalid-feedback">{errorMessage.email}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${errorMessage.phone ? "is-invalid" : ""}`}
                  placeholder="+91 9876543210"
                  value={data.phone}
                  onChange={getInputData}
                  required
                />
                {errorMessage.phone && <div className="invalid-feedback">{errorMessage.phone}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={data.dateOfBirth}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  className="form-control"
                  placeholder="e.g. Student, Doctor, Teacher"
                  value={data.occupation}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Availability</label>
                <select name="availability" className="form-select text-capitalize" value={data.availability} onChange={getInputData}>
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  className="form-control"
                  placeholder="Teaching, First Aid, Content Writing, Driving"
                  value={data.skills}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Areas of Interest (comma-separated)</label>
                <input
                  type="text"
                  name="areasOfInterest"
                  className="form-control"
                  placeholder="Child Welfare, Disaster Relief, Tree Plantation"
                  value={data.areasOfInterest}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Mumbai"
                  value={data.city}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="Maharashtra"
                  value={data.state}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Street Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Flat 101, Green Heights"
                  value={data.address}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Application Status</label>
                <select name="applicationStatus" className="form-select text-capitalize" value={data.applicationStatus} onChange={getInputData}>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Motivation / Message</label>
                <textarea
                  name="message"
                  rows="3"
                  className="form-control"
                  placeholder="Why do they want to volunteer with this NGO?"
                  value={data.message}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/volunteer" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-info text-white px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Volunteer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
