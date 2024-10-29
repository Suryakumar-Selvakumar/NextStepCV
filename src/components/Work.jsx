import { useState } from "react";
import "../styles/Work.css";

export function Work(props) {
  const work = props.work;

  return (
    <div className="work-card" key={work.id}>
      <p>{work.company}</p>
      <p>{work.place}</p>
      <p>{work.position}</p>
      <button
        id="edit-work"
        type="button"
        onClick={() => props.editWork(work.id)}
      >
        Edit Work experience
      </button>
      <button
        id="delete-work"
        type="button"
        onClick={() => props.deleteWork(work.id)}
      >
        Delete Work experience
      </button>
    </div>
  );
}
