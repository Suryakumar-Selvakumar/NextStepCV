import { useState } from "react";

export function ProjectResume() {
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    techStack: "",
    projectDate: "",
    details: [],
  });

  return (
    <div className="project-resume">
      <div>
        <p id="name-tech-stack-project">
          {projectDetails.projectName} | <i>{projectDetails.techStack}</i>
        </p>
        <p id="date-project">{projectDetails.projectDate}</p>
      </div>
      <ul className="project-details-resume">
        {projectDetails.details.map((dt) => (
          <li key={dt.id}>{dt.value}</li>
        ))}
      </ul>
      <button type="button" onClick={() => handleEdit()}>
        Edit
      </button>
    </div>
  );
}
