import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvent,
  deleteEvent,
  updateEvent,
} from "../../Redux/ActionCreators/EventActionCreators";

export default function AdminEvent() {
  const EventStateData = useSelector((state) => state.EventStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent({ _id }));
    }
  }

  function toggleActive(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updateEvent(formData));
  }

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const events = Array.isArray(EventStateData)
    ? EventStateData
    : EventStateData?.data || [];

  const filteredData = events.filter(
    (e) =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.venue?.toLowerCase().includes(search.toLowerCase()) ||
      e.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-calendar-event-fill text-warning" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Community Gatherings</p>
              <h1 className="h3 mb-1">Events</h1>
              <p className="text-muted mb-0">Manage awareness camps, fundraisers, seminars, and drives.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/event/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add Event
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Events Schedule</span>
              </h2>
              <p className="text-muted mb-0">Upcoming, ongoing, and past NGO events.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date & Time</th>
                  <th>Venue</th>
                  <th>Registrations</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>
                      <td>
                        {item.featuredImage ? (
                          <img
                            src={item.featuredImage}
                            alt=""
                            className="rounded shadow-sm"
                            style={{ width: 60, height: 40, objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className="rounded bg-light d-flex align-items-center justify-content-center text-muted"
                            style={{ width: 60, height: 40 }}
                          >
                            <i className="bi bi-image"></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="fw-semibold">{item.title}</div>
                        {item.organizer && <small className="text-muted">By: {item.organizer}</small>}
                      </td>
                      <td>
                        <div className="fw-semibold">
                          {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : "—"}
                        </div>
                        <small className="text-muted">
                          {item.startTime || ""} {item.endTime ? `– ${item.endTime}` : ""}
                        </small>
                      </td>
                      <td>
                        <div>{item.venue}</div>
                        {item.location && <small className="text-muted">{item.location}</small>}
                      </td>
                      <td>
                        {item.registrationRequired ? (
                          <span>
                            <strong>{item.registeredCount || 0}</strong>
                            {item.maxParticipants ? ` / ${item.maxParticipants}` : " registered"}
                          </span>
                        ) : (
                          <span className="text-muted small">Open entry</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge text-capitalize ${
                            item.status === "upcoming"
                              ? "text-bg-warning"
                              : item.status === "ongoing"
                              ? "text-bg-success"
                              : item.status === "completed"
                              ? "text-bg-primary"
                              : "text-bg-secondary"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={Boolean(item.isActive)}
                            onChange={() => toggleActive(item)}
                          />
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/event/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          {localStorage.getItem("role") === "Super Admin" || localStorage.getItem("role") === "superadmin" ? (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteRecord(item._id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-4">
                      {search ? `No events found matching "${search}"` : "No events scheduled yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
