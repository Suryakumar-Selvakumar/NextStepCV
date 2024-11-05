import { Education } from "./Education";
import { useEffect, useState, useRef } from "react";
import "../styles/EducationSection.css";

export function EducationSection() {
  const storedCourses = JSON.parse(localStorage.getItem("courses"));
  const storedMainVisible = JSON.parse(
    localStorage.getItem("coursesMainVisible")
  );
  const [courses, setCourses] = useState(storedCourses ? storedCourses : []);
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
  const [mainVisible, setMainVisible] = useState(
    storedMainVisible ? storedMainVisible : false
  );
  const [showStartDate, setShowStartDate] = useState(true);

  // DOM refs
  const addEducationBtn = useRef(null);
  const educationForm = useRef(null);
  const submitEducationBtn = useRef(null);
  const updateEducationBtn = useRef(null);
  const limitErrorDiv = useRef(null);
  const dropDownSvg = useRef(null);

  useEffect(() => {
    if (courses) localStorage.setItem("courses", JSON.stringify(courses));

    localStorage.setItem("coursesMainVisible", JSON.stringify(mainVisible));
  }, [courses, mainVisible]);

  function addEducation() {
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
    if (courses.length < limit) {
      addEducationBtn.current.style.cssText = "display: none;";
      educationForm.current.style.cssText = "display: flex;";
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
    educationForm.current.style.cssText = "display: flex;";

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
        if (ed.completedStudy) {
          setShowStartDate(true);
        } else {
          setShowStartDate(false);
        }
      }
    });
  }

  function updateEducation(e) {
    e.preventDefault();
    if (
      educationDetails.school !== "" &&
      educationDetails.placeStudy !== "" &&
      educationDetails.titleStudy !== "" &&
      educationDetails.endDateStudy !== "" &&
      educationDetails.gpa !== 0 &&
      (educationDetails.completedStudy ? educationDetails.startDateStudy : true)
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

  function handleSubmit(e) {
    console.log(1);
    // Prevent form submission to avoid page reload
    e.preventDefault();

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
    <div className="education">
      <div
        className="education-header"
        onClick={() => {
          setMainVisible(!mainVisible);
        }}
      >
        <h3
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
        >
          Education
        </h3>
        <svg
          ref={dropDownSvg}
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
          className={
            mainVisible ? "dropdown-svg rotate-dropdown" : "dropdown-svg"
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div
        className={mainVisible ? "education-main visible" : "education-main"}
      >
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
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="education-school">
            <label htmlFor="school">School name </label>
            <input
              type="text"
              id="school"
              value={educationDetails.school}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  school: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="education-place-study">
            <label htmlFor="place-study">Place of Study </label>
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
          </div>
          <div className="education-title-study">
            <label htmlFor="title-study">Title of Study </label>
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
          </div>
          <div className="education-gpa-start-end">
            <div
              className="education-gpa"
              style={{ width: !educationDetails.completedStudy && "350px" }}
            >
              <label htmlFor="gpa">GPA </label>
              <input
                type="number"
                id="gpa"
                value={educationDetails.gpa}
                onChange={(e) =>
                  setEducationDetails({
                    ...educationDetails,
                    gpa: e.target.value,
                  })
                }
                pattern="(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)"
                required
              />
            </div>
            {educationDetails.completedStudy && showStartDate && (
              <div
                className="education-start-date"
                style={{
                  width: "200px",
                }}
              >
                <label htmlFor="start-date-study">Start Date </label>
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
              </div>
            )}
            <div
              className="education-end-date"
              style={{ width: !educationDetails.completedStudy && "350px" }}
            >
              <label htmlFor="end-date-study">
                {educationDetails.completedStudy
                  ? "End Date "
                  : "Expected Graduation Year "}
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
            </div>
          </div>
          <div>
            <label htmlFor="completed-study">Completed Study? </label>
            <input
              type="checkbox"
              id="completed-study"
              checked={educationDetails.completedStudy}
              onChange={(e) => {
                setEducationDetails({
                  ...educationDetails,
                  startDateStudy: "",
                  completedStudy: e.target.checked,
                });
                setTimeout(() => setShowStartDate(!showStartDate), 250);
              }}
            />
          </div>
          <div className="education-form-btns">
            <button
              type="button"
              id="cancel-education"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              type="submit"
              ref={submitEducationBtn}
              id="submit-education"
            >
              Submit
            </button>
            <button
              type="submit"
              id="update-education"
              ref={updateEducationBtn}
              onClick={(e) => updateEducation(e)}
            >
              Update
            </button>
          </div>
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
      </div>
    </div>
  );
}
