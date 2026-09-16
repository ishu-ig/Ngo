import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGallery,
  deleteGallery,
  updateGallery,
} from "../../Redux/ActionCreators/GalleryActionCreators";

export default function AdminGallery() {
  const GalleryStateData = useSelector((state) => state.GalleryStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      dispatch(deleteGallery({ _id }));
    }
  }

  function toggleActive(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updateGallery(formData));
  }

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  const gallery = Array.isArray(GalleryStateData)
    ? GalleryStateData
    : GalleryStateData?.data || [];

  const filteredData = gallery.filter(
    (g) =>
      g.title?.toLowerCase().includes(search.toLowerCase()) ||
      g.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-images text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Visual Media</p>
              <h1 className="h3 mb-1">Media Gallery</h1>
              <p className="text-muted mb-0">Photos and videos of field initiatives, events, and community distributions.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/gallery/create">
              <i className="bi bi-plus-circle me-1" aria-hidden="true"></i> Upload Media
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>Media Items</span>
              </h2>
              <p className="text-muted mb-0">Manage albums, categories, and linked projects.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search gallery..."
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
                  <th>Media</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Type</th>
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
                        {item.mediaType === "video" ? (
                          <div
                            className="rounded bg-dark text-white d-flex align-items-center justify-content-center"
                            style={{ width: 60, height: 40 }}
                          >
                            <i className="bi bi-play-circle-fill fs-5"></i>
                          </div>
                        ) : (
                          <img
                            src={item.mediaUrl}
                            alt=""
                            className="rounded shadow-sm"
                            style={{ width: 60, height: 40, objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td>
                        <div className="fw-semibold">{item.title}</div>
                        {item.description && (
                          <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 220 }}>
                            {item.description}
                          </small>
                        )}
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{item.category || "General"}</span>
                      </td>
                      <td>
                        <span className="badge text-bg-secondary text-uppercase" style={{ fontSize: 10 }}>
                          {item.mediaType || "image"}
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
                          <Link to={`/gallery/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                      {search ? `No media items found matching "${search}"` : "No media uploaded yet."}
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
