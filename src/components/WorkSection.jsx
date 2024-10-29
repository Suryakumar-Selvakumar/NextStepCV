import { useEffect, useState } from "react";
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
  });
  const [role, setRole] = useState({ id: 0, value: "" });
  const [workLimit, setWorkLimit] = useState(2);
  const [roleLimit, setRoleLimit] = useState(4);

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  function returnToday() {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  function renderEndDate() {
    const today = returnToday();
    if (workDetails.endWork >= today) {
      return "Present";
    } else {
      return workDetails.endWork;
    }
  }

  function addWork() {
    if (experiences.length < workLimit) {
      document.getElementById("add-work").style.cssText = "display: none;";
      document.querySelector(".work-form").style.cssText = "display: block;";
      document.querySelector(".limit-error").style.cssText = "display: none;";
    } else {
      document.querySelector(".limit-error").style.cssText = "display: block;";
    }

    if (workDetails.roles.length === roleLimit) {
      document.getElementById("add-role").disabled = true;
    } else {
      document.getElementById("add-role").disabled = false;
    }
  }

  function editWork(workId) {
    experiences.forEach((work) => {
      if (work.id === workId) {
        if (work.roles.length === roleLimit) {
          document.getElementById("add-role").disabled = true;
        } else {
          document.getElementById("add-role").disabled = false;
        }

        setWorkDetails({
          id: work.id,
          company: work.company,
          place: work.place,
          position: work.position,
          startWork: work.startWork,
          endWork: work.endWork,
          roles: work.roles,
        });
      }
    });
    document.getElementById("add-work").style.cssText = "display: none;";
    document.getElementById("submit-work").style.cssText = "display: none;";
    document.getElementById("update-work").style.cssText = "display: inline;";
    document.querySelector(".work-form").style.cssText = "display: block;";
    document.querySelector(".limit-error").style.cssText = "display: none;";
  }

  function updateWork() {
    if (
      workDetails.company !== "" &&
      workDetails.place !== "" &&
      workDetails.position !== "" &&
      workDetails.startWork !== "" &&
      workDetails.endWork !== ""
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
      });
      setRole({
        id: 0,
        value: "",
      });
      document.getElementById("update-work").style.cssText = "display: none;";
      document.getElementById("add-work").style.cssText = "display: inline;";
      document.getElementById("submit-work").style.cssText = "display: block;";
      document.querySelector(".work-form").style.cssText = "display: none;";
      document.getElementById("update-role").style.cssText = "display: none;";
      document.getElementById("add-role").style.cssText = "display: inline;";
    }
  }

  function deleteWork(workId) {
    setExperiences(experiences.filter((exp) => exp.id !== workId));
    document.querySelector(".limit-error").style.cssText = "display: none;";

    if (workDetails.id === workId || experiences.length === 1) {
      document.getElementById("update-role").style.cssText = "display: none;";
      document.getElementById("add-role").style.cssText = "display: inline;";
      document.querySelector(".work-form").style.cssText = "display: none;";
      document.getElementById("add-work").style.cssText = "display: inline;";
      document.getElementById("update-work").style.cssText = "display: none;";
      document.getElementById("submit-work").style.cssText = "display: block;";

      setWorkDetails({
        id: 0,
        company: "",
        place: "",
        position: "",
        startWork: "",
        endWork: "",
        roles: [],
      });
      setRole({ id: 0, value: "" });
    }
  }

  function handleSubmit() {
    // Logic to add work to the experiences state
    setExperiences([
      ...experiences,
      { ...workDetails, id: crypto.randomUUID() },
    ]);

    // Display the add button again
    document.getElementById("add-work").style.cssText = "display: inline;";

    // Hide the form
    document.querySelector(".work-form").style.cssText = "display: none;";

    // Display the class containing Work component cards
    document.querySelector(".work-cards").style.cssText = "display: block;";
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
      document.getElementById("add-role").disabled = true;
    }
  }

  function editRole(roleId) {
    workDetails.roles.forEach((r) => {
      if (r.id === roleId) {
        setRole({ id: r.id, value: r.value });
      }
    });
    document.getElementById("update-role").style.cssText = "display: inline;";
    document.getElementById("add-role").style.cssText = "display: none;";
    document.querySelector(".limit-error").style.cssText = "display: none;";
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
      document.getElementById("update-role").style.cssText = "display: none;";
      document.getElementById("add-role").style.cssText = "display: inline;";

      if (workDetails.roles.length === roleLimit) {
        document.getElementById("add-role").disabled = true;
      } else {
        document.getElementById("add-role").disabled = false;
      }
    }
  }

  function deleteRole(roleId) {
    setWorkDetails({
      ...workDetails,
      roles: workDetails.roles.filter((role) => role.id !== roleId),
    });

    if (role.id === roleId || workDetails.roles.length === 1) {
      document.getElementById("update-role").style.cssText = "display: none;";
      document.getElementById("add-role").style.cssText = "display: inline;";
      setRole({ id: 0, value: "" });
    }

    document.querySelector(".limit-error").style.cssText = "display: none;";

    if (workDetails.roles.length - 1 === roleLimit) {
      document.getElementById("add-role").disabled = true;
    } else {
      document.getElementById("add-role").disabled = false;
    }
  }

  return (
    <>
      <button type="button" id="add-work" onClick={() => addWork()}>
        Add Work Experience
      </button>
      <div className="limit-error">Work limit reached!</div>
      <form className="work-form" onSubmit={() => handleSubmit()}>
        <label htmlFor="company">Company name: </label>
        <input
          type="text"
          id="company"
          value={workDetails.company}
          onChange={(e) =>
            setWorkDetails({ ...workDetails, company: e.target.value })
          }
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
        <label htmlFor="start-work">Start date: </label>
        <input
          type="date"
          id="start-work"
          value={workDetails.startWork}
          onChange={(e) =>
            setWorkDetails({ ...workDetails, startWork: e.target.value })
          }
          required
        />
        <label htmlFor="end-work">Start date: </label>
        <input
          type="date"
          id="end-work"
          value={workDetails.endWork}
          onChange={(e) =>
            setWorkDetails({ ...workDetails, endWork: e.target.value })
          }
          required
        />
        <label htmlFor="role">Job roles:</label>
        <input
          type="text"
          id="role"
          value={role.value}
          onChange={(e) => setRole({ ...role, value: e.target.value })}
        />
        <button type="button" onClick={() => addRole()} id="add-role">
          Add role
        </button>
        <button type="button" onClick={() => updateRole()} id="update-role">
          Update role
        </button>
        <button type="submit" id="submit-work">
          Submit
        </button>
        <button id="update-work" type="button" onClick={() => updateWork()}>
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
        {experiences.map((exp) => (
          <Work
            key={exp.id}
            work={exp}
            editWork={editWork}
            deleteWork={deleteWork}
          />
        ))}
      </div>
    </>
  );
}
