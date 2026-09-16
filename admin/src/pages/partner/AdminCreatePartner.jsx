import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPartner } from "../../Redux/ActionCreators/PartnerActionCreators";
import formValidator from "../../FormValidators/formValidator";
import imageValidator from "../../FormValidators/imageValidator";

const PARTNER_TYPES = [
  "Corporate",
  "NGO Partner",
  "Government",
  "Academic",
  "Donor",
  "Sponsor",
  "Media Partner",
  "Other",
];

export default function AdminCreatePartner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    organizationName: "",
    website: "",
    description: "",
    partnerType: "Corporate",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    isActive: true,
  });

  const [logo, setLogo] = useState(null);
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
      logo: err,
    }));
    if (!err && file) {
      setLogo(file);
    }
  }

  function postData(e) {
    e.preventDefault();
    const errors = Object.values(errorMessage).filter((x) => x !== "");
    if (errors.length > 0) return;

    if (!data.organizationName || !logo) {
      alert("Please fill mandatory fields (Organization Name, Partner Logo).");
      return;
    }

    const formData = new FormData();
    formData.append("organizationName", data.organizationName);
    formData.append("website", data.website);
    formData.append("description", data.description);
    formData.append("partnerType", data.partnerType);
    formData.append("isActive", data.isActive);
    formData.append("logo", logo);

    const contactPerson = {
      name: data.contactName,
      email: data.contactEmail,
      phone: data.contactPhone,
    };
    formData.append("contactPerson", JSON.stringify(contactPerson));

    dispatch(createPartner(formData));
    navigate("/partner");
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-building-add text-success" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Collaborations</p>
              <h1 className="h3 mb-1">Add Partner</h1>
              <p className="text-muted mb-0">Record a CSR partner, sponsor, or ally NGO.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/partner">
              <i className="bi bi-arrow-left me-1"></i> Back to Partners
            </Link>
          </div>
        </div>

        <div className="panel p-4">
          <form onSubmit={postData}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Organization Name *</label>
                <input
                  type="text"
                  name="organizationName"
                  className={`form-control ${errorMessage.organizationName ? "is-invalid" : ""}`}
                  placeholder="e.g. Tata Consultancy Services (CSR Wing)"
                  value={data.organizationName}
                  onChange={getInputData}
                  required
                />
                {errorMessage.organizationName && <div className="invalid-feedback">{errorMessage.organizationName}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Partner Type</label>
                <select name="partnerType" className="form-select" value={data.partnerType} onChange={getInputData}>
                  {PARTNER_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Partner Logo *</label>
                <input
                  type="file"
                  name="logo"
                  className={`form-control ${errorMessage.logo ? "is-invalid" : ""}`}
                  onChange={getInputFile}
                  required
                />
                {errorMessage.logo && <div className="invalid-feedback">{errorMessage.logo}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">Official Website</label>
                <input
                  type="url"
                  name="website"
                  className="form-control"
                  placeholder="https://company.com"
                  value={data.website}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Collaboration Scope / Description</label>
                <textarea
                  name="description"
                  rows="3"
                  className="form-control"
                  placeholder="Summary of partnership, grant allocations, CSR projects funded..."
                  value={data.description}
                  onChange={getInputData}
                ></textarea>
              </div>

              <div className="col-12">
                <hr className="my-2" />
                <h6 className="fw-bold mb-3">Partner Contact Person (Internal Reference)</h6>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Contact Name</label>
                <input
                  type="text"
                  name="contactName"
                  className="form-control"
                  placeholder="e.g. Meenakshi Sundaram"
                  value={data.contactName}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  className="form-control"
                  placeholder="csr@company.com"
                  value={data.contactEmail}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  className="form-control"
                  placeholder="+91 9876543210"
                  value={data.contactPhone}
                  onChange={getInputData}
                />
              </div>

              <div className="col-12 col-md-6 d-flex align-items-center mt-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActivePartnerSwitch"
                    name="isActive"
                    checked={data.isActive}
                    onChange={getInputData}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="isActivePartnerSwitch">
                    Display on Website Partner Carousel
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                <Link to="/partner" className="btn btn-light">Cancel</Link>
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-check2-circle me-1"></i> Save Partner
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
