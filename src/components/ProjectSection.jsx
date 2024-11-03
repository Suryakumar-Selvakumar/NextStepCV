import { useEffect, useRef, useState } from "react";
import { Project } from "./Project";
import "../styles/ProjectSection.css";
import { Detail } from "./Detail";

export function ProjectSection() {
  const storedProjects = JSON.parse(localStorage.getItem("projects"));
  const [projects, setProjects] = useState(
    storedProjects ? storedProjects : []
  );
  const [projectDetails, setProjectDetails] = useState({
    id: 0,
    projectName: "",
    techStack: "",
    projectDate: "",
    details: [],
  });
  const [detail, setDetail] = useState({ id: 0, value: "" });
  const [projectLimit, setProjectLimit] = useState(4);
  const [detailLimit, setDetailLimit] = useState(5);

  // DOM refs
  const addProjectBtn = useRef(null);
  const projectForm = useRef(null);
  const limitErrorDiv = useRef(null);
  const addDetailBtn = useRef(null);
  const updateProjectBtn = useRef(null);
  const updateDetailBtn = useRef(null);
  const submitProjectBtn = useRef(null);

  useEffect(() => {
    if (projects) localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function addProject() {
    if (projects.length < projectLimit) {
      addProjectBtn.current.style.cssText = "display: none;";
      projectForm.current.style.cssText = "display: block;";
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: block;";
    }

    if (projectDetails.details.length === detailLimit) {
      addDetailBtn.current.disabled = true;
    } else {
      addDetailBtn.current.disabled = false;
    }
  }

  function editProject(projectId) {
    projects.forEach((proj) => {
      if (proj.id === projectId) {
        if (proj.details.length === detailLimit) {
          addDetailBtn.current.disabled = true;
        } else {
          addDetailBtn.current.disabled = false;
        }

        setProjectDetails({
          id: proj.id,
          projectName: proj.projectName,
          techStack: proj.techStack,
          projectDate: proj.projectDate,
          details: proj.details,
        });
      }
    });
    addProjectBtn.current.style.cssText = "display: none;";
    submitProjectBtn.current.style.cssText = "display: none;";
    updateProjectBtn.current.style.cssText = "display: inline;";
    projectForm.current.style.cssText = "display: block;";
    limitErrorDiv.current.style.cssText = "display: none;";
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
      setDetail({
        id: 0,
        value: "",
      });
      updateProjectBtn.current.style.cssText = "display: none;";
      addProjectBtn.current.style.cssText = "display: inline;";
      submitProjectBtn.current.style.cssText = "display: block;";
      projectForm.current.style.cssText = "display: none;";
      updateDetailBtn.current.style.cssText = "display: none;";
      addDetailBtn.current.style.cssText = "display: inline;";
    }
  }

  function deleteProject(projectId) {
    setProjects(projects.filter((proj) => proj.id !== projectId));
    limitErrorDiv.current.style.cssText = "display: none;";

    if (projectDetails.id === projectId || projects.length === 1) {
      updateDetailBtn.current.style.cssText = "display: none;";
      addDetailBtn.current.style.cssText = "display: inline;";
      projectForm.current.style.cssText = "display: none;";
      addProjectBtn.current.style.cssText = "display: inline;";
      updateProjectBtn.current.style.cssText = "display: none;";
      submitProjectBtn.current.style.cssText = "display: inline;";

      setProjectDetails({
        id: 0,
        projectName: "",
        techStack: "",
        projectDate: "",
        details: [],
      });
      setDetail({ id: 0, value: "" });
    }
  }

  function handleSubmit() {
    // Logic to add work to the experiences state
    setProjects([...projects, { ...projectDetails, id: crypto.randomUUID() }]);

    // Display the add button again
    addProjectBtn.current.style.cssText = "display: inline;";

    // Hide the form
    projectForm.current.style.cssText = "display: none;";
  }

  function handleCancel() {
    // Display the add button again
    addProjectBtn.current.style.cssText = "display: inline;";

    // Hide the form
    projectForm.current.style.cssText = "display: none;";

    // Hide Update detail button and bring back Add detail button
    updateDetailBtn.current.style.cssText = "display: none;";
    addDetailBtn.current.style.cssText = "display: inline;";

    // Hide Update button and bring back Submit button
    updateProjectBtn.current.style.cssText = "display: none;";
    submitProjectBtn.current.style.cssText = "display: inline;";

    // Reset projectDetails and detail
    setProjectDetails({
      id: 0,
      projectName: "",
      techStack: "",
      projectDate: "",
      details: [],
    });
    setDetail({ id: 0, value: "" });
  }

  function addDetail() {
    if (projectDetails.details.length < detailLimit && detail.value !== "") {
      setProjectDetails({
        ...projectDetails,
        details: [
          ...projectDetails.details,
          { id: crypto.randomUUID(), value: detail.value },
        ],
      });
    }
    setDetail({ id: 0, value: "" });
    if (projectDetails.details.length + 1 === detailLimit) {
      addDetailBtn.current.disabled = true;
    }
  }

  function editDetail(detailId) {
    projectDetails.details.forEach((dt) => {
      if (dt.id === detailId) {
        setDetail({ id: dt.id, value: dt.value });
      }
    });
    updateDetailBtn.current.style.cssText = "display: inline;";
    addDetailBtn.current.style.cssText = "display: none;";
    limitErrorDiv.current.style.cssText = "display: none;";
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
      updateDetailBtn.current.style.cssText = "display: none;";
      addDetailBtn.current.style.cssText = "display: inline;";

      if (projectDetails.details.length === detailLimit) {
        addDetailBtn.current.disabled = true;
      } else {
        addDetailBtn.current.disabled = false;
      }
    }
  }

  function deleteDetail(detailId) {
    setProjectDetails({
      ...projectDetails,
      details: projectDetails.details.filter((dt) => dt.id !== detailId),
    });

    if (detail.id === detailId || projectDetails.details.length === 1) {
      updateDetailBtn.current.style.cssText = "display: none;";
      addDetailBtn.current.style.cssText = "display: inline;";
      setDetail({ id: 0, value: "" });
    }

    limitErrorDiv.current.style.cssText = "display: none;";

    if (projectDetails.details.length - 1 === detailLimit) {
      addDetailBtn.current.disabled = true;
    } else {
      addDetailBtn.current.disabled = false;
    }
  }

  return (
    <>
      <button
        type="button"
        ref={addProjectBtn}
        id="add-project"
        onClick={() => addProject()}
      >
        Add Project
      </button>
      <div className="limit-error" ref={limitErrorDiv}>
        Project limit reached!
      </div>
      <form
        className="project-form"
        ref={projectForm}
        onSubmit={() => handleSubmit()}
      >
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
          ref={addDetailBtn}
          onClick={() => addDetail()}
          id="add-detail"
        >
          Add detail
        </button>
        <button
          type="button"
          ref={updateDetailBtn}
          onClick={() => updateDetail()}
          id="update-detail"
        >
          Update detail
        </button>
        <button
          type="button"
          id="cancel-project"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit" ref={submitProjectBtn} id="submit-project">
          Submit
        </button>
        <button
          ref={updateProjectBtn}
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
        {projects &&
          projects.map((proj) => (
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
