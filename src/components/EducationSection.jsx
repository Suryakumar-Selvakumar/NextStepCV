import { useState } from "react";
import { Education } from "./Education";
import { Fragment } from "react";

export function EducationSection() {
  const [experiences, setExperiences] = useState([<Education key={crypto.randomUUID()}/>]);

  function addEducation(limit) {
    if (experiences.length < limit) {
      setExperiences([...experiences, <Education key={crypto.randomUUID()}/>]);
    }
  }

  function deleteEducation(key) {
    setExperiences(experiences.filter((exp) => exp.key !== key));
  }

  return (
    <div className="education-section">
      <button type="button" id="add-education" onClick={() => addEducation(3)}>
        Add Education
      </button>
      {experiences.map((exp) => (
        <Fragment key={crypto.randomUUID()}>
          {exp}
          <button
            id="delete-education"
            type="button"
            onClick={() => deleteEducation(exp.key)}
          >
            Delete Education
          </button>
        </Fragment>
      ))}
    </div>
  );
}
