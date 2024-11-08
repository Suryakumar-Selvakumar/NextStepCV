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
  const [formVisible, setFormVisible] = useState(false);

  // DOM refs
  const addEducationBtn = useRef(null);
  const educationForm = useRef(null);
  const submitEducationBtn = useRef(null);
  const updateEducationBtn = useRef(null);
  const limitErrorDiv = useRef(null);
  const dropDownSvg = useRef(null);
  const educationCards = useRef(null);

  useEffect(() => {
    if (courses) localStorage.setItem("courses", JSON.stringify(courses));

    localStorage.setItem("coursesMainVisible", JSON.stringify(mainVisible));
  }, [courses, mainVisible]);

  function addEducation() {
    educationForm.current.reset();
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
      updateEducationBtn.current.style.cssText = "display: none;";
      submitEducationBtn.current.style.cssText = "display: flex;";
      educationForm.current.style.cssText =
        "margin-top: 1.25rem;margin-bottom: 1rem;";
      setFormVisible(true);
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: flex;";
    }
  }

  function editEducation(courseId) {
    // Hide the add education button
    addEducationBtn.current.style.cssText = "display: none;";

    // Update the styles of the submit and update buttons
    submitEducationBtn.current.style.cssText = "display: none;";
    updateEducationBtn.current.style.cssText = "display: flex;";

    // Display the form to allow editing of details
    educationForm.current.style.cssText =
      "margin-top: 1.25rem;margin-bottom: 1rem;";
    setFormVisible(true);

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
      addEducationBtn.current.style.cssText = "display: flex;";
      educationForm.current.style.cssText = "margin-top: 0;margin-bottom: 0;";
      submitEducationBtn.current.style.cssText = "display: flex;";
      setFormVisible(false);
      educationForm.current.reset();
    }
  }

  function deleteEducation(courseId) {
    setCourses(courses.filter((exp) => exp.id !== courseId));

    limitErrorDiv.current.style.cssText = "display: none;";

    if (educationDetails.id === courseId || courses.length === 1) {
      setFormVisible(false);
      educationForm.current.style.cssText = "margin-top: 0;margin-bottom: 0;";
      addEducationBtn.current.style.cssText = "display: flex;";
      updateEducationBtn.current.style.cssText = "display: none;";
      submitEducationBtn.current.style.cssText = "display: flex;";

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
    // Prevent form submission to avoid page reload
    e.preventDefault();

    // Logic to add the education to the courses state
    setCourses([...courses, { ...educationDetails, id: crypto.randomUUID() }]);

    // Display the add button again
    addEducationBtn.current.style.cssText = "display: flex;";
    educationForm.current.style.cssText = "margin-top: 0;margin-bottom: 0;";

    // Hide the form
    setFormVisible(false);
  }

  function handleCancel() {
    // Hide the form
    setFormVisible(false);

    // Display the add button again
    addEducationBtn.current.style.cssText = "display: flex;";
    educationForm.current.style.cssText = "margin-top: 0;margin-bottom: 0;";

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

  function returnToday() {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
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
      <div className={mainVisible ? "education-main" : "education-main closed"}>
        <button
          type="button"
          id="add-education"
          ref={addEducationBtn}
          onClick={() => addEducation()}
        >
          <svg
            style={{ width: "25px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>book-plus-outline</title>
            <path
              fill="white"
              d="M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V4H13V12L10.5 9.75L8 12V4H6V20H13.09M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z"
            />
          </svg>

          <span>Add Education</span>
        </button>
        <div className="limit-error" ref={limitErrorDiv}>
          <img src="/warning-gold.svg" alt="a warning logo" id="warning-img" />
          <span>Courses limit reached!</span>
        </div>
        <form
          className={formVisible ? "education-form" : "education-form closed"}
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
              style={{ width: !educationDetails.completedStudy && "50%" }}
            >
              <label htmlFor="gpa">GPA </label>
              <input
                type="number"
                id="gpa"
                min={0}
                max={4}
                step={0.01}
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
            {educationDetails.completedStudy && (
              <div className="education-start-date">
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
                  onFocus={() => {
                    let today = returnToday();
                    document
                      .getElementById("start-date-study")
                      .setAttribute("max", today);
                  }}
                  required
                />
              </div>
            )}
            <div
              className="education-end-date"
              style={{ width: !educationDetails.completedStudy && "50%" }}
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
                onFocus={() => {
                  if (educationDetails.completedStudy) {
                    document
                      .getElementById("end-date-study")
                      .setAttribute(
                        "min",
                        educationDetails.startDateStudy
                          ? educationDetails.startDateStudy
                          : "1950-11-31"
                      );
                    document
                      .getElementById("end-date-study")
                      .setAttribute("max", returnToday());
                  } else {
                    document
                      .getElementById("end-date-study")
                      .setAttribute("min", returnToday());
                    document
                      .getElementById("end-date-study")
                      .setAttribute("max", "2100-12-31");
                  }
                }}
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
        <div className="education-cards" ref={educationCards}>
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
