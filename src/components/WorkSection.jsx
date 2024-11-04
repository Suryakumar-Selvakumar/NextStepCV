import { useEffect, useState, useRef } from "react";
import { Work } from "./Work";
import { Role } from "./Role";
import "../styles/WorkSection.css";

export function WorkSection() {
  const storedExperiences = JSON.parse(localStorage.getItem("experiences"));
  const [experiences, setExperiences] = useState(
    storedExperiences ? storedExperiences : []
  );
  const [workDetails, setWorkDetails] = useState({
    id: 0,
    company: "",
    place: "",
    position: "",
    startWork: "",
    endWork: "",
    roles: [],
    stillWorking: false,
  });
  const [mainVisible, setMainVisible] = useState(false);
  const [role, setRole] = useState({ id: 0, value: "" });
  const [workLimit, setWorkLimit] = useState(2);
  const [roleLimit, setRoleLimit] = useState(4);

  // DOM refs
  const limitErrorDiv = useRef(null);
  const addWorkBtn = useRef(null);
  const workForm = useRef(null);
  const updateWorkBtn = useRef(null);
  const addRoleBtn = useRef(null);
  const updateRoleBtn = useRef(null);
  const submitWorkBtn = useRef(null);
  const dropDownSvg = useRef(null);

  useEffect(() => {
    if (experiences)
      localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  function addWork() {
    updateWorkBtn.current.style.cssText = "display: none;";

    if (experiences.length < workLimit) {
      addWorkBtn.current.style.cssText = "display: none;";
      workForm.current.style.cssText = "display: block;";
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: block;";
    }

    if (workDetails.roles.length === roleLimit) {
      addRoleBtn.current.disabled = true;
    } else {
      addRoleBtn.current.disabled = false;
    }
  }

  function editWork(workId) {
    experiences.forEach((work) => {
      if (work.id === workId) {
        if (work.roles.length === roleLimit) {
          addRoleBtn.current.disabled = true;
        } else {
          addRoleBtn.current.disabled = false;
        }

        setWorkDetails({
          id: work.id,
          company: work.company,
          place: work.place,
          position: work.position,
          startWork: work.startWork,
          endWork: work.endWork,
          roles: work.roles,
          stillWorking: work.stillWorking,
        });
      }
    });
    addWorkBtn.current.style.cssText = "display: none;";
    submitWorkBtn.current.style.cssText = "display: none;";
    updateWorkBtn.current.style.cssText = "display: inline;";
    workForm.current.style.cssText = "display: block;";
    limitErrorDiv.current.style.cssText = "display: none;";
  }

  function updateWork() {
    if (
      workDetails.company !== "" &&
      workDetails.place !== "" &&
      workDetails.position !== "" &&
      workDetails.startWork !== ""
    ) {
      const updatedExperiences = experiences.map((work) => {
        if (work.id === workDetails.id) {
          return {
            ...work,
            company: workDetails.company,
            place: workDetails.place,
            position: workDetails.position,
            startWork: workDetails.startWork,
            endWork: workDetails.endWork,
            roles: workDetails.roles,
            stillWorking: workDetails.stillWorking,
          };
        } else {
          return work;
        }
      });
      setExperiences(updatedExperiences);
      setWorkDetails({
        id: 0,
        company: "",
        place: "",
        position: "",
        startWork: "",
        endWork: "",
        roles: [],
        stillWorking: false,
      });
      setRole({
        id: 0,
        value: "",
      });
      updateWorkBtn.current.style.cssText = "display: none;";
      addWorkBtn.current.style.cssText = "display: inline;";
      submitWorkBtn.current.style.cssText = "display: inline;";
      workForm.current.style.cssText = "display: none;";
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: inline;";
    }
  }

  function deleteWork(workId) {
    setExperiences(experiences.filter((exp) => exp.id !== workId));
    limitErrorDiv.current.style.cssText = "display: none;";

    if (workDetails.id === workId || experiences.length === 1) {
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: inline;";
      workForm.current.style.cssText = "display: none;";
      addWorkBtn.current.style.cssText = "display: inline;";
      updateWorkBtn.current.style.cssText = "display: none;";
      submitWorkBtn.current.style.cssText = "display: inline;";

      setWorkDetails({
        id: 0,
        company: "",
        place: "",
        position: "",
        startWork: "",
        endWork: "",
        roles: [],
        stillWorking: false,
      });
      setRole({ id: 0, value: "" });
    }
  }

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();

    // Logic to add work to the experiences state
    setExperiences([
      ...experiences,
      { ...workDetails, id: crypto.randomUUID() },
    ]);

    // Display the add button again
    addWorkBtn.current.style.cssText = "display: inline;";

    // Hide the form
    workForm.current.style.cssText = "display: none;";

    // Display the class containing Work component cards
    document.querySelector(".work-cards").style.cssText = "display: block;";
  }

  function handleCancel() {
    // Display the add button again
    addWorkBtn.current.style.cssText = "display: inline;";

    // Hide the form
    workForm.current.style.cssText = "display: none;";

    // Hide Update role button and bring back Add role button
    updateRoleBtn.current.style.cssText = "display: none;";
    addRoleBtn.current.style.cssText = "display: inline;";

    // Hide Update button and bring back submit button
    updateWorkBtn.current.style.cssText = "display: none;";
    submitWorkBtn.current.style.cssText = "display: inline;";

    // Reset workDetails and role
    setWorkDetails({
      id: 0,
      company: "",
      place: "",
      position: "",
      startWork: "",
      endWork: "",
      roles: [],
      stillWorking: false,
    });
    setRole({ id: 0, value: "" });
  }

  function addRole() {
    if (workDetails.roles.length < roleLimit && role.value !== "") {
      setWorkDetails({
        ...workDetails,
        roles: [
          ...workDetails.roles,
          { id: crypto.randomUUID(), value: role.value },
        ],
      });
    }
    setRole({ id: 0, value: "" });
    if (workDetails.roles.length + 1 === roleLimit) {
      addRoleBtn.current.disabled = true;
    }
  }

  function editRole(roleId) {
    workDetails.roles.forEach((r) => {
      if (r.id === roleId) {
        setRole({ id: r.id, value: r.value });
      }
    });
    updateRoleBtn.current.style.cssText = "display: inline;";
    addRoleBtn.current.style.cssText = "display: none;";
    limitErrorDiv.current.style.cssText = "display: none;";
  }

  function updateRole() {
    if (role.value !== "") {
      const updatedRoles = workDetails.roles.map((r) => {
        if (r.id === role.id) {
          return { ...r, value: role.value };
        } else {
          return r;
        }
      });
      setWorkDetails({ ...workDetails, roles: updatedRoles });
      setRole({ id: 0, value: "" });
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: inline;";

      if (workDetails.roles.length === roleLimit) {
        addRoleBtn.current.disabled = true;
      } else {
        addRoleBtn.current.disabled = false;
      }
    }
  }

  function deleteRole(roleId) {
    setWorkDetails({
      ...workDetails,
      roles: workDetails.roles.filter((role) => role.id !== roleId),
    });

    if (role.id === roleId || workDetails.roles.length === 1) {
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: inline;";
      setRole({ id: 0, value: "" });
    }

    limitErrorDiv.current.style.cssText = "display: none;";

    if (workDetails.roles.length - 1 === roleLimit) {
      addRoleBtn.current.disabled = true;
    } else {
      addRoleBtn.current.disabled = false;
    }
  }

  return (
    <div className="work">
      <div
        className="work-header"
        onClick={() => {
          setMainVisible(!mainVisible);
          dropDownSvg.current.classList.toggle("rotate-dropdown");
        }}
      >
        <h2
          onClick={() => {
            setMainVisible(!mainVisible);
            dropDownSvg.current.classList.toggle("rotate-dropdown");
          }}
        >
          Work Experience
        </h2>
        <svg
          ref={dropDownSvg}
          onClick={() => {
            setMainVisible(!mainVisible);
            dropDownSvg.current.classList.toggle("rotate-dropdown");
          }}
          className="dropdown-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div className={mainVisible ? "work-main visible" : "work-main"}>
        <button
          type="button"
          id="add-work"
          ref={addWorkBtn}
          onClick={() => addWork()}
        >
          Add Work Experience
        </button>
        <div className="limit-error" ref={limitErrorDiv}>
          Work limit reached!
        </div>
        <form
          className="work-form"
          ref={workForm}
          onSubmit={() => handleSubmit()}
        >
          <label htmlFor="company">Company name: </label>
          <input
            type="text"
            id="company"
            value={workDetails.company}
            onChange={(e) =>
              setWorkDetails({ ...workDetails, company: e.target.value })
            }
            autoComplete="on"
            required
          />
          <label htmlFor="place">Company location: </label>
          <input
            type="text"
            id="place"
            value={workDetails.place}
            onChange={(e) =>
              setWorkDetails({ ...workDetails, place: e.target.value })
            }
            required
          />
          <label htmlFor="position">Position: </label>
          <input
            type="text"
            id="position"
            value={workDetails.position}
            onChange={(e) =>
              setWorkDetails({ ...workDetails, position: e.target.value })
            }
            required
          />
          <label htmlFor="still-working">Still Working? </label>
          <input
            type="checkbox"
            id="still-working"
            checked={workDetails.stillWorking}
            onChange={(e) =>
              setWorkDetails({
                ...workDetails,
                endWork: "",
                stillWorking: e.target.checked,
              })
            }
          />
          <label htmlFor="start-work">Position start date: </label>
          <input
            type="date"
            id="start-work"
            value={workDetails.startWork}
            onChange={(e) =>
              setWorkDetails({ ...workDetails, startWork: e.target.value })
            }
            required
          />
          {!workDetails.stillWorking && (
            <>
              <label htmlFor="end-work">Position end date: </label>
              <input
                type="date"
                id="end-work"
                value={workDetails.endWork}
                onChange={(e) =>
                  setWorkDetails({ ...workDetails, endWork: e.target.value })
                }
                required
              />
            </>
          )}
          <label htmlFor="role">Job roles:</label>
          <input
            type="text"
            id="role"
            value={role.value}
            onChange={(e) => setRole({ ...role, value: e.target.value })}
          />
          <button
            type="button"
            ref={addRoleBtn}
            onClick={() => addRole()}
            id="add-role"
          >
            Add role
          </button>
          <button
            type="button"
            ref={updateRoleBtn}
            onClick={() => updateRole()}
            id="update-role"
          >
            Update role
          </button>
          <button type="button" id="cancel-work" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button type="submit" ref={submitWorkBtn} id="submit-work">
            Submit
          </button>
          <button
            id="update-work"
            type="button"
            ref={updateWorkBtn}
            onClick={() => updateWork()}
          >
            Update
          </button>
        </form>
        <ul className="role-cards">
          {workDetails.roles.map((role) => (
            <Role
              key={role.id}
              role={role}
              editRole={editRole}
              deleteRole={deleteRole}
            />
          ))}
        </ul>
        <div className="work-cards">
          {experiences &&
            experiences.map((exp) => (
              <Work
                key={exp.id}
                work={exp}
                editWork={editWork}
                deleteWork={deleteWork}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
