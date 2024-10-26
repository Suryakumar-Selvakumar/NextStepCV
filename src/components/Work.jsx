import { useState } from "react";
import "../styles/work.css";

export function Work() {
  const [company, setCompany] = useState("");
  const [place, setPlace] = useState("");
  const [position, setPosition] = useState("");
  const [startWork, setStartWork] = useState("");
  const [endWork, setEndWork] = useState("");
  const [role, setRole] = useState({ id: 0, value: "" });
  const [roles, setRoles] = useState([]);
  const [displayState, setDisplayState] = useState("form");

  function returnToday() {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  function renderEndDate() {
    const today = returnToday();
    if (endWork === today) {
      return "Present";
    } else {
      return endWork;
    }
  }

  function handleSubmit() {
    setDisplayState("resume");
    document.getElementById("add-work").style.cssText = "display: inline;";
  }

  function handleEdit() {
    setDisplayState("form");
    document.getElementById("add-work").style.cssText = "display: none;";
  }

  function editRole(roleId) {
    roles.forEach((r) => {
      if (r.id === roleId) {
        setRole({ id: r.id, value: r.value });
      }
    });
    document.getElementById("update-role").style.cssText = "display: inline;";
    document.getElementById("add-role").style.cssText = "display: none;";
  }

  function addRole(limit) {
    if (roles.length < limit && role.value !== "") {
      setRoles([...roles, { id: crypto.randomUUID(), value: role.value }]);
    }
    setRole({ id: 0, value: "" });
  }

  function updateRole() {
    if (role.value !== "") {
      const updatedRoles = roles.map((r) => {
        if (r.id === role.id) {
          return { ...r, value: role.value };
        } else {
          return r;
        }
      });
      setRoles(updatedRoles);
      setRole({ id: 0, value: "" });
      document.getElementById("update-role").style.cssText = "display: none;";
      document.getElementById("add-role").style.cssText = "display: inline;";
    }
  }

  function deleteRole(roleId) {
    setRoles(roles.filter((role) => role.id !== roleId));
    document.getElementById("update-role").style.cssText = "display: none;";
    document.getElementById("add-role").style.cssText = "display: inline;";
    setRole({ id: 0, value: "" });
  }

  if (displayState === "form") {
    return (
      <>
        <form className="work-form" onSubmit={() => handleSubmit()}>
          <label htmlFor="company">Company name: </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <label htmlFor="place">Company location: </label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
          <label htmlFor="position">Position: </label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <label htmlFor="start-work">Start date: </label>
          <input
            type="date"
            id="start-work"
            value={startWork}
            onChange={(e) => setStartWork(e.target.value)}
            required
          />
          <label htmlFor="end-work">Start date: </label>
          <input
            type="date"
            id="end-work"
            value={endWork}
            onChange={(e) => setEndWork(e.target.value)}
            required
          />
          <label htmlFor="role">
            Job roles: Click Add Role to add roles and Update Role to update
            existing role
          </label>
          <input
            type="text"
            id="role"
            value={role.value}
            onChange={(e) => setRole({ ...role, value: e.target.value })}
          />
          <button type="button" onClick={() => addRole(4)} id="add-role">
            Add role
          </button>
          <button type="button" onClick={() => updateRole()} id="update-role">
            Update role
          </button>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              {role.value}
              <button
                type="button"
                id="edit-role-btn"
                onClick={() => editRole(role.id)}
              >
                Edit Role
              </button>
              <button
                type="button"
                id="delete-role-btn"
                onClick={() => deleteRole(role.id)}
              >
                Delete Role
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (displayState === "resume") {
    return (
      <div className="work-resume">
        <div>
          <p id="company-work">{company}</p>
          <p id="place-work">{place}</p>
        </div>
        <div>
          <p id="position-work">{position}</p>
          <p id="start-end-date">
            {startWork} &#8210; {renderEndDate()}
          </p>
        </div>
        <ul className="roles-resume">
          {roles.map((role) => (
            <li key={role.id}>{role.value}</li>
          ))}
        </ul>
        <button type="button" onClick={() => handleEdit()}>
          Edit
        </button>
      </div>
    );
  }
}
