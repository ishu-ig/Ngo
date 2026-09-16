import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

import { getDonation } from "../Redux/ActionCreators/DonationActionCreators";
import { getCampaign } from "../Redux/ActionCreators/CampaignActionCreators";
import { getProject } from "../Redux/ActionCreators/ProjectActionCreators";
import { getVolunteer } from "../Redux/ActionCreators/VolunteerActionCreators";
import { getEvent } from "../Redux/ActionCreators/EventActionCreators";
import { getBlog } from "../Redux/ActionCreators/BlogActionCreators";
import { getContactUs } from "../Redux/ActionCreators/ContactUsActionCreators";
import { getPartner } from "../Redux/ActionCreators/PartnerActionCreators";
import { getImpact } from "../Redux/ActionCreators/ImpactActionCreators";
import { getTeamMember } from "../Redux/ActionCreators/TeamMemberActionCreators";
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators";

function unwrap(slice) {
  if (!slice) return [];
  if (Array.isArray(slice)) return slice;
  if (Array.isArray(slice.data)) return slice.data;
  return [];
}

const DashTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--admin-surface, #ffffff)",
        border: "1px solid var(--admin-border, #dee2e6)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      }}
    >
      {label && (
        <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 11 }}>
          {label}
        </p>
      )}
      {payload.map((p, i) => (
        <p key={i} style={{ margin: "2px 0 0", color: p.fill || p.color, fontWeight: 500 }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Home() {
  const dispatch = useDispatch();

  const raw = {
    donations: useSelector((s) => s.DonationStateData),
    campaigns: useSelector((s) => s.CampaignStateData),
    projects: useSelector((s) => s.ProjectStateData),
    volunteers: useSelector((s) => s.VolunteerStateData),
    events: useSelector((s) => s.EventStateData),
    blogs: useSelector((s) => s.BlogStateData),
    contacts: useSelector((s) => s.ContactUsStateData),
    partners: useSelector((s) => s.PartnerStateData),
    impacts: useSelector((s) => s.ImpactStateData),
    team: useSelector((s) => s.TeamMemberStateData),
    testimonials: useSelector((s) => s.TestimonialStateData),
  };

  useEffect(() => {
    dispatch(getDonation());
    dispatch(getCampaign());
    dispatch(getProject());
    dispatch(getVolunteer());
    dispatch(getEvent());
    dispatch(getBlog());
    dispatch(getContactUs());
    dispatch(getPartner());
    dispatch(getImpact());
    dispatch(getTeamMember());
    dispatch(getTestimonial());
  }, [dispatch]);

  const D = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, unwrap(v)])
  );

  // Derived Statistics
  const totalDonationAmount = D.donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const activeCampaigns = D.campaigns.filter((c) => c.status === "active" || c.isActive);
  const totalBeneficiaries = D.projects.reduce((sum, p) => sum + (Number(p.beneficiaries?.count) || 0), 0);
  const pendingVolunteers = D.volunteers.filter((v) => v.applicationStatus === "pending");
  const approvedVolunteers = D.volunteers.filter((v) => v.applicationStatus === "approved");
  const unreadMessages = D.contacts.filter((m) => m.status === "unread" || m.status === "new");
  const ongoingProjects = D.projects.filter((p) => p.status === "ongoing");
  const upcomingEvents = D.events.filter((e) => e.status === "upcoming");

  // Chart Data: Campaigns Target vs Collected
  const campaignChartData = D.campaigns.slice(0, 5).map((c) => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + "..." : c.title,
    Target: c.targetAmount || 0,
    Raised: c.collectedAmount || 0,
  }));

  // Chart Data: Volunteer Status Breakdown
  const volunteerStatusData = [
    { name: "Approved", value: approvedVolunteers.length, fill: "#198754" },
    { name: "Pending", value: pendingVolunteers.length, fill: "#ffc107" },
    { name: "In-Review", value: D.volunteers.filter((v) => v.applicationStatus === "in-review").length, fill: "#0dcaf0" },
    { name: "Rejected", value: D.volunteers.filter((v) => v.applicationStatus === "rejected").length, fill: "#dc3545" },
  ].filter((d) => d.value > 0);

  // Content summary bars
  const contentBars = [
    { label: "Projects", count: D.projects.length, to: "/project", color: "#0d6efd" },
    { label: "Campaigns", count: D.campaigns.length, to: "/campaign", color: "#198754" },
    { label: "Events", count: D.events.length, to: "/event", color: "#ffc107" },
    { label: "Volunteers", count: D.volunteers.length, to: "/volunteer", color: "#0dcaf0" },
    { label: "Blog Posts", count: D.blogs.length, to: "/blog", color: "#6f42c1" },
    { label: "Partners", count: D.partners.length, to: "/partner", color: "#d63384" },
    { label: "Team Members", count: D.team.length, to: "/team", color: "#fd7e14" },
  ];
  const maxBar = Math.max(...contentBars.map((b) => b.count), 1);

  // Quick Action Buttons
  const quickActions = [
    { label: "New Campaign", icon: "bi-megaphone", to: "/campaign/create", color: "#198754" },
    { label: "New Project", icon: "bi-folder-plus", to: "/project/create", color: "#0d6efd" },
    { label: "Create Event", icon: "bi-calendar-plus", to: "/event/create", color: "#ffc107" },
    { label: "Write Blog", icon: "bi-pen", to: "/blog/create", color: "#6f42c1" },
    { label: "Add Partner", icon: "bi-building-add", to: "/partner/create", color: "#d63384" },
    { label: "Add Team", icon: "bi-person-plus", to: "/team/create", color: "#fd7e14" },
    { label: "Add Impact Metric", icon: "bi-graph-up-arrow", to: "/impact/create", color: "#20c997" },
    { label: "View Donations", icon: "bi-heart-fill", to: "/donation", color: "#dc3545" },
  ];

  const axisStyle = { fontSize: 11, fill: "var(--admin-muted, #64748b)" };
  const gridStyle = { stroke: "var(--admin-border, rgba(0,0,0,.08))", strokeDasharray: "3 3" };

  return (
    <main className="dashboard-content">
      <div className="container-fluid px-3 px-lg-4 py-4">

        {/* Page Heading */}
        <div className="page-heading mb-4">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-heart-pulse-fill text-danger" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">Overview</p>
              <h1 className="h3 mb-1">NGO Mission Dashboard</h1>
              <p className="text-muted mb-0">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Impact Banner */}
        <div
          className="panel mb-4 text-white p-4 rounded-4"
          style={{
            background: "linear-gradient(135deg, #0f766e 0%, #064e3b 50%, #022c22 100%)",
            boxShadow: "0 10px 30px rgba(15, 118, 110, 0.3)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <p className="text-white-50 mb-1 fw-bold text-uppercase" style={{ fontSize: 12, letterSpacing: ".08em" }}>
                Total Funds Raised
              </p>
              <h2 className="text-white mb-0 display-6 fw-bold">
                ₹{totalDonationAmount.toLocaleString("en-IN")}
              </h2>
              <p className="text-white-50 mt-1 mb-0 small">Across all active campaigns and direct donors</p>
            </div>
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: 64, height: 64, background: "rgba(255,255,255,0.15)", fontSize: 28 }}
            >
              <i className="bi bi-gift-fill text-white"></i>
            </div>
          </div>

          <div
            className="d-flex flex-wrap gap-4 mt-3 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}
          >
            <span className="text-white-50 d-flex align-items-center gap-2">
              <i className="bi bi-people-fill text-white"></i>
              <strong>{D.volunteers.length}</strong> Volunteers Registered
            </span>
            <span className="text-white-50 d-flex align-items-center gap-2">
              <i className="bi bi-heart-half text-white"></i>
              <strong>{totalBeneficiaries.toLocaleString("en-IN")}</strong> Beneficiaries Impacted
            </span>
            <span className="text-white-50 d-flex align-items-center gap-2">
              <i className="bi bi-flag-fill text-white"></i>
              <strong>{activeCampaigns.length}</strong> Active Fundraisers
            </span>
            <span className="text-white-50 d-flex align-items-center gap-2">
              <i className="bi bi-calendar2-check-fill text-white"></i>
              <strong>{upcomingEvents.length}</strong> Upcoming Events
            </span>
          </div>
        </div>

        {/* 4 Key Stat Metric Cards */}
        <section className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <Link to="/donation" style={{ textDecoration: "none" }}>
              <article className="metric-card metric-primary">
                <div className="metric-top">
                  <span className="metric-label">Total Donations</span>
                  <span className="metric-icon"><i className="bi bi-heart-fill"></i></span>
                </div>
                <div className="metric-value">{D.donations.length}</div>
                <div className="metric-meta"><span>direct & online contributions</span></div>
              </article>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <Link to="/volunteer" style={{ textDecoration: "none" }}>
              <article className="metric-card metric-success">
                <div className="metric-top">
                  <span className="metric-label">Volunteers</span>
                  <span className="metric-icon"><i className="bi bi-person-check-fill"></i></span>
                </div>
                <div className="metric-value">{approvedVolunteers.length}</div>
                <div className="metric-meta"><span>{pendingVolunteers.length} pending review</span></div>
              </article>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <Link to="/project" style={{ textDecoration: "none" }}>
              <article className="metric-card metric-warning">
                <div className="metric-top">
                  <span className="metric-label">Projects</span>
                  <span className="metric-icon"><i className="bi bi-folder-fill"></i></span>
                </div>
                <div className="metric-value">{D.projects.length}</div>
                <div className="metric-meta"><span>{ongoingProjects.length} currently ongoing</span></div>
              </article>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <Link to="/contactus" style={{ textDecoration: "none" }}>
              <article className="metric-card metric-danger">
                <div className="metric-top">
                  <span className="metric-label">New Inquiries</span>
                  <span className="metric-icon"><i className="bi bi-envelope-exclamation-fill"></i></span>
                </div>
                <div className="metric-value">{unreadMessages.length}</div>
                <div className="metric-meta"><span>{D.contacts.length} total messages</span></div>
              </article>
            </Link>
          </div>
        </section>

        {/* Charts: Campaign Fundraising Progress & Volunteer Status */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-xl-8">
            <div className="panel h-100">
              <div className="panel-header">
                <div>
                  <h2 className="h5 mb-1 section-title">
                    <i className="bi bi-bar-chart-line-fill text-primary me-2"></i>
                    <span>Campaign Fundraising Progress</span>
                  </h2>
                  <p className="text-muted mb-0">Target vs Raised amount in INR</p>
                </div>
                <Link to="/campaign" className="btn btn-light btn-sm">Manage All</Link>
              </div>

              {campaignChartData.length === 0 ? (
                <div className="text-center py-5 text-muted">No campaigns created yet.</div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={campaignChartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                    <CartesianGrid {...gridStyle} />
                    <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                    <Tooltip content={<DashTooltip />} />
                    <Legend />
                    <Bar dataKey="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Raised" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="panel h-100">
              <div className="panel-header">
                <div>
                  <h2 className="h5 mb-1 section-title">
                    <i className="bi bi-pie-chart-fill text-success me-2"></i>
                    <span>Volunteer Applications</span>
                  </h2>
                  <p className="text-muted mb-0">Status distribution</p>
                </div>
                <Link to="/volunteer" className="btn btn-light btn-sm">View</Link>
              </div>

              {volunteerStatusData.length === 0 ? (
                <div className="text-center py-5 text-muted">No volunteer applications yet.</div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={volunteerStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      strokeWidth={0}
                    >
                      {volunteerStatusData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<DashTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(v) => (
                        <span style={{ fontSize: 11, color: "var(--bs-secondary-color)" }}>{v}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Content Breakdown + Quick Actions */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-xl-6">
            <div className="panel h-100">
              <div className="panel-header">
                <div>
                  <h2 className="h5 mb-1 section-title">
                    <i className="bi bi-stack text-info me-2"></i>
                    <span>NGO Hub Directory</span>
                  </h2>
                  <p className="text-muted mb-0">Active records by module</p>
                </div>
              </div>
              <div className="d-flex flex-column gap-3 mt-3">
                {contentBars.map((b) => (
                  <div key={b.label} className="d-flex align-items-center gap-3">
                    <Link
                      to={b.to}
                      style={{
                        width: 100,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--bs-body-color)",
                        textDecoration: "none",
                        flexShrink: 0,
                      }}
                    >
                      {b.label}
                    </Link>
                    <div
                      className="flex-grow-1"
                      style={{
                        height: 10,
                        background: "var(--bs-secondary-bg, #f1f5f9)",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.round((b.count / maxBar) * 100)}%`,
                          background: b.color,
                          borderRadius: 99,
                          transition: "width .4s ease",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, minWidth: 28, textAlign: "right" }}>
                      {b.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-6">
            <div className="panel h-100">
              <div className="panel-header">
                <div>
                  <h2 className="h5 mb-1 section-title">
                    <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
                    <span>Quick Management Actions</span>
                  </h2>
                  <p className="text-muted mb-0">Frequently used shortcuts</p>
                </div>
              </div>
              <div className="row g-2 mt-2">
                {quickActions.map((q, i) => (
                  <div key={i} className="col-6">
                    <Link
                      to={q.to}
                      className="d-flex align-items-center gap-2 p-3 rounded-3 text-decoration-none"
                      style={{
                        background: "var(--bs-secondary-bg, #f8fafc)",
                        border: "1px solid var(--bs-border-color, #e2e8f0)",
                        borderLeft: `4px solid ${q.color}`,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--bs-body-color)",
                        transition: "all .2s ease",
                      }}
                    >
                      <i className={`bi ${q.icon}`} style={{ color: q.color, fontSize: 16 }}></i>
                      <span>{q.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donations Table */}
        <div className="panel mb-4">
          <div className="panel-header">
            <div>
              <h2 className="h5 mb-1 section-title">
                <i className="bi bi-currency-rupee text-success me-2"></i>
                <span>Recent Donations</span>
              </h2>
              <p className="text-muted mb-0">Latest donor contributions</p>
            </div>
            <Link to="/donation" className="btn btn-light btn-sm">View All Donations</Link>
          </div>

          <div className="table-responsive mt-2">
            <table className="table align-middle mb-0" style={{ fontSize: 13 }}>
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {D.donations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">No donations recorded yet.</td>
                  </tr>
                ) : (
                  D.donations.slice(0, 6).map((d, i) => (
                    <tr key={d._id || i}>
                      <td className="fw-semibold">
                        {d.isAnonymous ? "Anonymous Donor" : d.donorName || "Supporter"}
                      </td>
                      <td className="text-muted">{d.email || "—"}</td>
                      <td className="fw-bold text-success">
                        ₹{(Number(d.amount) || 0).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span className="badge text-bg-light border">{d.paymentMethod || "Razorpay"}</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            d.paymentStatus === "completed"
                              ? "text-bg-success"
                              : d.paymentStatus === "pending"
                              ? "text-bg-warning"
                              : "text-bg-secondary"
                          }`}
                        >
                          {d.paymentStatus || "completed"}
                        </span>
                      </td>
                      <td className="text-muted">
                        {d.donationDate ? new Date(d.donationDate).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}