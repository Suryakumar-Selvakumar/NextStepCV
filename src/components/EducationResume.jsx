import { useEffect, useState } from "react";
import { formatDate } from "./utils";

export function EducationResume({ appData }) {
  const courses = appData.courses.length ? appData.courses : [];

  const mediaQuery = window.matchMedia(
    "(min-width: 360px) and (max-width: 767px)"
  );

  return (
    <div className="section-resume" style={{ gap: "3pt" }}>
      {courses.length > 0 && <span id="section-heading">EDUCATION</span>}
      <div className="section-container">
        {courses.map((edu) => {
          return (
            <div key={edu.id} style={{ lineHeight: "1.25" }}>
              <div
                className="div-styles"
                style={{ fontSize: !mediaQuery.matches ? "12pt" : "9px" }}
              >
                <p className="bold-styles">{edu.school}</p>
                <p>{edu.placeStudy}</p>
              </div>
              <div className="div-styles">
                <p>
                  <span className="italic-styles">{edu.titleStudy}</span>{" "}
                  <span className="bold-italic-styles">
                    (GPA: {edu.gpa}/4.0)
                  </span>
                </p>
                {edu.startDateStudy ? (
                  <p className="italic-styles">
                    {formatDate(edu.startDateStudy)} &#8211;{" "}
                    {formatDate(edu.endDateStudy)}
                  </p>
                ) : (
                  <p className="italic-styles">
                    <span>Expected Graduation Year:</span>{" "}
                    {formatDate(edu.endDateStudy)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
