import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeamMember, updateTeamMember } from "../../Redux/ActionCreators/TeamMemberActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

export default function AdminUpdateTeamMember() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const TeamMemberStateData = useSelector((state) => state.TeamMemberStateData);

  const [data, setData] = useState({
    name: "",
    designation: "",
    shortBio: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    github: "",
    website: "",
    isActive: true,
  });

  const [existingImage, setExistingImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getTeamMember());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(TeamMemberStateData)
      ? TeamMemberStateData
      : TeamMemberStateData?.data || [];
    const item = list.find((m) => m._id === _id);
    if (item) {
      setData({
        name: item.name || "",
        designation: item.designation || "",
        shortBio: item.shortBio || "",
        linkedin: item.socialLinks?.linkedin || "",
        twitter: item.socialLinks?.twitter || "",
        facebook: item.socialLinks?.facebook || "",
        instagram: item.socialLinks?.instagram || "",
        github: item.socialLinks?.github || "",
        website: item.socialLinks?.website || "",
        isActive: Boolean(item.isActive),
      });
      setExistingImage(item.profileImage || "");
    }
  }, [TeamMemberStateData, _id]);

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
      profileImage: err,
    }));
    if (!err && file) {
      setProfileImage(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("shortBio", data.shortBio);
    formData.append("isActive", data.isActive);
    if (profileImage) formData.append("profileImage", profileImage);

    const socialLinks = {
      linkedin: data.linkedin,
      twitter: data.twitter,
      facebook: data.facebook,
      instagram: data.instagram,
      github: data.github,
      website: data.website,
    };
    formData.append("socialLinks", JSON.stringify(socialLinks));

    dispatch(updateTeamMember(formData));
    navigate("/teammember");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Organization</p>
              <h1 className="h3 mb-1">Update Team Member</h1>
              <p className="text-muted mb-0">Modify profile, designation, or social links.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/teammember">
              <i className="bi bi-arrow-left me-1"></i> Back to Team
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Member Name *</label>
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
                <label className="form-label fw-semibold">Designation *</label>
                <input
                  type="text"
                  name="designation"
                  className={`form-control ${errorMessage.designation ? "is-invalid" : ""}`}
                  value={data.designation}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Profile Photo</label>
                {existingImage && (
                  <div className="mb-2">
                    <img src={existingImage} alt="Current" height={44} className="rounded-circle border" />
                  </div>
                )}
                <input type="file" name="profileImage" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Short Bio</label>
                <textarea
                  name="shortBio"
                  rows="3"
                  className="form-control"
                  value={data.shortBio}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <hr className="my-2" />
                <h6 className="fw-bold mb-3">Social & Professional Links</h6>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  className="form-control"
                  value={data.linkedin}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Twitter / X URL</label>
                <input
                  type="url"
                  name="twitter"
                  className="form-control"
                  value={data.twitter}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Website / Portfolio</label>
                <input
                  type="url"
                  name="website"
                  className="form-control"
                  value={data.website}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveTeamSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveTeamSwitchEdit">
                    Visible on Website
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/teammember" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Update Member
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
