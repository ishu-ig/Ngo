import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/",            icon: "bi-speedometer2",       label: "Dashboard"       },
  { to: "/about",       icon: "bi-info-circle-fill",   label: "About NGO"       },
  { to: "/project",     icon: "bi-folder2-open",       label: "Projects"        },
  { to: "/campaign",    icon: "bi-megaphone-fill",     label: "Campaigns"       },
  { to: "/donation",    icon: "bi-heart-fill",         label: "Donations"       },
  { to: "/volunteer",   icon: "bi-people-fill",        label: "Volunteers"      },
  { to: "/event",       icon: "bi-calendar-event-fill",label: "Events"          },
  { to: "/team",        icon: "bi-person-badge-fill",  label: "Team Members"    },
  { to: "/partner",     icon: "bi-building",           label: "Partners"        },
  { to: "/blog",        icon: "bi-journal-richtext",   label: "Blog & News"     },
  { to: "/testimonial", icon: "bi-chat-quote-fill",    label: "Testimonials"    },
  { to: "/gallery",     icon: "bi-images",             label: "Media Gallery"   },
  { to: "/impact",      icon: "bi-graph-up-arrow",     label: "Impact Metrics"  },
  { to: "/faq",         icon: "bi-question-circle-fill",label: "FAQs"           },
  { to: "/contactus",   icon: "bi-envelope-paper-fill",label: "Inquiries"       },
  { to: "/user",        icon: "bi-person-gear",        label: "Users & Roles"   },
];

export default function Sidebar({ onLinkClick }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (!userId) return;
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/api/user/${userId}`,
          { headers: { Authorization: localStorage.getItem("token") || "" } }
        );
        response = await response.json();
        if (response.data) setData(response.data);
      } catch (err) {
        console.error("Sidebar user fetch error:", err);
      }
    })();
  }, [navigate]);

  const name = data?.name || localStorage.getItem("name") || "Admin User";
  const role = data?.role || localStorage.getItem("role") || "Administrator";

  return (
    <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <NavLink className="brand-mark" to="/" aria-label="Dashboard">
          <span className="brand-icon">
            <i className="bi bi-heart-pulse-fill text-danger" aria-hidden="true"></i>
          </span>
          <span className="brand-copy">
            <span className="brand-title">NGO Admin</span>
            <span className="brand-subtitle">Management Portal</span>
          </span>
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        {navLinks.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            onClick={() => {
              if (!window.matchMedia("(min-width: 992px)").matches) {
                onLinkClick?.();
              }
            }}
          >
            <span className="nav-icon">
              <i className={`bi ${icon}`} aria-hidden="true"></i>
            </span>
            <span className="nav-text">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <img
          className="avatar-img avatar-md sidebar-user-avatar"
          src={
            data?.profilePicture ||
            data?.pic ||
            "https://res.cloudinary.com/default-avatar.png"
          }
          alt={name}
          onError={(e) => {
            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name);
          }}
        />
        <strong>{name}</strong>
        <small className="text-capitalize">{role}</small>
      </div>

      <div className="sidebar-footer">
        <span className="status-dot"></span>
        <span className="sidebar-footer-text">NGO Hub Active</span>
      </div>
    </aside>
  );
}