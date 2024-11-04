import "../styles/Header.css";
import { useRef, useState } from "react";

export function Header() {
  let [view, setView] = useState(false);
  const modalContainerDiv = useRef(null);
  const resetModalDiv = useRef(null);

  function loadDummy() {
    const dummyContactDetails = {
      name: "John Smith",
      phNo: "123-456-7890",
      email: "JohnSmith@fakeemail.com",
      linkedIn: "www.linkedin.com/in/John-Smith-fake/",
      gitHub: "github.com/john-smith-fake",
      formSubmitted: true,
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
              "Built a full-stack web app to allow users to simulate and visualize outcomes of poker hands against opponents of different play styles using open source cards.js on the front-end",
          },
          {
            id: crypto.randomUUID(),
            value:
              "Utilized sci-kit learn in Python to simulate possible outcomes under different scenarios that the user chose",
          },
        ],
        id: crypto.randomUUID(),
        projectDate: "2024-01-21",
        projectName: "Poker Simulation",
        techStack: "JavaScript, Python, Git",
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
        projectDate: "2023-08-21",
        projectName: "Simple Paintball",
        techStack: "Spigot API, Java, Maven, TravisCI, Git",
      },
    ];
    localStorage.setItem("general", JSON.stringify(dummyContactDetails));
    localStorage.setItem("courses", JSON.stringify(dummyCourses));
    localStorage.setItem("skills", JSON.stringify(dummyTechnicalSkills));
    localStorage.setItem("experiences", JSON.stringify(dummyExperiences));
    localStorage.setItem("projects", JSON.stringify(dummyProjects));
    location.reload();
  }

  function clearResume() {
    setView(true);
    modalContainerDiv.current.style.cssText = "visibility: visible;";
  }

  function resetResume() {
    localStorage.setItem(
      "general",
      JSON.stringify({
        name: "",
        phNo: "",
        email: "",
        linkedIn: "",
        gitHub: "",
        formSubmitted: false,
      })
    );
    localStorage.setItem("courses", JSON.stringify([]));
    localStorage.setItem("skills", JSON.stringify([]));
    localStorage.setItem("experiences", JSON.stringify([]));
    localStorage.setItem("projects", JSON.stringify([]));
    setView(false);
    setTimeout(() => {
      modalContainerDiv.current.style.cssText = "visibility: hidden";
      location.reload();
    }, 500);
  }

  function cancelResetResume() {
    setView(false);
    setTimeout(() => {
      modalContainerDiv.current.style.cssText = "visibility: hidden";
    }, 500);
  }

  return (
    <>
      <header>
        <div className="logo">
          <p id="logo-text">NextStep</p>
          <img
            src="/next-gold.svg"
            alt="logo of the app"
            id="logo-img"
          />
        </div>
        <div className="header-buttons">
          <button onClick={() => loadDummy()} id="load-dummy">
            <svg
              className="svg-header-btns"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M23 19L20 16V18H16V20H20V22L23 19M13.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V13.1C19.7 13 19.3 13 19 13S18.3 13 18 13.1V9H13V4H6V20H13.1C13.2 20.7 13.5 21.4 13.8 22M8 12H16V13.8C15.9 13.9 15.8 13.9 15.7 14H8V12M8 16H13V18H8V16Z"
              />
            </svg>
            <span>Load Dummy</span>
          </button>
          <button onClick={() => clearResume()} id="clear-resume">
            <svg
              className="svg-header-btns"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M6 2C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H13C12.63 21.4 12.34 20.72 12.17 20H6V4H13V9H18V12H18.5C19 12 19.5 12.06 20 12.17V8L14 2H6M12 18C12.07 17.3 12.24 16.62 12.5 16H8V18H12M13.81 14C14.43 13.36 15.17 12.85 16 12.5V12H8V14H13.81M18 14.5C19.11 14.5 20.11 14.95 20.83 15.67L22 14.5V18.5H18L19.77 16.73C19.32 16.28 18.69 16 18 16C16.62 16 15.5 17.12 15.5 18.5C15.5 19.88 16.62 21 18 21C18.82 21 19.54 20.61 20 20H21.71C21.12 21.47 19.68 22.5 18 22.5C15.79 22.5 14 20.71 14 18.5C14 16.29 15.79 14.5 18 14.5Z"
              />
            </svg>
            <span>Reset</span>
          </button>
          <button id="download-resume">
            <svg
              className="svg-header-btns"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </header>
      <div className="modal-container" ref={modalContainerDiv}>
        <div
          className="reset-modal"
          ref={resetModalDiv}
          style={{ top: view && "250px", opacity: view && 1 }}
        >
          <div className="warning-msg">
            <img
              src="./public/warning-gold.svg"
              alt="a warning logo"
              id="warning-img"
            />
            <p>This will Reset the entire Resume!</p>
          </div>
          <div className="reset-modal-buttons">
            <button id="cancel-reset" onClick={() => cancelResetResume()}>
              Cancel
            </button>
            <button id="okay-reset" onClick={() => resetResume()}>
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
