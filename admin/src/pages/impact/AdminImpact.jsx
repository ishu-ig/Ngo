import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getImpact,
  deleteImpact,
  updateImpact,
} from "../../Redux/ActionCreators/ImpactActionCreators";

export default function AdminImpact() {
  const ImpactStateData = useSelector((state) => state.ImpactStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this impact metric?")) {
      dispatch(deleteImpact({ _id }));
    }
  }

  function toggleActive(item) {
    dispatch(
      updateImpact({
        _id: item._id,
        isActive: !item.isActive,
      })
    );
  }

  useEffect(() => {
    dispatch(getImpact());
  }, [dispatch]);

  const impacts = Array.isArray(ImpactStateData)
    ? ImpactStateData
    : ImpactStateData?.data || [];

  const filteredData = impacts.filter(
    (i) =>
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.value?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-graph-up-arrow text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Numbers & Proof</p>
              <h1 className="h3 mb-1">Impact Metrics</h1>
              <p className="text-muted mb-0">High-level statistics shown on the website home page (e.g. 50,000+ Meals Served).</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/impact/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add Impact Metric
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Key Statistics & Metrics</span>
              </h2>
              <p className="text-muted mb-0">Organize counter metrics, icons, and highlights.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search metrics..."
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
                  <th>Icon</th>
                  <th>Metric Value</th>
                  <th>Title</th>
                  <th>Description</th>
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
                        <div
                          className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
                          style={{ width: 40, height: 40, fontSize: 18 }}
                        >
                          <i className={`bi bi-${item.icon || "heart-fill"}`}></i>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-success fs-5">{item.value}</div>
                      </td>
                      <td>
                        <div className="fw-semibold">{item.title}</div>
                      </td>
                      <td>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 260 }}>
                          {item.description || "—"}
                        </small>
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
                          <Link to={`/impact/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                    <td colSpan="7" className="text-center text-muted py-4">
                      {search ? `No impact metrics found matching "${search}"` : "No impact metrics created yet."}
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
