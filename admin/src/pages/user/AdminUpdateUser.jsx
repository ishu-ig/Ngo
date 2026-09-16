import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../Redux/ActionCreators/UserActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const USER_ROLES = ["superadmin", "admin", "editor", "volunteer", "donor"];

export default function AdminUpdateUser() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserStateData = useSelector((state) => state.UserStateData);

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "admin",
    isActive: true,
  });

  const [existingImage, setExistingImage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(UserStateData)
      ? UserStateData
      : UserStateData?.data || [];
    const item = list.find((u) => u._id === _id);
    if (item) {
      setData({
        name: item.name || "",
        username: item.username || "",
        email: item.email || "",
        phone: item.phone || "",
        role: item.role || "admin",
        isActive: Boolean(item.isActive),
      });
      setExistingImage(item.profilePicture || "");
    }
  }, [UserStateData, _id]);

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

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("isActive", data.isActive);
    if (profilePicture) formData.append("profilePicture", profilePicture);

    dispatch(updateUser(formData));
    navigate("/user");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-person-gear text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Access Control</p>
              <h1 className="h3 mb-1">Update User Account</h1>
              <p className="text-muted mb-0">Modify user profile, role assignments, or active status.</p>
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
                  value={data.name}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Username *</label>
                <input
                  type="text"
                  name="username"
                  className={`form-control ${errorMessage.username ? "is-invalid" : ""}`}
                  value={data.username}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errorMessage.email ? "is-invalid" : ""}`}
                  value={data.email}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
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
                {existingImage && (
                  <div className="mb-2">
                    <img src={existingImage} alt="Avatar" height={44} className="rounded-circle border" />
                  </div>
                )}
                <input type="file" name="profilePicture" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveUserSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveUserSwitchEdit">
                    Account is Active
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/user" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Update User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}