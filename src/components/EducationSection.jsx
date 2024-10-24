import { useState } from "react";
import { Education } from "./Education";
import { Fragment } from "react";

export function EducationSection() {
  const [experiences, setExperiences] = useState([<Education />]);

  function addEducation(limit) {
    if (experiences.length < limit) {
      setExperiences([...experiences, <Education />]);
    }
  }

  return (
    <div className="education-section">
      <button type="button" id="add-education" onClick={() => addEducation(3)}>
        Add Education
      </button>
      {experiences.map((exp, index) => (
        <Fragment key={index}>{exp}</Fragment>
      ))}
    </div>
  );
}
