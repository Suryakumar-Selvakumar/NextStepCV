import { useState } from "react";

export function Education() {
    const [school, setSchool] = useState("");
    const [titleStudy, setTitleStudy] = useState("");
    const [dateStudy, setDateStudy] = useState("");
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
            <label htmlFor="date-study">Date of Study: </label>
            <input
              type="date"
              id="date-study"
              value={dateStudy}
              onChange={(e) => setDateStudy(e.target.value)}
              required
            />
            <button type="submit">
              Submit
            </button>
          </form>
        );
      }
    
      if (displayState === "resume") {
        return (
          <div className="education">
            <div>
            <p id="school-education">{school}</p>
            <p id="title-study-education">{titleStudy}</p>
            </div>
              <p id="date-study">{dateStudy}</p>
            <button type="button" onClick={() => handleEdit()}>
              Edit
            </button>
          </div>
        );
      }
}
