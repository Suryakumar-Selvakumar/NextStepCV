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
    const dummyExperiences = [
      {
        company: "Google",
        endWork: "",
        id: crypto.randomUUID(),
        place: "San Francisco, California",
        position: "Software Engineer",
        roles: [
          {
            id: crypto.randomUUID(),
            value:
              "Worked with product managers to re-architect a multi-page web app into a single page web-app, boosting yearly revenue by $1.4M",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Constructed the logic for a streamlined ad-serving platform that scaled to our 35M users, which improved the page speed by 15% after implementation",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Tested software for bugs and operating speed, fixing bugs and documenting processes to increase efficiency by 18%",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Iterated platform for college admissions, collaborating with a group of 4 engineers to create features across the software",
          },
        ],
        startWork: "2023-06-05",
        stillWorking: true,
      },
      {
        company: "Tesla",
        endWork: "2022-06-05",
        id: crypto.randomUUID(),
        place: "Austin, Texas",
        position: "Software Engineer Intern",
        roles: [
          {
            id: crypto.randomUUID(),
            value:
              "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Explored ways to visualize GitHub Collaboration in a classroom setting",
          },
        ],
        startWork: "2022-08-05",
        stillWorking: false,
      },
    ];
    const dummyProjects = [
      {
        details: [
          {
            id: crypto.randomUUID(),
            value:
              "Developed a full-stack web application using with Flask serving a REST API with React as the frontend",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Implemented GitHub OAuth to get data from user’s repositories",
          },
          {
            id: crypto.randomUUID(),
            value: "Visualized GitHub data to show collaboration",
          },
          {
            id: crypto.randomUUID(),
            value: "Used Celery and Redis for asynchronous tasks",
          },
        ],
        id: crypto.randomUUID(),
        projectDate: "2024-06-07",
        projectName: "Gitlytics",
        techStack: "Python, Flask, React, PostgreSQL, Docker",
      },
      {
        details: [
          {
            id: crypto.randomUUID(),
            value:
              "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
          },
        ],
        id: crypto.randomUUID(),
        projectDate: "2023-11-21",
        projectName: "Simple Paintball",
        techStack: "Spigot API, Java, Maven, TravisCI, Git",
      },
    ];
    localStorage.clear();
    localStorage.setItem("contactDetails", JSON.stringify(dummyContactDetails));
    localStorage.setItem("courses", JSON.stringify(dummyCourses));
    localStorage.setItem("skills", JSON.stringify(dummyTechnicalSkills));
    localStorage.setItem("experiences", JSON.stringify(dummyExperiences));
    localStorage.setItem("projects", JSON.stringify(dummyProjects));
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
