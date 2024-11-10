import { useEffect, useState } from "react";

export function EducationResume({ appData }) {
  const courses = appData.courses.length ? appData.courses : [];

  return (
    <div className="education-resume">
      {courses.map((edu) => {
        return (
          <div key={edu.id}>
            <div>
              <p id="school-education">{edu.school}</p>
              <p id="place-study-education">{edu.placeStudy}</p>
            </div>
            <div>
              <p id="title-gpa-education">
                {edu.titleStudy} <b>(GPA: {edu.gpa}/4.0)</b>
              </p>
              {edu.startDateStudy ? (
                <p id="date-study-education">
                  {edu.startDateStudy} &#8210; {edu.endDateStudy}
                </p>
              ) : (
                <p id="date-study-education">
                  Expected Graduation Year: {edu.endDateStudy}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
