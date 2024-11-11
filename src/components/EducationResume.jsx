import { useEffect, useState } from "react";
import { formatDate } from "./utils";

export function EducationResume({ appData }) {
  const courses = appData.courses.length ? appData.courses : [];

  return (
    <div className="education-resume">
      {courses.length > 0 && <span id="section-heading">EDUCATION</span>}
      <div className="education-container">
        {courses.map((edu) => {
          return (
            <div key={edu.id} className="education">
              <div className="education-school-place">
                <p id="school-education">{edu.school}</p>
                <p id="place-study-education">{edu.placeStudy}</p>
              </div>
              <div className="education-title-gpa-dates">
                <p id="title-gpa-education">
                  <span>{edu.titleStudy}</span> <b>(GPA: {edu.gpa}/4.0)</b>
                </p>
                {edu.startDateStudy ? (
                  <p id="date-study-education">
                    {formatDate(edu.startDateStudy)} &#8210;{" "}
                    {formatDate(edu.endDateStudy)}
                  </p>
                ) : (
                  <p id="date-study-education">
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
