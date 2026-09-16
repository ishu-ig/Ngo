import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProject,
  deleteProject,
  updateProject,
} from "../../Redux/ActionCreators/ProjectActionCreators";

export default function AdminProject() {
  const ProjectStateData = useSelector((state) => state.ProjectStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject({ _id }));
    }
  }

  function toggleStatus(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updateProject(formData));
  }

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const projects = Array.isArray(ProjectStateData)
    ? ProjectStateData
    : ProjectStateData?.data || [];

  const filteredData = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-folder2-open text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Programs & Initiatives</p>
              <h1 className="h3 mb-1">Projects</h1>
              <p className="text-muted mb-0">Manage community initiatives, programs, and field work.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/project/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add Project
            </Link>
          </div>
        </div>

        {/* Metric Summary */}
        <section className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-primary">
              <div className="metric-top">
                <span className="metric-label">Total Projects</span>
                <span className="metric-icon"><i className="bi bi-folder-fill"></i></span>
              </div>
              <div className="metric-value">{projects.length}</div>
              <div className="metric-meta"><span>all programs</span></div>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-success">
              <div className="metric-top">
                <span className="metric-label">Ongoing</span>
                <span className="metric-icon"><i className="bi bi-arrow-repeat"></i></span>
              </div>
              <div className="metric-value">
                {projects.filter((p) => p.status === "ongoing").length}
              </div>
              <div className="metric-meta"><span>active in the field</span></div>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-warning">
              <div className="metric-top">
                <span className="metric-label">Completed</span>
                <span className="metric-icon"><i className="bi bi-check-circle-fill"></i></span>
              </div>
              <div className="metric-value">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="metric-meta"><span>successful missions</span></div>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <article className="metric-card metric-danger">
              <div className="metric-top">
                <span className="metric-label">Total Beneficiaries</span>
                <span className="metric-icon"><i className="bi bi-people-fill"></i></span>
              </div>
              <div className="metric-value">
                {projects
                  .reduce((sum, p) => sum + (Number(p.beneficiaries?.count) || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="metric-meta"><span>people reached</span></div>
            </article>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Project List</span>
              </h2>
              <p className="text-muted mb-0">Search, edit, and update field programs.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search projects..."
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
                  <th>Category</th>
                  <th>Location</th>
                  <th>Beneficiaries</th>
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
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 220 }}>
                          {item.shortDescription}
                        </small>
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{item.category}</span>
                      </td>
                      <td>{item.location || "—"}</td>
                      <td>
                        <strong>{(item.beneficiaries?.count || 0).toLocaleString()}</strong>
                        {item.beneficiaries?.targetGroup && (
                          <div className="small text-muted">{item.beneficiaries.targetGroup}</div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "ongoing"
                              ? "text-bg-success"
                              : item.status === "completed"
                              ? "text-bg-primary"
                              : item.status === "planned"
                              ? "text-bg-warning"
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
                            onChange={() => toggleStatus(item)}
                          />
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/project/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                      {search ? `No projects found matching "${search}"` : "No projects created yet."}
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
