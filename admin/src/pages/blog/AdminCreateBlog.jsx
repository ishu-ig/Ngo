import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBlog } from "../../Redux/ActionCreators/BlogActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const BLOG_CATEGORIES = [
  "News",
  "Stories",
  "Updates",
  "Events",
  "Press Release",
  "Articles",
  "Community",
];

export default function AdminCreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    category: "Stories",
    tags: "",
    shortDescription: "",
    content: "",
    publishedStatus: "published",
    isPublished: true,
  });

  const [featuredImage, setFeaturedImage] = useState(null);
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
      featuredImage: err,
    }));
    if (!err && file) {
      setFeaturedImage(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.title || !data.shortDescription || !data.content || !featuredImage) {
      alert("Please fill mandatory fields (Title, Short Description, Content, Featured Image).");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("shortDescription", data.shortDescription);
    formData.append("content", data.content);
    formData.append("publishedStatus", data.publishedStatus);
    formData.append("isPublished", data.isPublished);
    formData.append("author", localStorage.getItem("userid") || "");
    formData.append("featuredImage", featuredImage);

    if (data.tags) {
      const tagsArr = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
      tagsArr.forEach((tag) => formData.append("tags[]", tag));
    }

    dispatch(createBlog(formData));
    navigate("/blog");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-fill text-primary" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Publications</p>
              <h1 className="h3 mb-1">Write Article</h1>
              <p className="text-muted mb-0">Publish an article or field update to the website blog.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/blog">
              <i className="bi bi-arrow-left me-1"></i> Back to Blogs
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Article Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  placeholder="e.g. Bringing Solar Power to 50 Remote Himalayan Villages"
                  value={data.title}
                  onChange={getInputData}
                  required
                />
                {errorMessage.title && <div className="invalid-feedback">{errorMessage.title}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Category *</label>
                <select name="category" className="form-select" value={data.category} onChange={getInputData}>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Featured Thumbnail Image *</label>
                <input
                  type="file"
                  name="featuredImage"
                  className={`form-control ${errorMessage.featuredImage ? "is-invalid" : ""}`}
                  onChange={getInputFile}
                  required
                />
                {errorMessage.featuredImage && <div className="invalid-feedback">{errorMessage.featuredImage}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  placeholder="solar, rural, climate, 2026"
                  value={data.tags}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Short Summary / Excerpt *</label>
                <textarea
                  name="shortDescription"
                  rows="2"
                  className={`form-control ${errorMessage.shortDescription ? "is-invalid" : ""}`}
                  placeholder="Brief synopsis displayed on blog cards and search engines..."
                  value={data.shortDescription}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.shortDescription && <div className="invalid-feedback">{errorMessage.shortDescription}</div>}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Full Blog Content (Markdown / Text) *</label>
                <textarea
                  name="content"
                  rows="8"
                  className={`form-control ${errorMessage.content ? "is-invalid" : ""}`}
                  placeholder="Write the full story, impact quotes, and photo narratives..."
                  value={data.content}
                  onChange={getInputData}
                  required
                ></textarea>
                {errorMessage.content && <div className="invalid-feedback">{errorMessage.content}</div>}
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Publish Status</label>
                <select name="publishedStatus" className="form-select text-capitalize" value={data.publishedStatus} onChange={getInputData}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="col-12 col-md-8 d-flex align-items-center mt-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isPubSwitch"
                    name="isPublished"
                    checked={data.isPublished}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isPubSwitch">
                    Publish immediately (Visible to website visitors)
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/blog" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Publish Article
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}