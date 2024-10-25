import { useState } from "react";
import { Work } from "./Work";
import { Fragment } from "react";

export function WorkSection() {
  const [experiences, setExperiences] = useState([]);

  function addWork(limit) {
    if (experiences.length < limit) {
      setExperiences([...experiences, <Work key={crypto.randomUUID()} />]);
    }
  }

  function deleteWork(key) {
    setExperiences(experiences.filter((exp) => exp.key !== key));
  }

  return (
    <div className="work-section">
      <button type="button" id="add-work" onClick={() => addWork(2)}>
        Add Work Experience
      </button>
      {experiences.map((exp) => (
        <Fragment key={crypto.randomUUID()}>
          {exp}
          <button
            id="delete-work"
            type="button"
            onClick={() => deleteWork(exp.key)}
          >
            Delete Work experience
          </button>
        </Fragment>
      ))}
    </div>
  );
}
