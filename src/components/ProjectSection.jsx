import { Fragment, useEffect, useRef, useState } from "react";
import { Project } from "./Project";
import "../styles/ProjectSection.css";
import { Detail } from "./Detail";
import { returnToday } from "./utils";
import warningGold from "../assets/warning-gold.svg";

export function ProjectSection({ appData, setAppData }) {
  const storedMainVisible = JSON.parse(
    localStorage.getItem("projectsMainVisible")
  );
  const [projects, setProjects] = useState(
    appData.projects.length ? appData.projects : []
  );
  const [projectDetails, setProjectDetails] = useState({
    id: 0,
    projectName: "",
    techStack: "",
    projectDate: "",
    details: [],
  });
  const [mainVisible, setMainVisible] = useState(
    storedMainVisible ? storedMainVisible : false
  );
  const [detail, setDetail] = useState({ id: 0, value: "" });
  const [projectLimit, setProjectLimit] = useState(4);
  const [detailLimit, setDetailLimit] = useState(5);
  const [formVisible, setFormVisible] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  // DOM refs
  const addProjectBtn = useRef(null);
  const projectForm = useRef(null);
  const addDetailBtn = useRef(null);
  const updateProjectBtn = useRef(null);
  const updateDetailBtn = useRef(null);
  const submitProjectBtn = useRef(null);
  const dropDownSvg = useRef(null);
  const detailCardsUl = useRef(null);

  useEffect(() => {
    localStorage.setItem("projectsMainVisible", JSON.stringify(mainVisible));
    setProjects(appData.projects);
  }, [mainVisible, appData]);

  function addProject() {
    if (projects.length < projectLimit) {
      projectForm.current.reset();
      setProjectDetails({
        id: 0,
        projectName: "",
        techStack: "",
        projectDate: "",
        details: [],
      });
      setFormVisible(true);
      setLimitReached(false);
    } else {
      setLimitReached(true);
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

    submitProjectBtn.current.style.cssText = "display: none;";
    updateProjectBtn.current.style.cssText = "display: flex;";
    setFormVisible(true);
    setLimitReached(false);
    detailCardsUl.current.style.cssText = "border: 1px solid rgb(55, 55, 55);";
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
      setAppData({ ...appData, projects: updatedProjects });
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

      submitProjectBtn.current.style.cssText = "display: flex;";
      setFormVisible(false);
      updateDetailBtn.current.style.cssText = "display: none;";
      addDetailBtn.current.style.cssText = "display: flex;";
      detailCardsUl.current.style.cssText = "border: none;";
    }
  }

  function deleteProject(projectId) {
    const updatedProjects = projects.filter((proj) => proj.id !== projectId);

    const projectCards = document.querySelector(".project-cards");
    for (const proj of projectCards.children) {
      const projId = proj.getAttribute("data-id");
      if (projId == projectId) {
        proj.classList.add("delete");
      }
    }

    setTimeout(() => {
      setProjects(updatedProjects);
      setAppData({ ...appData, projects: updatedProjects });
    }, 450);

    setLimitReached(false);

    if (projectDetails.id === projectId || projects.length === 1) {
      updateDetailBtn.current.style.cssText = "display: none;";
      addDetailBtn.current.style.cssText = "display: flex;";
      setFormVisible(false);

      updateProjectBtn.current.style.cssText = "display: none;";
      submitProjectBtn.current.style.cssText = "display: flex;";
      detailCardsUl.current.style.cssText = "border: none;";

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

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();

    // Logic to add work to the experiences state
    const updatedProjects = [
      ...projects,
      { ...projectDetails, id: crypto.randomUUID() },
    ];
    setProjects(updatedProjects);
    setAppData({ ...appData, projects: updatedProjects });

    // Hide the form
    setFormVisible(false);

    detailCardsUl.current.style.cssText = "border: none;";
  }

  function handleCancel() {
    // Hide the form
    setFormVisible(false);

    // Hide Update detail button and bring back Add detail button
    updateDetailBtn.current.style.cssText = "display: none;";
    addDetailBtn.current.style.cssText = "display: flex;";

    // Hide Update button and bring back Submit button
    updateProjectBtn.current.style.cssText = "display: none;";
    submitProjectBtn.current.style.cssText = "display: flex;";
    detailCardsUl.current.style.cssText = "border: none;";

    // Reset projectDetails and detail
    setProjectDetails({
      id: 0,
      projectName: "",
      techStack: "",
      projectDate: "",
      details: [],
    });
    setDetail({ id: 0, value: "" });
    projectForm.current.reset();
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
      detailCardsUl.current.style.cssText =
        "border: 1px solid rgb(55, 55, 55);";
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
    updateDetailBtn.current.style.cssText = "display: flex;";
    addDetailBtn.current.style.cssText = "display: none;";
    setLimitReached(false);
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
      addDetailBtn.current.style.cssText = "display: flex;";

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
      addDetailBtn.current.style.cssText = "display: flex;";
      setDetail({ id: 0, value: "" });
    }

    if (projectDetails.details.length === 1) {
      detailCardsUl.current.style.cssText = "border: none;";
    }

    setLimitReached(false);

    if (projectDetails.details.length - 1 === detailLimit) {
      addDetailBtn.current.disabled = true;
    } else {
      addDetailBtn.current.disabled = false;
    }
  }

  return (
    <div className="projects">
      <div
        className="projects-header"
        onClick={() => {
          setMainVisible(!mainVisible);
        }}
      >
        <h3
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
        >
          Projects
        </h3>
        <svg
          ref={dropDownSvg}
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
          className={
            mainVisible ? "dropdown-svg rotate-dropdown" : "dropdown-svg"
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div className={mainVisible ? "projects-main" : "projects-main closed"}>
        <button
          type="button"
          ref={addProjectBtn}
          className={formVisible ? "add-project" : "add-project visible"}
          onClick={() => addProject()}
        >
          <svg
            style={{ width: "25px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M17,14H19V17H22V19H19V22H17V19H14V17H17V14M11,16L2,9L11,2L20,9L11,16M11,18.54L12,17.75V18C12,18.71 12.12,19.39 12.35,20L11,21.07L2,14.07L3.62,12.81L11,18.54Z"
            />
          </svg>
          <span>Add Project</span>
        </button>
        <div className={limitReached ? "limit-error visible" : "limit-error"}>
          <img src={warningGold} alt="a warning logo" id="warning-img" />
          <span>Project limit reached!</span>
        </div>
        <form
          className={formVisible ? "project-form" : "project-form closed"}
          ref={projectForm}
          onSubmit={(e) => handleSubmit(e)}
          style={{
            paddingBottom: !projects.length && formVisible ? "1rem" : 0,
          }}
        >
          <div className="project-name-date">
            <div className="project-name-div">
              <label htmlFor="project-name">Project Name </label>
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
            </div>
            <div className="project-date-div">
              <label htmlFor="project-date">Project Date </label>
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
                onFocus={() => {
                  document
                    .getElementById("project-date")
                    .setAttribute("max", returnToday());
                }}
                required
              />
            </div>
          </div>
          <div className="project-tech-stack-div">
            <label htmlFor="tech-stack">Tech Stack </label>
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
          </div>
          <div className="project-detail-btns">
            <label htmlFor="project-detail">Add Project Details</label>
            <div>
              <input
                type="text"
                id="project-detail"
                value={detail.value}
                onChange={(e) =>
                  setDetail({ ...detail, value: e.target.value })
                }
              />
              <>
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
              </>
            </div>
          </div>
          <div className="project-form-btns">
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
          </div>
          <ul className="detail-cards" ref={detailCardsUl}>
            {projectDetails.details &&
              projectDetails.details.map((dt) => (
                <Fragment key={dt.id}>
                  <Detail
                    detail={dt}
                    editDetail={editDetail}
                    deleteDetail={deleteDetail}
                  />
                  <hr />
                </Fragment>
              ))}
          </ul>
        </form>
        <div
          className="project-cards"
          style={{ display: projects.length ? "flex" : "none" }}
        >
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
      </div>
    </div>
  );
}
