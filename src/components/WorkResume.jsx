import { useState } from "react";
import { formatDate } from "./utils";

export function WorkResume({ appData }) {
  const experiences = appData.experiences.length ? appData.experiences : [];

  function renderEndDate(work) {
    if (work.stillWorking) {
      return "Present";
    } else {
      return formatDate(work.endWork);
    }
  }

  function formatRole(roleItem) {
    return roleItem
      .split(" ")
      .map((word, i) => {
        if (word.startsWith("*")) {
          let boldWord = word.split("").slice(1).join("");
          return <b key={i}>{boldWord}</b>;
        } else if (word.startsWith("_")) {
          return <i key={i}>{word.split("").slice(1).join("")}</i>;
        } else {
          return word;
        }
      })
      .map((word, i) => <span key={i}>{word} </span>);
  }

  return (
    <div className="work-resume">
      <span id="section-heading">EXPERIENCE</span>
      <div className="work-container">
        {experiences.map((work) => {
          return (
            <div key={work.id} className="work">
              <div className="work-position-dates">
                <p id="position-work">
                  <b>{work.position}</b>
                </p>
                <p id="start-end-date">
                  {formatDate(work.startWork)} &#8210; {renderEndDate(work)}
                </p>
              </div>
              <div className="work-company-place">
                <p id="company-work">
                  <i>{work.company}</i>
                </p>
                <p id="place-work">{work.place}</p>
              </div>
              <ul className="roles-resume">
                {work.roles.map((role) => (
                  <li key={role.id}>{formatRole(role.value)}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
