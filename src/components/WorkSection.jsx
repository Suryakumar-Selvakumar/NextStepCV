import { useState } from "react";
import { Work } from "./Work";
import { Fragment } from "react";

export function WorkSection() {
  const [experiences, setExperiences] = useState([<Work />]);

  function addWork(limit) {
    if (experiences.length < limit) {
      setExperiences([...experiences, <Work />]);
    }
  }

  return (
    <div className="work-section">
      <button type="button" id="add-work" onClick={() => addWork(2)}>
        Add Work Experience
      </button>
      {experiences.map((exp, index) => (
        <Fragment key={index}>{exp}</Fragment>
      ))}
    </div>
  );
}
