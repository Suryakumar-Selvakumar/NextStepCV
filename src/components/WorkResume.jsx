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
    <div className="section-resume" style={{ gap: "3pt" }}>
      {experiences.length > 0 && <span id="section-heading">EXPERIENCE</span>}
      <div className="section-container">
        {experiences.map((work) => {
          return (
            <div key={work.id} style={{ lineHeight: "1.25" }}>
              <div className="div-styles" style={{ fontSize: "12pt" }}>
                <p className="bold-styles">{work.position}</p>
                <p>
                  {formatDate(work.startWork)} &#8211; {renderEndDate(work)}
                </p>
              </div>
              <div className="div-styles">
                <p className="italic-styles">{work.company}</p>
                <p className="italic-styles">{work.place}</p>
              </div>
              <ul
                className="list-styles"
                style={{ marginLeft: "9pt", lineHeight: "1.25" }}
              >
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
