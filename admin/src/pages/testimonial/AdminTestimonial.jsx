import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "../../Redux/ActionCreators/TestimonialActionCreators";

export default function AdminTestimonial() {
  const TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      dispatch(deleteTestimonial({ _id }));
    }
  }

  function toggleActive(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updateTestimonial(formData));
  }

  useEffect(() => {
    dispatch(getTestimonial());
  }, [dispatch]);

  const testimonials = Array.isArray(TestimonialStateData)
    ? TestimonialStateData
    : TestimonialStateData?.data || [];

  const filteredData = testimonials.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.designation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-chat-quote-fill text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Beneficiary Voices</p>
              <h1 className="h3 mb-1">Testimonials</h1>
              <p className="text-muted mb-0">Feedback from beneficiaries, donors, and partners.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/testimonial/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Add Testimonial
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Testimonial List</span>
              </h2>
              <p className="text-muted mb-0">Community reviews and beneficiary impact stories.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search testimonials..."
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
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Role / Designation</th>
                  <th>Testimonial Story</th>
                  <th>Rating</th>
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
                        <img
                          src={item.profileImage || "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.name || "Beneficiary")}
                          alt=""
                          className="rounded-circle shadow-sm"
                          style={{ width: 44, height: 44, objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.name || "Beneficiary");
                          }}
                        />
                      </td>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{item.designation || "Beneficiary"}</span>
                      </td>
                      <td>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 260 }}>
                          "{item.testimonialContent}"
                        </small>
                      </td>
                      <td>
                        <span className="text-warning">
                          {"★".repeat(item.rating || 5)}
                          <span className="text-muted small ms-1">({item.rating || 5})</span>
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
                          <Link to={`/testimonial/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                      {search ? `No testimonials found matching "${search}"` : "No testimonials created yet."}
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
