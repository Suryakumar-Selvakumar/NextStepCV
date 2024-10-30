import { Education } from "./Education";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import "../styles/EducationSection.css";

export function EducationSection() {
  const storedCourses = JSON.parse(localStorage.getItem("courses"));
  const [courses, setCourses] = useState(storedCourses ? storedCourses : []);
=======
import { useState } from "react";
import "../styles/EducationSection.css";

export function EducationSection() {
  const [experiences, setExperiences] = useState([]);
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
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
<<<<<<< HEAD
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  function addEducation() {
    if (courses.length < limit) {
      document.getElementById("add-education").style.cssText = "display: none;";
      document.querySelector(".education-form").style.cssText =
        "display: block;";
      document.querySelector(".limit-error").style.cssText = "display: none;";
    } else {
      document.querySelector(".limit-error").style.cssText = "display: block;";
    }
  }

  function editEducation(courseId) {
    // Hide the add education button
    document.getElementById("add-education").style.cssText = "display: none;";

    // Update the styles of the submit and update buttons
    document.getElementById("submit-education").style.cssText =
      "display: none;";
    document.getElementById("update-education").style.cssText =
      "display: inline;";

    // Display the form to allow editing of details
    document.querySelector(".education-form").style.cssText = "display: block;";

    // Hide the limit reached error
    document.querySelector(".limit-error").style.cssText = "display: none;";

    //Logic to update the form fields to include data from the item whose edit button was clicked on
    courses.forEach((ed) => {
      if (ed.id === courseId) {
        setEducationDetails({
          id: ed.id,
          school: ed.school,
          placeStudy: ed.placeStudy,
          titleStudy: ed.titleStudy,
          startDateStudy: ed.startDateStudy,
          endDateStudy: ed.endDateStudy,
          gpa: ed.gpa,
          completedStudy: ed.completedStudy,
        });
      }
    });
  }

  function updateEducation() {
    if (
      educationDetails.school !== "" &&
      educationDetails.placeStudy !== "" &&
      educationDetails.titleStudy !== "" &&
      educationDetails.endDateStudy !== "" &&
      educationDetails.gpa !== 0
    ) {
      const updatedCourses = courses.map((ed) => {
        if (ed.id === educationDetails.id) {
          return {
            ...ed,
            school: educationDetails.school,
            placeStudy: educationDetails.placeStudy,
            titleStudy: educationDetails.titleStudy,
            startDateStudy: educationDetails.startDateStudy,
            endDateStudy: educationDetails.endDateStudy,
            gpa: educationDetails.gpa,
            completedStudy: educationDetails.completedStudy,
          };
        } else {
          return ed;
        }
      });

      setCourses(updatedCourses);
      setEducationDetails({
        id: 0,
        school: "",
        placeStudy: "",
        titleStudy: "",
        startDateStudy: "",
        endDateStudy: "",
        gpa: 0,
        completedStudy: true,
      });

      document.getElementById("update-education").style.cssText =
        "display: none;";
      document.getElementById("add-education").style.cssText =
        "display: inline;";
      document.getElementById("submit-education").style.cssText =
        "display: block;";
      document.querySelector(".education-form").style.cssText =
        "display: none;";
    }
  }

  function deleteEducation(courseId) {
    setCourses(courses.filter((exp) => exp.id !== courseId));
    document.querySelector(".limit-error").style.cssText = "display: none;";
  }

  function handleSubmit() {
    // Logic to add the education to the courses state
    setCourses([...courses, { ...educationDetails, id: crypto.randomUUID() }]);
=======

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
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769

    // Display the add button again
    document.getElementById("add-education").style.cssText = "display: inline;";

<<<<<<< HEAD
=======
    // Store the data in localStorage

>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
    // Hide the form
    document.querySelector(".education-form").style.cssText = "display: none;";

    // Display the class containing Education component cards
    document.querySelector(".education-cards").style.cssText =
      "display: block;";
  }

<<<<<<< HEAD
  return (
    <>
      <button type="button" id="add-education" onClick={() => addEducation()}>
        Add Education
      </button>
      <div className="limit-error">Education limit reached!</div>
=======
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
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
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
<<<<<<< HEAD
        <button type="submit" id="submit-education">
          Submit
        </button>
        <button
          type="button"
          id="update-education"
          onClick={() => updateEducation()}
        >
          Update
        </button>
      </form>
      <div className="education-cards">
        {courses.map((exp) => (
=======
        <button type="submit">Submit</button>
      </form>
      <div className="education-cards">
        {experiences.map((exp) => (
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
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
