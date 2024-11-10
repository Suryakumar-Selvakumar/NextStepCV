import { useState } from "react";

export function WorkResume({ appData }) {
  const experiences = appData.experiences.length ? appData.experiences : [];

  function returnToday() {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  function renderEndDate(work) {
    const today = returnToday();
    if (work.endWork >= today && work.stillWorking) {
      return "Present";
    } else {
      return work.endWork;
    }
  }

  return (
    <div className="work-resume">
      {experiences.map((work) => {
        return (
          <div key={work.id}>
            <div>
              <p id="company-work">{work.company}</p>
              <p id="place-work">{work.place}</p>
            </div>
            <div>
              <p id="position-work">{work.position}</p>
              <p id="start-end-date">
                {work.startWork} &#8210; {renderEndDate(work)}
              </p>
            </div>
            <ul className="roles-resume">
              {work.roles.map((role) => (
                <li key={role.id}>{role.value}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
