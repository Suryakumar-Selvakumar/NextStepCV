import { useState } from "react";
import { Education } from "./Education";
import { Fragment } from "react";

export function EducationSection() {
  const [experiences, setExperiences] = useState([]);

  function addEducation(limit) {
    if (experiences.length < limit) {
      setExperiences([...experiences, <Education key={crypto.randomUUID()} />]);
      document.getElementById("add-education").style.cssText = "display: none;";
    }
  }

  function deleteEducation(key) {
    setExperiences(experiences.filter((exp) => exp.key !== key));
    document.getElementById("add-education").style.cssText = "display: inline;";
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
