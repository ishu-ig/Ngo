import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartner,
  deletePartner,
  updatePartner,
} from "../../Redux/ActionCreators/PartnerActionCreators";

export default function AdminPartner() {
  const PartnerStateData = useSelector((state) => state.PartnerStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this partner organization?")) {
      dispatch(deletePartner({ _id }));
    }
  }

  function toggleActive(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updatePartner(formData));
  }

  useEffect(() => {
    dispatch(getPartner());
  }, [dispatch]);

  const partners = Array.isArray(PartnerStateData)
    ? PartnerStateData
    : PartnerStateData?.data || [];

  const filteredData = partners.filter(
    (p) =>
      p.organizationName?.toLowerCase().includes(search.toLowerCase()) ||
      p.partnerType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-building text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Collaborations</p>
              <h1 className="h3 mb-1">Partners & Sponsors</h1>
              <p className="text-muted mb-0">CSR corporate partners, institutional donors, and affiliate NGOs.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/partner/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add Partner
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Partner Directory</span>
              </h2>
              <p className="text-muted mb-0">Corporate, government, and academic alliances.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search partners..."
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
                  <th>Logo</th>
                  <th>Organization Name</th>
                  <th>Type</th>
                  <th>Contact Person</th>
                  <th>Website</th>
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
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt=""
                            className="rounded border p-1 bg-white"
                            style={{ width: 60, height: 40, objectFit: "contain" }}
                          />
                        ) : (
                          <div
                            className="rounded bg-light d-flex align-items-center justify-content-center text-muted"
                            style={{ width: 60, height: 40 }}
                          >
                            <i className="bi bi-building"></i>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="fw-semibold">{item.organizationName}</div>
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{item.partnerType || "Corporate"}</span>
                      </td>
                      <td>
                        <div>{item.contactPerson?.name || "—"}</div>
                        {item.contactPerson?.email && (
                          <small className="text-muted">{item.contactPerson.email}</small>
                        )}
                      </td>
                      <td>
                        {item.website ? (
                          <a href={item.website} target="_blank" rel="noreferrer" className="text-decoration-none small">
                            <i className="bi bi-box-arrow-up-right me-1"></i> Visit
                          </a>
                        ) : (
                          "—"
                        )}
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
                          <Link to={`/partner/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                      {search ? `No partners found matching "${search}"` : "No partner organizations added yet."}
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
