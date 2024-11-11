import { useState } from "react";

export function TechnicalSkillsResume({ appData }) {
  const skills = appData.skills.length ? appData.skills : [];

  return (
    <div className="technical-skills-resume">
      {skills.length > 0 && <span id="section-heading">TECHNICAL SKILLS</span>}
      <div className="skills-container">
        {skills.map((skillsGroup) => (
          <div key={skillsGroup.id}>
            <b>{skillsGroup.skillsType}</b>: {skillsGroup.skillsList}
          </div>
        ))}
      </div>
    </div>
  );
}
