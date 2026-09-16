import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../Redux/ActionCreators/UserActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const USER_ROLES = ["superadmin", "admin", "editor", "volunteer", "donor"];

export default function AdminCreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "admin",
    isActive: true,
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  function getInputData(e) {
    const { name, value, type, checked } = e.target;
    setErrorMessage((prev) => ({
      ...prev,
      [name]: formValidator(e),
    }));
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function getInputFile(e) {
    const file = e.target.files[0];
    const err = imageValidator(e);
    setErrorMessage((prev) => ({
      ...prev,
      profilePicture: err,
    }));
    if (!err && file) {
      setProfilePicture(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.name || !data.username || !data.email || !data.password) {
      alert("Please fill mandatory fields (Name, Username, Email, Password).");
      return;
    }

    if (data.password !== data.cpassword) {
      alert("Password and Confirmation Password do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("isActive", data.isActive);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    dispatch(createUser(formData));
    navigate("/user");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-person-plus-fill text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Access Control</p>
              <h1 className="h3 mb-1">Add User Account</h1>
              <p className="text-muted mb-0">Create administrative or staff user credentials.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/user">
              <i className="bi bi-arrow-left me-1"></i> Back to Users
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errorMessage.name ? "is-invalid" : ""}`}
                  placeholder="e.g. Ramesh Chandra"
                  value={data.name}
                  onChange={getInputData}
                  required
                />
                {errorMessage.name && <div className="invalid-feedback">{errorMessage.name}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Username *</label>
                <input
                  type="text"
                  name="username"
                  className={`form-control ${errorMessage.username ? "is-invalid" : ""}`}
                  placeholder="rchandra"
                  value={data.username}
                  onChange={getInputData}
                  required
                />
                {errorMessage.username && <div className="invalid-feedback">{errorMessage.username}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errorMessage.email ? "is-invalid" : ""}`}
                  placeholder="ramesh@ngo.org"
                  value={data.email}
                  onChange={getInputData}
                  required
                />
                {errorMessage.email && <div className="invalid-feedback">{errorMessage.email}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="+91 9876543210"
                  value={data.phone}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Role *</label>
                <select name="role" className="form-select text-capitalize" value={data.role} onChange={getInputData}>
                  {USER_ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Profile Avatar</label>
                <input type="file" name="profilePicture" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Password *</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errorMessage.password ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  value={data.password}
                  onChange={getInputData}
                  required
                />
                {errorMessage.password && <div className="invalid-feedback">{errorMessage.password}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Confirm Password *</label>
                <input
                  type="password"
                  name="cpassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={data.cpassword}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveUserSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveUserSwitch">
                    Account is Active
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/user" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}