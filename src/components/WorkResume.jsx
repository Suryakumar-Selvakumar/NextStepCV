import { useState } from "react";

export function Work() {
  const [workDetails, setWorkDetails] = useState({
    company: "",
    place: "",
    position: "",
    startWork: "",
    endWork: "",
    roles: [],
  });

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

  return (
    <div className="work-resume">
      <div>
        <p id="company-work">{workDetails.company}</p>
        <p id="place-work">{workDetails.place}</p>
      </div>
      <div>
        <p id="position-work">{workDetails.position}</p>
        <p id="start-end-date">
          {workDetails.startWork} &#8210; {renderEndDate()}
        </p>
      </div>
      <ul className="roles-resume">
        {workDetails.roles.map((role) => (
          <li key={role.id}>{role.value}</li>
        ))}
      </ul>
      <button type="button" onClick={() => handleEdit()}>
        Edit
      </button>
    </div>
  );
}
