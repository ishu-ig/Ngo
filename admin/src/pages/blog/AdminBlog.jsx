import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlog,
  deleteBlog,
  updateBlog,
} from "../../Redux/ActionCreators/BlogActionCreators";

export default function AdminBlog() {
  const BlogStateData = useSelector((state) => state.BlogStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this blog article?")) {
      dispatch(deleteBlog({ _id }));
    }
  }

  function togglePublish(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isPublished", !item.isPublished);
    formData.append("publishedStatus", !item.isPublished ? "published" : "draft");
    dispatch(updateBlog(formData));
  }

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const blogs = Array.isArray(BlogStateData)
    ? BlogStateData
    : BlogStateData?.data || [];

  const filteredData = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-journal-richtext text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Publications</p>
              <h1 className="h3 mb-1">Blog & Stories</h1>
              <p className="text-muted mb-0">Publish field stories, press releases, newsletters, and announcements.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/blog/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Write Article
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Articles List</span>
              </h2>
              <p className="text-muted mb-0">Manage publishing status, authors, categories, and views.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search articles..."
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
                  <th>Author</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Published</th>
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
                        {item.slug && <small className="text-muted">/{item.slug}</small>}
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{item.category || "Stories"}</span>
                      </td>
                      <td>{item.author?.name || "Admin"}</td>
                      <td>
                        <i className="bi bi-eye text-muted me-1"></i>
                        {item.views || 0}
                      </td>
                      <td>
                        <small className="text-muted">
                          {item.publishedDate ? new Date(item.publishedDate).toLocaleDateString() : "—"}
                        </small>
                      </td>
                      <td>
                        <span
                          className={`badge text-capitalize ${
                            item.publishedStatus === "published" || item.isPublished
                              ? "text-bg-success"
                              : item.publishedStatus === "archived"
                              ? "text-bg-secondary"
                              : "text-bg-warning"
                          }`}
                        >
                          {item.publishedStatus || (item.isPublished ? "published" : "draft")}
                        </span>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={Boolean(item.isPublished)}
                            onChange={() => togglePublish(item)}
                          />
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link to={`/blog/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                    <td colSpan="10" className="text-center text-muted py-4">
                      {search ? `No articles found matching "${search}"` : "No blog posts published yet."}
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