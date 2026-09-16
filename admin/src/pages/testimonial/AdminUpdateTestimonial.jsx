import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

export default function AdminUpdateTestimonial() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  const [data, setData] = useState({
    name: "",
    designation: "Beneficiary",
    testimonialContent: "",
    rating: 5,
    isActive: true,
  });

  const [existingImage, setExistingImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getTestimonial());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(TestimonialStateData)
      ? TestimonialStateData
      : TestimonialStateData?.data || [];
    const item = list.find((t) => t._id === _id);
    if (item) {
      setData({
        name: item.name || "",
        designation: item.designation || "Beneficiary",
        testimonialContent: item.testimonialContent || "",
        rating: item.rating || 5,
        isActive: Boolean(item.isActive),
      });
      setExistingImage(item.profileImage || "");
    }
  }, [TestimonialStateData, _id]);

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
    formData.append("testimonialContent", data.testimonialContent);
    formData.append("rating", data.rating);
    formData.append("isActive", data.isActive);
    if (profileImage) formData.append("profileImage", profileImage);

    dispatch(updateTestimonial(formData));
    navigate("/testimonial");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-info" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Impact Stories</p>
              <h1 className="h3 mb-1">Update Testimonial</h1>
              <p className="text-muted mb-0">Modify story, rating, or author details.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/testimonial">
              <i className="bi bi-arrow-left me-1"></i> Back to Testimonials
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Name *</label>
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
                <label className="form-label fw-semibold">Role / Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={data.designation}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Photo</label>
                {existingImage && (
                  <div className="mb-2">
                    <img src={existingImage} alt="Current" height={44} className="rounded-circle border" />
                  </div>
                )}
                <input type="file" name="profileImage" className="form-control" onChange={getInputFile} />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Rating</label>
                <select name="rating" className="form-select" value={data.rating} onChange={getInputData}>
                  <option value="5">★★★★★ (5 Stars)</option>
                  <option value="4">★★★★☆ (4 Stars)</option>
                  <option value="3">★★★☆☆ (3 Stars)</option>
                  <option value="2">★★☆☆☆ (2 Stars)</option>
                  <option value="1">★☆☆☆☆ (1 Star)</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Testimonial Story / Content *</label>
                <textarea
                  name="testimonialContent"
                  rows="4"
                  className="form-control"
                  value={data.testimonialContent}
                  onChange={getInputData}
                  required
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveTestimonialSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveTestimonialSwitchEdit">
                    Visible on Website
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/testimonial" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Update Testimonial
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}