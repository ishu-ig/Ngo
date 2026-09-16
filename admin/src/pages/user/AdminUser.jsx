import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  deleteUser,
  updateUser,
} from "../../Redux/ActionCreators/UserActionCreators";

export default function AdminUser() {
  const UserStateData = useSelector((state) => state.UserStateData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function deleteRecord(_id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser({ _id }));
    }
  }

  function toggleActive(item) {
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("isActive", !item.isActive);
    dispatch(updateUser(formData));
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const users = Array.isArray(UserStateData)
    ? UserStateData
    : UserStateData?.data || [];

  const filteredData = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-person-gear text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Access & Administration</p>
              <h1 className="h3 mb-1">Users & Staff</h1>
              <p className="text-muted mb-0">Manage system roles (Superadmin, Admin, Editor, Volunteer, Donor).</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-primary btn-sm" to="/user/create">
              <i className="bi bi-person-plus-fill me-1" aria-hidden="true"></i> Add User
            </Link>
          </div>
        </div>

        <section className="panel">
          <div className="panel-header flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-table me-2" aria-hidden="true"></i>
                <span>User Accounts</span>
              </h2>
              <p className="text-muted mb-0">Permissions, profile pictures, and login statuses.</p>
            </div>
            <div className="ms-auto" style={{ minWidth: 240 }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search users..."
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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
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
                          src={
                            item.profilePicture ||
                            "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.name || "User")
                          }
                          alt=""
                          className="rounded-circle shadow-sm"
                          style={{ width: 40, height: 40, objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src =
                              "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.name || "User");
                          }}
                        />
                      </td>
                      <td>
                        <div className="fw-semibold">{item.name}</div>
                      </td>
                      <td>
                        <span className="text-muted">@{item.username || "—"}</span>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone || "—"}</td>
                      <td>
                        <span
                          className={`badge text-capitalize ${
                            item.role === "superadmin" || item.role === "Super Admin"
                              ? "text-bg-danger"
                              : item.role === "admin" || item.role === "Admin"
                              ? "text-bg-primary"
                              : item.role === "editor"
                              ? "text-bg-info"
                              : item.role === "volunteer"
                              ? "text-bg-success"
                              : "text-bg-secondary"
                          }`}
                        >
                          {item.role || "Admin"}
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
                          <Link to={`/user/update/${item._id}`} className="btn btn-outline-primary" title="Edit">
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
                      {search ? `No users found matching "${search}"` : "No users found."}
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