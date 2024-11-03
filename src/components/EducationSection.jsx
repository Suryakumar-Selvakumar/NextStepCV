import { Education } from "./Education";
import { useEffect, useState, useRef } from "react";
import "../styles/EducationSection.css";

export function EducationSection() {
  const storedCourses = JSON.parse(localStorage.getItem("courses"));
  const [courses, setCourses] = useState(storedCourses);
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
  const [limit, setLimit] = useState(3);

  // DOM refs
  const addEducationBtn = useRef(null);
  const educationForm = useRef(null);
  const submitEducationBtn = useRef(null);
  const updateEducationBtn = useRef(null);
  const limitErrorDiv = useRef(null);

  useEffect(() => {
    if (courses) localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  console.log(courses);

  function addEducation() {
    if (courses.length < limit) {
      addEducationBtn.current.style.cssText = "display: none;";
      educationForm.current.style.cssText = "display: block;";
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: block;";
    }
  }

  function editEducation(courseId) {
    // Hide the add education button
    addEducationBtn.current.style.cssText = "display: none;";

    // Update the styles of the submit and update buttons
    submitEducationBtn.current.style.cssText = "display: none;";
    updateEducationBtn.current.style.cssText = "display: inline;";

    // Display the form to allow editing of details
    educationForm.current.style.cssText = "display: block;";

    // Hide the limit reached error
    limitErrorDiv.current.style.cssText = "display: none;";

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

      updateEducationBtn.current.style.cssText = "display: none;";
      addEducationBtn.current.style.cssText = "display: inline;";
      submitEducationBtn.current.style.cssText = "display: inline;";
      educationForm.current.style.cssText = "display: none;";
    }
  }

  function deleteEducation(courseId) {
    setCourses(courses.filter((exp) => exp.id !== courseId));
    limitErrorDiv.current.style.cssText = "display: none;";

    if (educationDetails.id === courseId || courses.length === 1) {
      educationForm.current.style.cssText = "display: none;";
      addEducationBtn.current.style.cssText = "display: inline;";
      updateEducationBtn.current.style.cssText = "display: none;";
      submitEducationBtn.current.style.cssText = "display: inline;";

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
    }
  }

  function handleSubmit() {
    // Logic to add the education to the courses state
    setCourses([...courses, { ...educationDetails, id: crypto.randomUUID() }]);

    // Display the add button again
    addEducationBtn.current.style.cssText = "display: inline;";

    // Hide the form
    educationForm.current.style.cssText = "display: none;";

    // Display the class containing Education component cards
    document.querySelector(".education-cards").style.cssText =
      "display: block;";
  }

  function handleCancel() {
    // Hide the form
    educationForm.current.style.cssText = "display: none;";

    // Display the add button again
    addEducationBtn.current.style.cssText = "display: inline;";

    // Reset educationDetails
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
  }

  return (
    <>
      <button
        type="button"
        id="add-education"
        ref={addEducationBtn}
        onClick={() => addEducation()}
      >
        Add Education
      </button>
      <div className="limit-error" ref={limitErrorDiv}>
        Education limit reached!
      </div>
      <form
        className="education-form"
        ref={educationForm}
        onSubmit={() => handleSubmit()}
      >
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
        <button
          type="button"
          id="cancel-education"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit" ref={submitEducationBtn} id="submit-education">
          Submit
        </button>
        <button
          type="button"
          id="update-education"
          ref={updateEducationBtn}
          onClick={() => updateEducation()}
        >
          Update
        </button>
      </form>
      <div className="education-cards">
        {courses &&
          courses.map((exp) => (
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
