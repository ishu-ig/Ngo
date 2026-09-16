import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, updateEvent } from "../../Redux/ActionCreators/EventActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const STATUS_OPTIONS = ["upcoming", "ongoing", "completed", "cancelled", "postponed"];

export default function AdminUpdateEvent() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const EventStateData = useSelector((state) => state.EventStateData);

  const [data, setData] = useState({
    title: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    location: "",
    organizer: "",
    registrationRequired: false,
    registrationDeadline: "",
    maxParticipants: "",
    registeredCount: 0,
    status: "upcoming",
    description: "",
    isActive: true,
  });

  const [existingImage, setExistingImage] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(EventStateData)
      ? EventStateData
      : EventStateData?.data || [];
    const item = list.find((e) => e._id === _id);
    if (item) {
      setData({
        title: item.title || "",
        eventDate: item.eventDate ? item.eventDate.split("T")[0] : "",
        startTime: item.startTime || "",
        endTime: item.endTime || "",
        venue: item.venue || "",
        location: item.location || "",
        organizer: item.organizer || "",
        registrationRequired: Boolean(item.registrationRequired),
        registrationDeadline: item.registrationDeadline
          ? item.registrationDeadline.split("T")[0]
          : "",
        maxParticipants: item.maxParticipants || "",
        registeredCount: item.registeredCount || 0,
        status: item.status || "upcoming",
        description: item.description || "",
        isActive: Boolean(item.isActive),
      });
      setExistingImage(item.featuredImage || "");
    }
  }, [EventStateData, _id]);

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
    if (data.eventDate) formData.append("eventDate", data.eventDate);
    formData.append("startTime", data.startTime);
    if (data.endTime) formData.append("endTime", data.endTime);
    formData.append("venue", data.venue);
    formData.append("location", data.location);
    formData.append("organizer", data.organizer);
    formData.append("registrationRequired", data.registrationRequired);
    if (data.registrationDeadline) formData.append("registrationDeadline", data.registrationDeadline);
    if (data.maxParticipants) formData.append("maxParticipants", data.maxParticipants);
    formData.append("registeredCount", data.registeredCount);
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("isActive", data.isActive);
    if (featuredImage) formData.append("featuredImage", featuredImage);

    dispatch(updateEvent(formData));
    navigate("/event");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-warning" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Schedule</p>
              <h1 className="h3 mb-1">Update Event</h1>
              <p className="text-muted mb-0">Modify event schedule, venue, capacity, or status.</p>
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
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  className="form-control"
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
                  value={data.endTime}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Venue *</label>
                <input
                  type="text"
                  name="venue"
                  className="form-control"
                  value={data.venue}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={data.location}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">Status</label>
                <select name="status" className="form-select text-capitalize" value={data.status} onChange={getInputData}>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">Max Participants</label>
                <input
                  type="number"
                  name="maxParticipants"
                  className="form-control"
                  value={data.maxParticipants}
                  onChange={getInputData}
                  min="1"
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">Registered Count</label>
                <input
                  type="number"
                  name="registeredCount"
                  className="form-control"
                  value={data.registeredCount}
                  onChange={getInputData}
                  min="0"
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label fw-semibold">Deadline</label>
                <input
                  type="date"
                  name="registrationDeadline"
                  className="form-control"
                  value={data.registrationDeadline}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Event Image / Poster</label>
                {existingImage && (
                  <div className="mb-2">
                    <img src={existingImage} alt="Poster" height={44} className="rounded border" />
                  </div>
                )}
                <input type="file" name="featuredImage" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Event Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  className="form-control"
                  value={data.description}
                  onChange={getInputData}
                  required
                ></textarea>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="regReqSwitchEdit"
                    name="registrationRequired"
                    checked={data.registrationRequired}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="regReqSwitchEdit">
                    Registration Required
                  </label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveEvtSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveEvtSwitchEdit">
                    Event is Active
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/event" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-warning px-4 fw-semibold">
                  <i className="bi bi-check2-circle me-1"></i> Update Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
