import { useState } from "react";
import "../styles/Work.css";

export function Work(props) {
  const work = props.work;

  return (
<<<<<<< HEAD
    <div className="work-card">
=======
    <div key={work.id}>
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
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
