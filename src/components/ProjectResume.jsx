import { useState } from "react";
import { formatDate } from "./utils";

export function ProjectResume({ appData }) {
  const projects = appData.projects.length ? appData.projects : [];

  function formatDetail(detailItem) {
    return detailItem
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
    <div className="project-resume">
      {projects.length > 0 && <span id="section-heading">PROJECTS</span>}
      <div className="project-container">
        {projects.map((proj) => {
          return (
            <div key={proj.id}>
              {" "}
              <div className="project-name-tech-stack-date">
                <p id="name-tech-stack-project">
                  <b>{proj.projectName}</b> | <i>{proj.techStack}</i>
                </p>
                <p id="date-project">{formatDate(proj.projectDate)}</p>
              </div>
              <ul className="details-resume">
                {proj.details.map((dt) => (
                  <li key={dt.id}>{formatDetail(dt.value)}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
