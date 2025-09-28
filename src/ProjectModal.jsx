import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

export default function ProjectModal({ project, isOpen, onClose }) {
  // safety
  if (!isOpen || !project) return null;

  // prevent background scroll while modal open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const title = (project.title || "").toLowerCase();

  // conditional rules
  const showNotes = title.includes("research") || title.includes("paper");
  const hideContributors =
    title.includes("static food") || title.includes("catering") || title.includes("static-food");
  // determine link for special projects
  let linkUrl = null;
  let linkText = "Try now";
  if (title.includes("financial") || title.includes("tracker") || title.includes("finance")) {
    linkUrl = "https://money-manager-mocha-five.vercel.app/landing";
  } else if (title.includes("traffic")) {
    linkUrl = "https://traffic-sign-scanner.vercel.app/";
  } else if (title.includes("research") || title.includes("soh") || title.includes("paper")) {
    linkUrl = "https://drive.google.com/file/d/1qdhQ2PPYaHAnDIJj0XE-xl5rYQx74fYW/view?usp=drivesdk";
    linkText = "See here";
  }

  const modal = (
    <div className="project-modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close project modal"
          title="Close"
        >
          ×
        </button>

        <h2>{project.title}</h2>

        {project.tools && (
          <p>
            <strong>Tools:</strong> {project.tools}
          </p>
        )}

        {project.description && <p>{project.description}</p>}

        {project.img && (
          <img
            src={project.img}
            alt={project.title}
            style={{ marginTop: "1rem", maxWidth: "100%", borderRadius: 8 }}
          />
        )}

        {showNotes && project.notes && (
          <p style={{ marginTop: 12 }}>
            <strong>Extra Notes:</strong> {project.notes}
          </p>
        )}

        {!hideContributors && project.contributors && project.contributors.length > 0 && (
          <p style={{ marginTop: 8 }}>
            <strong>Contributors:</strong> {project.contributors.join(", ")}
          </p>
        )}

        {linkUrl && (
          <p style={{ marginTop: 12 }}>
            <strong>
              <a
                className="project-link"
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
            </strong>
          </p>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
