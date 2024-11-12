import { useState } from "react";

export function TechnicalSkillsResume({ appData }) {
  const skills = appData.skills.length ? appData.skills : [];

  return (
    <div className="section-resume" style={{ gap: "3pt" }}>
      {skills.length > 0 && <span id="section-heading">TECHNICAL SKILLS</span>}
      <div
        className="section-container"
        style={{ lineHeight: "1.25", gap: "0.25em" }}
      >
        {skills.map((skillsGroup) => (
          <div key={skillsGroup.id}>
            <span className="bold-styles">{skillsGroup.skillsType}</span>:{" "}
            {skillsGroup.skillsList}
          </div>
        ))}
      </div>
    </div>
  );
}
