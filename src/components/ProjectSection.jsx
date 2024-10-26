import { useState } from "react";
import { Project } from "./Project";
import { Fragment } from "react";

export function ProjectSection() {
  const [projects, setProjects] = useState([]);

  function addProject(limit) {
    if (projects.length < limit) {
      setProjects([...projects, <Project key={crypto.randomUUID()} />]);
      document.getElementById("add-project").style.cssText = "display: none;";
    }
  }

  function deleteProject(key) {
    setProjects(projects.filter((proj) => proj.key !== key));
    document.getElementById("add-project").style.cssText = "display: inline;";
  }

  return (
    <div className="project-section">
      <button type="button" id="add-project" onClick={() => addProject(4)}>
        Add Project
      </button>
      {projects.map((proj) => (
        <Fragment key={crypto.randomUUID()}>
          {proj}
          <button
            id="delete-project"
            type="button"
            onClick={() => deleteProject(proj.key)}
          >
            Delete Project
          </button>
        </Fragment>
      ))}
    </div>
  );
}
