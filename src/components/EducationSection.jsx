import { Education } from "./Education";
import { useState } from "react";
import "../styles/EducationSection.css";

export function EducationSection() {
  const [experiences, setExperiences] = useState([]);
  const [educationDetails, setEducationDetails] = useState({
    id: 0,
    school: "",
    placeStudy: "",
    titleStudy: "",
    startDateStudy: "",
    endDateStudy: "",
    gpa: 0,
    completedStudy: true,
  });

  function addEducation(limit) {
    if (experiences.length < limit) {
      document.getElementById("add-education").style.cssText = "display: none;";
      document.querySelector(".education-form").style.cssText =
        "display: block;";
    }
  }

  function handleSubmit() {
    // Logic to add the education to the experiences state
    setExperiences([
      ...experiences,
      { ...educationDetails, id: crypto.randomUUID() },
    ]);

    // Display the add button again
    document.getElementById("add-education").style.cssText = "display: inline;";

    // Store the data in localStorage

    // Hide the form
    document.querySelector(".education-form").style.cssText = "display: none;";

    // Display the class containing Education component cards
    document.querySelector(".education-cards").style.cssText =
      "display: block;";
  }

  function editEducation() {
    document.getElementById("add-education").style.cssText = "display: none;";
  }

  function deleteEducation(compId) {
    setExperiences(experiences.filter((exp) => exp.id !== compId));
    document.getElementById("add-education").style.cssText = "display: inline;";
  }

  return (
    <>
      <button type="button" id="add-education" onClick={() => addEducation(3)}>
        Add Education
      </button>
      <form className="education-form" onSubmit={() => handleSubmit()}>
        <label htmlFor="school">School name: </label>
        <input
          type="text"
          id="school"
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
            e.target.value > 0 &&
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
              startDateStudy: "",
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
        <label htmlFor="end-date-study">
          {educationDetails.completedStudy
            ? "End Date: "
            : "Expected Graduation Year: "}
        </label>
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
      <div className="education-cards">
        {experiences.map((exp) => (
          <Education
            key={exp.id}
            education={exp}
            editEducation={editEducation}
            deleteEducation={deleteEducation}
          />
        ))}
      </div>
    </>
  );
}
