import { useState } from "react";
import "../styles/project.css";

export function Project() {
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    techStack: "",
    projectDate: "",
    details: [],
  });
  const [detail, setDetail] = useState({ id: 0, value: "" });
  const [displayState, setDisplayState] = useState("form");

  function handleSubmit() {
    setDisplayState("resume");
  }

  function handleEdit() {
    setDisplayState("form");
  }

  function editDetail(detailId) {
    projectDetails.details.forEach((dt) => {
      if (dt.id === detailId) {
        setDetail({ id: dt.id, value: dt.value });
      }
    });
    document.getElementById("update-detail-btn").style.cssText =
      "display: inline;";
    document.getElementById("add-detail-btn").style.cssText = "display: none;";
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
      setDetail({ id: 0, value: "" });
      document.getElementById("update-detail-btn").style.cssText =
        "display: none;";
      document.getElementById("add-detail-btn").style.cssText =
        "display: inline;";
    }
  }

  function deleteDetail(detailId) {
    setProjectDetails({
      ...projectDetails,
      details: projectDetails.details.filter((dt) => dt.id !== detailId),
    });
    document.getElementById("update-detail-btn").style.cssText =
      "display: none;";
    document.getElementById("add-detail-btn").style.cssText =
      "display: inline;";
    setDetail({ id: 0, value: "" });
  }

  if (displayState === "form") {
    return (
      <>
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
          <button
            type="button"
            onClick={() => addDetail(5)}
            id="add-detail-btn"
          >
            Add detail
          </button>
          <button
            type="button"
            onClick={() => updateDetail()}
            id="update-detail-btn"
          >
            Update detail
          </button>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {projectDetails.details.map((dt) => (
            <li key={dt.id}>
              {dt.value}
              <button
                type="button"
                id="edit-detail-btn"
                onClick={() => editDetail(dt.id)}
              >
                Edit Detail
              </button>
              <button
                type="button"
                id="delete-detail-btn"
                onClick={() => deleteDetail(dt.id)}
              >
                Delete Detail
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (displayState === "resume") {
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
}
