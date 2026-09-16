import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getImpact, updateImpact } from "../../Redux/ActionCreators/ImpactActionCreators";
import formValidator from "../../FormValidators/formValidator";

const COMMON_ICONS = [
  { label: "Heart (Care / Relief)", value: "heart-fill" },
  { label: "People (Community / Beneficiaries)", value: "people-fill" },
  { label: "Mortarboard (Education / Schools)", value: "mortarboard-fill" },
  { label: "Tree (Environment / Green)", value: "tree-fill" },
  { label: "House (Shelter / Infrastructure)", value: "house-heart-fill" },
  { label: "Cup / Food (Nutrition / Meals)", value: "cup-hot-fill" },
  { label: "Award (Achievements)", value: "trophy-fill" },
  { label: "Globe (Nationwide / Outreach)", value: "globe-central-south-asia" },
];

export default function AdminUpdateImpact() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ImpactStateData = useSelector((state) => state.ImpactStateData);

  const [data, setData] = useState({
    title: "",
    value: "",
    description: "",
    icon: "heart-fill",
    isActive: true,
  });

  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    dispatch(getImpact());
  }, [dispatch]);

  useEffect(() => {
    const list = Array.isArray(ImpactStateData)
      ? ImpactStateData
      : ImpactStateData?.data || [];
    const item = list.find((i) => i._id === _id);
    if (item) {
      setData({
        title: item.title || "",
        value: item.value || "",
        description: item.description || "",
        icon: item.icon || "heart-fill",
        isActive: Boolean(item.isActive),
      });
    }
  }, [ImpactStateData, _id]);

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

    dispatch(updateImpact({ _id, ...data }));
    navigate("/impact");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-pencil-square text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Impact Metrics</p>
              <h1 className="h3 mb-1">Update Impact Metric</h1>
              <p className="text-muted mb-0">Modify title, value, or display icon.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/impact">
              <i className="bi bi-arrow-left me-1"></i> Back to Impact
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Metric Title *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errorMessage.title ? "is-invalid" : ""}`}
                  value={data.title}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Display Value *</label>
                <input
                  type="text"
                  name="value"
                  className="form-control"
                  value={data.value}
                  onChange={getInputData}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Icon Symbol</label>
                <select name="icon" className="form-select" value={data.icon} onChange={getInputData}>
                  {COMMON_ICONS.map((ic) => (
                    <option key={ic.value} value={ic.value}>{ic.label}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Brief Explanation</label>
                <textarea
                  name="description"
                  rows="2"
                  className="form-control"
                  value={data.description}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActiveImpactSwitchEdit"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActiveImpactSwitchEdit">
                    Visible on Website
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/impact" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-success px-4">
                  <i className="bi bi-check2-circle me-1"></i> Update Metric
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
