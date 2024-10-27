import { useState } from "react";
import "../styles/work.css";

export function Work() {
  const [workDetails, setWorkDetails] = useState({
    company: "",
    place: "",
    position: "",
    startWork: "",
    endWork: "",
    roles: [],
  });
  const [role, setRole] = useState({ id: 0, value: "" });

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

  function handleSubmit() {
    document.getElementById("add-work").style.cssText = "display: inline;";
  }

  function handleEdit() {
    document.getElementById("add-work").style.cssText = "display: none;";
  }

  function editRole(roleId) {
    workDetails.roles.forEach((r) => {
      if (r.id === roleId) {
        setRole({ id: r.id, value: r.value });
      }
    });
    document.getElementById("update-role").style.cssText = "display: inline;";
    document.getElementById("add-role").style.cssText = "display: none;";
  }

  function addRole(limit) {
    if (workDetails.roles.length < limit && role.value !== "") {
      setWorkDetails({
        ...workDetails,
        roles: [
          ...workDetails.roles,
          { id: crypto.randomUUID(), value: role.value },
        ],
      });
    }
    setRole({ id: 0, value: "" });
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
    }
  }

  function deleteRole(roleId) {
    setWorkDetails({
      ...workDetails,
      roles: workDetails.roles.filter((role) => role.id !== roleId),
    });
    document.getElementById("update-role").style.cssText = "display: none;";
    document.getElementById("add-role").style.cssText = "display: inline;";
    setRole({ id: 0, value: "" });
  }

    return (
      <>
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
          {workDetails.roles.map((role) => (
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
