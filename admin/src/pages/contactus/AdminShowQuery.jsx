import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContactUs, updateContactUs } from "../../Redux/ActionCreators/ContactUsActionCreators";

export default function AdminShowQuery() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const ContactUsStateData = useSelector((state) => state.ContactUsStateData);

  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    dispatch(getContactUs());
  }, [dispatch]);

  const list = Array.isArray(ContactUsStateData)
    ? ContactUsStateData
    : ContactUsStateData?.data || [];
  const message = list.find((m) => m._id === _id);

  useEffect(() => {
    if (message && message.status === "unread") {
      dispatch(updateContactUs({ _id: message._id, status: "read" }));
    }
  }, [message, dispatch]);

  function submitReply(e) {
    e.preventDefault();
    if (!replyText.trim()) return;

    dispatch(
      updateContactUs({
        _id,
        status: "replied",
        adminReply: {
          replyMessage: replyText,
          repliedBy: localStorage.getItem("userid") || null,
          repliedAt: new Date(),
        },
      })
    );
    setReplyText("");
    alert("Reply recorded and saved.");
  }

  if (!message) {
    return (
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4 text-center py-5">
          <p className="text-muted">Message not found.</p>
          <Link to="/contactus" className="btn btn-outline-secondary btn-sm">Back to Inbox</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-envelope-open-fill text-danger" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Inquiries</p>
              <h1 className="h3 mb-1">View Message</h1>
              <p className="text-muted mb-0">Review inquiry details and compose a response.</p>
            </div>
          </div>
          <div className="heading-actions">
            <Link className="btn btn-outline-secondary btn-sm" to="/contactus">
              <i className="bi bi-arrow-left me-1"></i> Back to Inbox
            </Link>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="panel p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div>
                  <h2 className="h5 fw-bold mb-1">{message.subject || "No Subject"}</h2>
                  <span className="text-muted small">
                    Received on {message.createdAt ? new Date(message.createdAt).toLocaleString() : "—"}
                  </span>
                </div>
                <span
                  className={`badge text-capitalize ${
                    message.status === "replied"
                      ? "text-bg-success"
                      : message.status === "read"
                      ? "text-bg-info"
                      : "text-bg-warning"
                  }`}
                >
                  {message.status}
                </span>
              </div>

              <div className="mb-4">
                <h6 className="fw-semibold text-muted small text-uppercase">Sender Information</h6>
                <div className="row g-2 mt-1">
                  <div className="col-sm-4">
                    <span className="text-muted small">Name:</span>
                    <div className="fw-semibold">{message.name}</div>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted small">Email:</span>
                    <div>
                      <a href={`mailto:${message.email}`} className="text-decoration-none">{message.email}</a>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted small">Phone:</span>
                    <div>{message.phone || "—"}</div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="fw-semibold text-muted small text-uppercase mb-2">Message Body</h6>
                <div className="p-3 bg-light rounded border" style={{ whiteSpace: "pre-line", minHeight: 140 }}>
                  {message.message}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="panel p-4 h-100 d-flex flex-column">
              <h5 className="fw-bold mb-3">Admin Reply</h5>

              {message.adminReply?.replyMessage ? (
                <div className="p-3 bg-success-subtle rounded border border-success mb-3">
                  <div className="d-flex justify-content-between small text-success-emphasis mb-1">
                    <strong>Previous Reply Recorded</strong>
                    <span>
                      {message.adminReply.repliedAt
                        ? new Date(message.adminReply.repliedAt).toLocaleString()
                        : ""}
                    </span>
                  </div>
                  <p className="mb-0 text-muted" style={{ whiteSpace: "pre-line" }}>
                    {message.adminReply.replyMessage}
                  </p>
                </div>
              ) : null}

              <form onSubmit={submitReply} className="flex-grow-1 d-flex flex-column">
                <label className="form-label fw-semibold">
                  {message.adminReply?.replyMessage ? "Send Another / Update Reply" : "Compose Response"}
                </label>
                <textarea
                  className="form-control flex-grow-1 mb-3"
                  rows="6"
                  placeholder="Type your response to the sender..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                ></textarea>
                <div className="d-flex gap-2">
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent("Re: " + (message.subject || "Your Inquiry"))}&body=${encodeURIComponent(replyText)}`}
                    className="btn btn-outline-primary flex-grow-1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-envelope me-1"></i> Open in Email Client
                  </a>
                  <button type="submit" className="btn btn-primary px-3">
                    <i className="bi bi-send me-1"></i> Log Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}