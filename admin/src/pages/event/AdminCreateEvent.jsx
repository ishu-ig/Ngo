import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/ActionCreators/EventActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const STATUS_OPTIONS = ["upcoming", "ongoing", "completed", "cancelled", "postponed"];

export default function AdminCreateEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    eventDate: new Date().toISOString().split("T")[0],
    startTime: "10:00 AM",
    endTime: "04:00 PM",
    venue: "",
    location: "",
    organizer: "",
    registrationRequired: false,
    registrationDeadline: "",
    maxParticipants: "",
    status: "upcoming",
    description: "",
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

    if (!data.title || !data.eventDate || !data.startTime || !data.venue || !data.description || !featuredImage) {
      alert("Please fill all mandatory fields (Title, Date, Start Time, Venue, Description, Image).");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("eventDate", data.eventDate);
    formData.append("startTime", data.startTime);
    if (data.endTime) formData.append("endTime", data.endTime);
    formData.append("venue", data.venue);
    formData.append("location", data.location);
    formData.append("organizer", data.organizer);
    formData.append("registrationRequired", data.registrationRequired);
    if (data.registrationDeadline) formData.append("registrationDeadline", data.registrationDeadline);
    if (data.maxParticipants) formData.append("maxParticipants", data.maxParticipants);
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("isActive", data.isActive);
    formData.append("featuredImage", featuredImage);

    dispatch(createEvent(formData));
    navigate("/event");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-calendar-plus-fill text-warning" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Schedule</p>
              <h1 className="h3 mb-1">Create Event</h1>
              <p className="text-muted mb-0">Publish an upcoming workshop, drive, or gathering.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/event">
              <i className="bi bi-arrow-left me-1"></i> Back to Events
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  placeholder="e.g. Free Eye Health & Dental Checkup Camp"
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Organizer / Hosted By</label>
                <input
                  type="text"
                  name="organizer"
                  className="form-control"
                  placeholder="e.g. Health Committee"
                  value={data.organizer}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Event Date *</label>
                <input
                  type="date"
                  name="eventDate"
                  className="form-control"
                  value={data.eventDate}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Start Time *</label>
                <input
                  type="text"
                  name="startTime"
                  className="form-control"
                  placeholder="10:00 AM"
                  value={data.startTime}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">End Time</label>
                <input
                  type="text"
                  name="endTime"
                  className="form-control"
                  placeholder="04:00 PM"
                  value={data.endTime}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Venue *</label>
                <input
                  type="text"
                  name="venue"
                  className={`form-control ${errorMessage.venue ? "is-invalid" : ""}`}
                  placeholder="Community Hall, Sector 12"
                  value={data.venue}
                  onChange={getInputData}
                  required
                />
                {errorMessage.venue && <div className="invalid-feedback">{errorMessage.venue}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">City / Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="New Delhi"
                  value={data.location}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Status</label>
                <select name="status" className="form-select text-capitalize" value={data.status} onChange={getInputData}>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Max Participants (Capacity)</label>
                <input
                  type="number"
                  name="maxParticipants"
                  className="form-control"
                  placeholder="e.g. 200"
                  value={data.maxParticipants}
                  onChange={getInputData}
                  min="1"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Registration Deadline</label>
                <input
                  type="date"
                  name="registrationDeadline"
                  className="form-control"
                  value={data.registrationDeadline}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Featured Poster / Image *</label>
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
                <label className="form-label fw-semibold">Event Description & Program Flow *</label>
                <textarea
                  name="description"
                  rows="4"
                  className={`form-control ${errorMessage.description ? "is-invalid" : ""}`}
                  placeholder="Schedule, speakers, requirements for participants..."
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
                    id="regReqSwitch"
                    name="registrationRequired"
                    checked={data.registrationRequired}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="regReqSwitch">
                    Registration Required
                  </label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveEvtSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveEvtSwitch">
                    Active / Visible to Public
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/event" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-warning px-4 fw-semibold">
                  <i className="bi bi-check2-circle me-1"></i> Publish Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
