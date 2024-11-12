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
    <div className="section-resume" style={{ gap: "3pt" }}>
      {projects.length > 0 && <span id="section-heading">PROJECTS</span>}
      <div className="section-container">
        {projects.map((proj) => {
          return (
            <div key={proj.id} style={{ lineHeight: "1.25" }}>
              <div className="div-styles">
                <p>
                  <span className="bold-styles">{proj.projectName}</span> |{" "}
                  <span className="italic-styles">{proj.techStack}</span>
                </p>
                <p style={{ fontSize: "12pt" }}>
                  {formatDate(proj.projectDate)}
                </p>
              </div>
              <ul
                className="list-styles"
                style={{
                  marginLeft: "9pt",
                  lineHeight: "1.25",
                }}
              >
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
