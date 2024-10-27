import { useState } from "react";

export function Education() {
  const [educationDetails, setEducationDetails] = useState({
    school: "",
    placeStudy: "",
    titleStudy: "",
    startDateStudy: "",
    endDateStudy: "",
    gpa: 0,
    completedStudy: true,
  });
  const [displayState, setDisplayState] = useState("form");

  function handleSubmit() {
    setDisplayState("resume");
    document.getElementById("add-education").style.cssText = "display: inline;";
  }

  function handleEdit() {
    setDisplayState("form");
    document.getElementById("add-education").style.cssText = "display: none;";
  }

  if (displayState === "form") {
    return (
      <form className="education-form" onSubmit={() => handleSubmit()}>
        <label htmlFor="school">School name: </label>
        <input
          type="text"
          id="name"
          value={educationDetails.school}
          onChange={(e) =>
            setEducationDetails({ ...educationDetails, school: e.target.value })
          }
          required
        />
        <label htmlFor="place-study">Place of Study: </label>
        <input
          type="text"
          id="place-study"
          value={educationDetails.placeStudy}
          onChange={(e) =>
            setEducationDetails({
              ...educationDetails,
              placeStudy: e.target.value,
            })
          }
          required
        />
        <label htmlFor="title-study">Title of Study: </label>
        <input
          type="text"
          id="title-study"
          value={educationDetails.titleStudy}
          onChange={(e) =>
            setEducationDetails({
              ...educationDetails,
              titleStudy: e.target.value,
            })
          }
          required
        />
        <label htmlFor="gpa">GPA: </label>
        <input
          type="number"
          id="gpa"
          value={educationDetails.gpa}
          onChange={(e) =>
            e.target.value < 4 &&
            setEducationDetails({
              ...educationDetails,
              gpa: e.target.value,
            })
          }
          required
        />
        <label htmlFor="completed-study">Completed Study? </label>
        <input
          type="checkbox"
          id="completed-study"
          checked={educationDetails.completedStudy}
          onChange={(e) =>
            setEducationDetails({
              ...educationDetails,
              completedStudy: e.target.checked,
            })
          }
        />
        {educationDetails.completedStudy && (
          <>
            <label htmlFor="start-date-study">Start Date: </label>
            <input
              type="date"
              id="start-date-study"
              value={educationDetails.startDateStudy}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  startDateStudy: e.target.value,
                })
              }
              required
            />
          </>
        )}
        <label htmlFor="end-date-study">{educationDetails.completedStudy? "End Date: " : "Expected Graduation Year: "}</label>
        <input
          type="date"
          id="end-date-study"
          value={educationDetails.endDateStudy}
          onChange={(e) =>
            setEducationDetails({
              ...educationDetails,
              endDateStudy: e.target.value,
            })
          }
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
          <p id="school-education">{educationDetails.school}</p>
          <p id="place-study-education">{educationDetails.placeStudy}</p>
        </div>
        <div>
          <p id="title-gpa-education">
            {educationDetails.titleStudy}{" "}
            <b>(GPA: {educationDetails.gpa}/4.0)</b>
          </p>
          <p id="date-study-education">
            {educationDetails.startDateStudy} &#8210;{" "}
            {educationDetails.endDateStudy}
          </p>
        </div>
        <button type="button" onClick={() => handleEdit()}>
          Edit
        </button>
      </div>
    );
  }
}
