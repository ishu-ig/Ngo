import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFAQ,
  deleteFAQ,
  updateFAQ,
} from "../../Redux/ActionCreators/FAQActionCreators";

export default function AdminFAQ() {
  const FAQStateData = useSelector((state) => state.FAQStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      dispatch(deleteFAQ({ _id }));
    }
  }

  function toggleActive(item) {
    dispatch(
      updateFAQ({
        _id: item._id,
        isActive: !item.isActive,
      })
    );
  }

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  const faqs = Array.isArray(FAQStateData)
    ? FAQStateData
    : FAQStateData?.data || [];

  const filteredData = faqs.filter(
    (f) =>
      f.question?.toLowerCase().includes(search.toLowerCase()) ||
      f.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-question-circle-fill text-warning" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Help & Information</p>
              <h1 className="h3 mb-1">Frequently Asked Questions</h1>
              <p className="text-muted mb-0">Help donors, volunteers, and visitors with common queries & tax guidance.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/faq/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add FAQ
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>FAQ Directory</span>
              </h2>
              <p className="text-muted mb-0">Organize answers by category and sequence.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search questions..."
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
                  <th>Category</th>
                  <th>Question</th>
                  <th>Answer</th>
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
                        <span className="badge text-bg-light border">{item.category || "General"}</span>
                      </td>
                      <td>
                        <div className="fw-semibold">{item.question}</div>
                      </td>
                      <td>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 300 }}>
                          {item.answer}
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
                          <Link to={`/faq/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                    <td colSpan="6" className="text-center text-muted py-4">
                      {search ? `No FAQs found matching "${search}"` : "No FAQs added yet."}
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
