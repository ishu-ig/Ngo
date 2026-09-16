import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaign,
  deleteCampaign,
  updateCampaign,
} from "../../Redux/ActionCreators/CampaignActionCreators";

export default function AdminCampaign() {
  const CampaignStateData = useSelector((state) => state.CampaignStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      dispatch(deleteCampaign({ _id }));
    }
  }

  function toggleActive(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updateCampaign(formData));
  }

  useEffect(() => {
    dispatch(getCampaign());
  }, [dispatch]);

  const campaigns = Array.isArray(CampaignStateData)
    ? CampaignStateData
    : CampaignStateData?.data || [];

  const filteredData = campaigns.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-megaphone-fill text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Fundraising</p>
              <h1 className="h3 mb-1">Campaigns</h1>
              <p className="text-muted mb-0">Manage donation drives, emergency relief, and goals.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/campaign/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add Campaign
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Campaign List</span>
              </h2>
              <p className="text-muted mb-0">Overview of fundraising progress and active drives.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search campaigns..."
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
                  <th>Banner</th>
                  <th>Title</th>
                  <th>Target Amount</th>
                  <th>Raised Amount</th>
                  <th>Progress</th>
                  <th>Timeline</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    const target = Number(item.targetAmount) || 1;
                    const raised = Number(item.collectedAmount) || 0;
                    const pct = Math.min(Math.round((raised / target) * 100), 100);

                    return (
                      <tr key={item._id || index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.image ? (
                            <img
                              src={item.image}
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
                          {item.featured && (
                            <span className="badge text-bg-warning py-0" style={{ fontSize: 10 }}>Featured</span>
                          )}
                        </td>
                        <td className="fw-bold">₹{target.toLocaleString("en-IN")}</td>
                        <td className="text-success fw-bold">₹{raised.toLocaleString("en-IN")}</td>
                        <td style={{ minWidth: 120 }}>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="flex-grow-1 bg-light rounded-pill border"
                              style={{ height: 8, overflow: "hidden" }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${pct}%`,
                                  background: pct >= 100 ? "#198754" : "#0d6efd",
                                }}
                              />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 600 }}>{pct}%</span>
                          </div>
                        </td>
                        <td>
                          <div className="small">
                            {item.startDate ? new Date(item.startDate).toLocaleDateString() : ""} –{" "}
                            {item.endDate ? new Date(item.endDate).toLocaleDateString() : ""}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge text-capitalize ${
                              item.status === "active"
                                ? "text-bg-success"
                                : item.status === "completed"
                                ? "text-bg-primary"
                                : item.status === "upcoming"
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
                              onChange={() => toggleActive(item)}
                            />
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <Link to={`/campaign/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center text-muted py-4">
                      {search ? `No campaigns found matching "${search}"` : "No fundraising campaigns created yet."}
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
