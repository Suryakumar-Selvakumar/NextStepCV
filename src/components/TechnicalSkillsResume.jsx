import { useState } from "react";

export function TechnicalSkillsResume({ appData }) {
  const skills = appData.skills.length ? appData.skills : [];

  return (
    <div className="technical-skills-resume">
      {skills.map((skillsGroup) => (
        <div key={skillsGroup.id}>
          {skillsGroup.skillsType}: {skillsGroup.skillsList}
        </div>
      ))}
    </div>
  );
}
