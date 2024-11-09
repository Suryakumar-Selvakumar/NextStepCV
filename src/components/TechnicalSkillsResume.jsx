import { useState } from "react";

export function TechnicalSkillsResume() {
  const [skills, setSkills] = useState([]);

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
