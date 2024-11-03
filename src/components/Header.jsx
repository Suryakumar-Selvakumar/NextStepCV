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
    localStorage.clear();
    localStorage.setItem("contactDetails", JSON.stringify(dummyContactDetails));
  }

  function clearResume() {
    resetModalDiv.current.style.cssText = "visibility: visible;";
    modalContainerDiv.current.style.cssText = "visibility: visible;";
  }

  function resetResume() {
    localStorage.clear();
    modalContainerDiv.current.style.cssText = "visibility: hidden";
    resetModalDiv.current.style.cssText = "visibility: hidden";
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
          <button onClick={() => loadDummy()}>Load Dummy</button>
          <button onClick={() => clearResume()}>Clear Resume</button>
          <button>Download Resume</button>
        </div>
      </header>
      <div className="modal-container" ref={modalContainerDiv}>
        <div className="reset-modal" ref={resetModalDiv}>
          <div className="warning-msg">
            <img
              src="./public/warning-blue.svg"
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
