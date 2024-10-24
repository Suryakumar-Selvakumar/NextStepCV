import { useState } from "react";

export function Education() {
  const [school, setSchool] = useState("");
  const [titleStudy, setTitleStudy] = useState("");
  const [startDateStudy, setStartDateStudy] = useState("");
  const [endDateStudy, setEndDateStudy] = useState("");
  const [displayState, setDisplayState] = useState("form");

  function handleSubmit() {
    setDisplayState("resume");
  }

  function handleEdit() {
    setDisplayState("form");
  }

  if (displayState === "form") {
    return (
      <form className="education-form" onSubmit={() => handleSubmit()}>
        <label htmlFor="school">School name: </label>
        <input
          type="text"
          id="name"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
        />
        <label htmlFor="title-study">Title of Study: </label>
        <input
          type="text"
          id="title-study"
          value={titleStudy}
          onChange={(e) => setTitleStudy(e.target.value)}
          required
        />
        <label htmlFor="start-date-study">Start Date: </label>
        <input
          type="date"
          id="start-date-study"
          value={startDateStudy}
          onChange={(e) => setStartDateStudy(e.target.value)}
          required
        />
        <label htmlFor="end-date-study">End Date: </label>
        <input
          type="date"
          id="end-date-study"
          value={endDateStudy}
          onChange={(e) => setEndDateStudy(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  }

  if (displayState === "resume") {
    return (
      <div className="education-resume">
        <div>
          <p id="school-education">{school}</p>
          <p id="title-study-education">{titleStudy}</p>
        </div>
        <p id="date-study-education">{startDateStudy} &#8210; {endDateStudy}</p>
        <button type="button" onClick={() => handleEdit()}>
          Edit
        </button>
      </div>
    );
  }
}
