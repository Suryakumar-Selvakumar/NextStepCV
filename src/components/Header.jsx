import "../styles/Header.css";
import { useRef } from "react";

export function Header() {
  const modalContainerDiv = useRef(null);

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
    modalContainerDiv.style.cssText = "visibility: visible;";
  }

  function resetResume() {
    // localStorage.clear();
  }

  return (
    <>
      <header>
        <div className="logo">
          <img
            src="./public/nextGold.svg"
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
      <div className="modal-container" ref={null}>
        <div className="reset-modal">
          <p>This will Reset the Entire Resume!</p>
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
