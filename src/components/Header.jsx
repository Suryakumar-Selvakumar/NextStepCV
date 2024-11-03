import "../styles/Header.css";
import { useRef } from "react";

export function Header() {
  const modalContainerDiv = useRef(null);
  const resetModalDiv = useRef(null);

  function loadDummy() {
    const dummyContactDetails = {
      name: "John Smith",
      phNo: "123-456-7890",
      email: "JohnSmith@fakeemail.com",
      linkedIn: "www.linkedin.com/in/John-Smith-fake/",
      gitHub: "github.com/john-smith-fake",
      formSubmitted: false,
    };
    const dummyCourses = [
      {
        id: crypto.randomUUID(),
        school: "NorthEastern University",
        placeStudy: "Boston, Massachusetts",
        titleStudy: "Master's in Computer Science",
        startDateStudy: "",
        endDateStudy: "2025-05-17",
        gpa: 3.9,
        completedStudy: false,
      },
      {
        id: crypto.randomUUID(),
        school: "Purdue University",
        placeStudy: "West Lafayette, Indiana",
        titleStudy: "Bachelor's in Computer Science",
        startDateStudy: "2019-08-05",
        endDateStudy: "2023-05-08",
        gpa: 3.84,
        completedStudy: true,
      },
    ];
    const dummyTechnicalSkills = [
      {
        id: crypto.randomUUID(),
        skillsList: "Java, Python, C/C++, SQL, JavaScript, HTML/CSS",
        skillsType: "Programming Languages",
      },
      {
        id: crypto.randomUUID(),
        skillsList: "React, Node.js, Flask, WordPress, RESTAPI",
        skillsType: "Frameworks",
      },
      {
        id: crypto.randomUUID(),
        skillsList: "Git, Docker, VS Code, Anaconda, Google Cloud",
        skillsType: "Developer Tools",
      },
      {
        id: crypto.randomUUID(),
        skillsList: "Pandas, NumPy, Matplotlib",
        skillsType: "Libraries",
      },
    ];
    localStorage.clear();
    localStorage.setItem("contactDetails", JSON.stringify(dummyContactDetails));
    localStorage.setItem("courses", JSON.stringify(dummyCourses));
    localStorage.setItem("skills", JSON.stringify(dummyTechnicalSkills));
    location.reload();
  }

  function clearResume() {
    resetModalDiv.current.style.cssText = "visibility: visible;";
    modalContainerDiv.current.style.cssText = "visibility: visible;";
  }

  function resetResume() {
    localStorage.clear();
    modalContainerDiv.current.style.cssText = "visibility: hidden";
    resetModalDiv.current.style.cssText = "visibility: hidden";
    location.reload();
  }

  function cancelResetResume() {
    modalContainerDiv.current.style.cssText = "visibility: hidden";
    resetModalDiv.current.style.cssText = "visibility: hidden";
  }

  return (
    <>
      <header>
        <div className="logo">
          <img
            src="./public/next-gold.svg"
            alt="logo of the app"
            id="logo-img"
          />
          <p id="logo-text">NextStepCV</p>
        </div>
        <div className="header-buttons">
          <button onClick={() => loadDummy()} id="load-dummy">
            Load Dummy
          </button>
          <button onClick={() => clearResume()} id="clear-resume">
            Clear Resume
          </button>
          <button id="download-resume">Download Resume</button>
        </div>
      </header>
      <div className="modal-container" ref={modalContainerDiv}>
        <div className="reset-modal" ref={resetModalDiv}>
          <div className="warning-msg">
            <img
              src="./public/warning-gold.svg"
              alt="a warning logo"
              id="warning-img"
            />
            <p>This will Reset the Entire Resume!</p>
          </div>
          <div className="reset-modal-buttons">
            <button id="okay-reset" onClick={() => resetResume()}>
              Okay
            </button>
            <button id="cancel-reset" onClick={() => cancelResetResume()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
