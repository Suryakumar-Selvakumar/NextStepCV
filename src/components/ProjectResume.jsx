import { useState } from "react";

export function ProjectResume({ appData }) {
  const projects = appData.projects.length ? appData.projects : [];

  return (
    <div className="project-resume">
      {projects.map((proj) => {
        return (
          <div key={proj.id}>
            {" "}
            <div>
              <p id="name-tech-stack-project">
                {proj.projectName} | <i>{proj.techStack}</i>
              </p>
              <p id="date-project">{proj.projectDate}</p>
            </div>
            <ul className="project-details-resume">
              {proj.details.map((dt) => (
                <li key={dt.id}>{dt.value}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
