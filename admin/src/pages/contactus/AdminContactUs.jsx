import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactUs,
  deleteContactUs,
  updateContactUs,
} from "../../Redux/ActionCreators/ContactUsActionCreators";

export default function AdminContactUs() {
  const ContactUsStateData = useSelector((state) => state.ContactUsStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteContactUs({ _id }));
    }
  }

  function changeStatus(item, status) {
    dispatch(updateContactUs({ _id: item._id, status }));
  }

  useEffect(() => {
    dispatch(getContactUs());
  }, [dispatch]);

  const messages = Array.isArray(ContactUsStateData)
    ? ContactUsStateData
    : ContactUsStateData?.data || [];

  const filteredData = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-envelope-fill text-danger" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Inquiries</p>
              <h1 className="h3 mb-1">Contact Messages</h1>
              <p className="text-muted mb-0">Messages, questions, and collaboration inquiries from the contact form.</p>
            </div>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Message Inbox</span>
              </h2>
              <p className="text-muted mb-0">Review incoming queries and send replies.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search sender, subject..."
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
                  <th>Sender</th>
                  <th>Contact</th>
                  <th>Subject</th>
                  <th>Message Preview</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item._id || index} className={item.status === "unread" ? "table-light fw-medium" : ""}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                      </td>
                      <td>
                        <div>{item.email}</div>
                        <small className="text-muted">{item.phone}</small>
                      </td>
                      <td>
                        <div className="text-truncate d-inline-block" style={{ maxWidth: 160 }}>
                          {item.subject || "No Subject"}
                        </div>
                      </td>
                      <td>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 220 }}>
                          {item.message}
                        </small>
                      </td>
                      <td>
                        <small className="text-muted">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
                        </small>
                      </td>
                      <td>
                        <select
                          className={`form-select form-select-sm text-capitalize ${
                            item.status === "unread"
                              ? "text-danger fw-bold border-danger"
                              : item.status === "replied"
                              ? "text-success border-success"
                              : "text-secondary"
                          }`}
                          style={{ width: "auto" }}
                          value={item.status || "unread"}
                          onChange={(e) => changeStatus(item, e.target.value)}
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/contactus/view/${item._id}`} className="btn btn-outline-primary" title="Open Message">
                            <i className="bi bi-envelope-open"></i>
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
                      {search ? `No messages found matching "${search}"` : "Inbox is empty."}
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