import { useState } from "react";
import "../styles/work.css";

export function Work(props) {
  const workDetails = props.workDetails;

  return (
    <div key={workDetails.id}>
      <p>{workDetails.company}</p>
      <p>{workDetails.place}</p>
      <p>{workDetails.position}</p>
      <button
        id="edit-work"
        type="button"
        onClick={() => props.editWork(workDetails.id)}
      >
        Edit Work experience
      </button>
      <button
        id="delete-work"
        type="button"
        onClick={() => props.deleteWork(workDetails.id)}
      >
        Delete Work experience
      </button>
    </div>
  );
}
