import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFAQ, updateFAQ } from "../../Redux/ActionCreators/FAQActionCreators";
import formValidator from "../../FormValidators/formValidator";

const FAQ_CATEGORIES = [
  "General",
  "Donations",
  "Volunteering",
  "Tax Benefits",
  "Programs",
];

export default function AdminUpdateFAQ() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FAQStateData = useSelector((state) => state.FAQStateData);

  const [data, setData] = useState({
    question: "",
    answer: "",
    category: "General",
    isActive: true,
  });

  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(FAQStateData)
      ? FAQStateData
      : FAQStateData?.data || [];
    const item = list.find((f) => f._id === _id);
    if (item) {
      setData({
        question: item.question || "",
        answer: item.answer || "",
        category: item.category || "General",
        isActive: Boolean(item.isActive),
      });
    }
  }, [FAQStateData, _id]);

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

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    dispatch(updateFAQ({ _id, ...data }));
    navigate("/faq");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-warning" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Help & FAQ</p>
              <h1 className="h3 mb-1">Update FAQ</h1>
              <p className="text-muted mb-0">Modify question, answer, or category.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/faq">
              <i className="bi bi-arrow-left me-1"></i> Back to FAQs
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <label className="form-label fw-semibold">Question *</label>
                <input
                  type="text"
                  name="question"
                  className={`form-control ${errorMessage.question ? "is-invalid" : ""}`}
                  value={data.question}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-semibold">Category *</label>
                <select name="category" className="form-select" value={data.category} onChange={getInputData}>
                  {FAQ_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Answer *</label>
                <textarea
                  name="answer"
                  rows="5"
                  className="form-control"
                  value={data.answer}
                  onChange={getInputData}
                  required
                ></textarea>
              </div>

              <div className="col-12 d-flex align-items-center mt-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveFaqSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveFaqSwitchEdit">
                    Display on Website
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/faq" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Update FAQ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
