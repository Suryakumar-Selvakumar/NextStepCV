import { useState } from "react";
import { Project } from "./Project";
import "../styles/ProjectSection.css";
import { Detail } from "./Detail";

export function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    id: 0,
    projectName: "",
    techStack: "",
    projectDate: "",
    details: [],
  });
  const [detail, setDetail] = useState({ id: 0, value: "" });

  function addProject(limit) {
    if (projects.length < limit) {
      document.getElementById("add-project").style.cssText = "display: none;";
      document.querySelector(".project-form").style.cssText = "display: block;";
    }
  }

  function editProject(projectId) {
    projects.forEach((proj) => {
      if (proj.id === projectId) {
        setProjectDetails({
          id: proj.id,
          projectName: proj.projectName,
          techStack: proj.techStack,
          projectDate: proj.projectDate,
          details: proj.details,
        });
      }
    });
    document.getElementById("add-project").style.cssText = "display: none;";
    document.getElementById("submit-project").style.cssText = "display: none;";
    document.getElementById("update-project").style.cssText =
      "display: inline;";
    document.querySelector(".project-form").style.cssText = "display: block;";
  }

  function updateProject() {
    if (
      projectDetails.projectName !== "" &&
      projectDetails.techStack !== "" &&
      projectDetails.projectDate !== ""
    ) {
      const updatedProjects = projects.map((proj) => {
        if (proj.id === projectDetails.id) {
          return {
            ...proj,
            projectName: projectDetails.projectName,
            techStack: projectDetails.techStack,
            projectDate: projectDetails.projectDate,
            details: projectDetails.details,
          };
        } else {
          return proj;
        }
      });
      setProjects(updatedProjects);
      setProjectDetails({
        id: 0,
        projectName: "",
        techStack: "",
        projectDate: "",
        details: [],
      });
      document.getElementById("update-project").style.cssText =
        "display: none;";
      document.getElementById("add-project").style.cssText = "display: inline;";
      document.getElementById("submit-project").style.cssText =
        "display: block;";
      document.querySelector(".project-form").style.cssText = "display: none;";
    }
  }

  function deleteProject(projectId) {
    setProjects(projects.filter((proj) => proj.id !== projectId));
  }

  function handleSubmit() {
    // Logic to add work to the experiences state
    setProjects([...projects, { ...projectDetails, id: crypto.randomUUID() }]);

    // Display the add button again
    document.getElementById("add-project").style.cssText = "display: inline;";

    //Store the data in localStorage

    // Hide the form
    document.querySelector(".project-form").style.cssText = "display: none;";

    // Display the class containing Project component cards
    document.querySelector(".project-cards").style.cssText = "display: block;";
  }

  function editDetail(detailId) {
    projectDetails.details.forEach((dt) => {
      if (dt.id === detailId) {
        setDetail({ id: dt.id, value: dt.value });
      }
    });
    document.getElementById("update-detail").style.cssText = "display: inline;";
    document.getElementById("add-detail").style.cssText = "display: none;";
  }

  function addDetail(limit) {
    if (projectDetails.details.length < limit && detail.value !== "") {
      setProjectDetails({
        ...projectDetails,
        details: [
          ...projectDetails.details,
          { id: crypto.randomUUID(), value: detail.value },
        ],
      });
    }
    setDetail({ id: 0, value: "" });
  }

  function updateDetail() {
    if (detail.value !== "") {
      const updatedDetails = projectDetails.details.map((dt) => {
        if (dt.id === detail.id) {
          return { ...dt, value: detail.value };
        } else {
          return dt;
        }
      });
      setProjectDetails({ ...projectDetails, details: updatedDetails });
      document.getElementById("add-detail").style.cssText = "display: inline;";
      setDetail({ id: 0, value: "" });
      document.getElementById("update-detail").style.cssText = "display: none;";
    }
  }

  function deleteDetail(detailId) {
    setProjectDetails({
      ...projectDetails,
      details: projectDetails.details.filter((dt) => dt.id !== detailId),
    });

    if (projectDetails.details.length === 1) {
      document.getElementById("update-detail").style.cssText = "display: none;";
      document.getElementById("add-detail").style.cssText = "display: inline;";
      setDetail({ id: 0, value: "" });
    }
  }

  return (
    <>
      <button type="button" id="add-project" onClick={() => addProject(4)}>
        Add Project
      </button>
      <form className="project-form" onSubmit={() => handleSubmit()}>
        <label htmlFor="project-name">Project name: </label>
        <input
          type="text"
          id="project-name"
          value={projectDetails.projectName}
          onChange={(e) =>
            setProjectDetails({
              ...projectDetails,
              projectName: e.target.value,
            })
          }
          required
        />
        <label htmlFor="tech-stack">Tech Stack: </label>
        <input
          type="text"
          id="tech-stack"
          value={projectDetails.techStack}
          onChange={(e) =>
            setProjectDetails({
              ...projectDetails,
              techStack: e.target.value,
            })
          }
          required
        />
        <label htmlFor="project-date">Project date: </label>
        <input
          type="date"
          id="project-date"
          value={projectDetails.projectDate}
          onChange={(e) =>
            setProjectDetails({
              ...projectDetails,
              projectDate: e.target.value,
            })
          }
          required
        />
        <label htmlFor="project-detail">Add project details:</label>
        <input
          type="text"
          id="project-detail"
          value={detail.value}
          onChange={(e) => setDetail({ ...detail, value: e.target.value })}
        />
        <button type="button" onClick={() => addDetail(5)} id="add-detail">
          Add detail
        </button>
        <button type="button" onClick={() => updateDetail()} id="update-detail">
          Update detail
        </button>
        <button type="submit" id="submit-project">
          Submit
        </button>
        <button
          id="update-project"
          type="button"
          onClick={() => updateProject()}
        >
          Update
        </button>
      </form>
      <ul className="detail-cards">
        {projectDetails.details.map((dt) => (
          <Detail
            key={dt.id}
            detail={dt}
            editDetail={editDetail}
            deleteDetail={deleteDetail}
          />
        ))}
      </ul>
      <div className="project-cards">
        {projects.map((proj) => (
          <Project
            key={proj.id}
            project={proj}
            editProject={editProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </>
  );
}
