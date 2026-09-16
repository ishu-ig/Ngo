import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getVolunteer,
  deleteVolunteer,
  updateVolunteer,
} from "../../Redux/ActionCreators/VolunteerActionCreators";

export default function AdminVolunteer() {
  const VolunteerStateData = useSelector((state) => state.VolunteerStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this volunteer application?")) {
      dispatch(deleteVolunteer({ _id }));
    }
  }

  function changeStatus(item, newStatus) {
    dispatch(
      updateVolunteer({
        _id: item._id,
        applicationStatus: newStatus,
      })
    );
  }

  useEffect(() => {
    dispatch(getVolunteer());
  }, [dispatch]);

  const volunteers = Array.isArray(VolunteerStateData)
    ? VolunteerStateData
    : VolunteerStateData?.data || [];

  const filteredData = volunteers.filter(
    (v) =>
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase()) ||
      v.city?.toLowerCase().includes(search.toLowerCase()) ||
      v.occupation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-people-fill text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Community</p>
              <h1 className="h3 mb-1">Volunteers</h1>
              <p className="text-muted mb-0">Review volunteer signups, approve applications, and assign roles.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/volunteer/create">
              <i className="bi bi-person-plus me-1" aria-hidden="true"></i> Add Volunteer
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Volunteer Applications</span>
              </h2>
              <p className="text-muted mb-0">Manage applicant availability, skills, and statuses.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by name, email, city..."
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
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Occupation</th>
                  <th>Availability</th>
                  <th>Application Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                        {item.skills && item.skills.length > 0 && (
                          <div className="small text-muted text-truncate d-inline-block" style={{ maxWidth: 160 }}>
                            {item.skills.join(", ")}
                          </div>
                        )}
                      </td>
                      <td>
                        <div>{item.email}</div>
                        <small className="text-muted">{item.phone}</small>
                      </td>
                      <td>{[item.city, item.state].filter(Boolean).join(", ") || "—"}</td>
                      <td>{item.occupation || "—"}</td>
                      <td>
                        <span className="badge text-bg-light border text-capitalize">{item.availability || "flexible"}</span>
                      </td>
                      <td>
                        <select
                          className={`form-select form-select-sm fw-semibold text-capitalize ${
                            item.applicationStatus === "approved"
                              ? "text-success border-success"
                              : item.applicationStatus === "pending"
                              ? "text-warning border-warning"
                              : item.applicationStatus === "in-review"
                              ? "text-info border-info"
                              : "text-danger border-danger"
                          }`}
                          style={{ width: "auto" }}
                          value={item.applicationStatus || "pending"}
                          onChange={(e) => changeStatus(item, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-review">In-Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/volunteer/view/${item._id}`} className="btn btn-outline-info" title="View">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link to={`/volunteer/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                    <td colSpan="8" className="text-center text-muted py-4">
                      {search ? `No volunteers found matching "${search}"` : "No volunteer applications yet."}
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
