import { useEffect, useState, useRef } from "react";
import "../styles/General.css";

export function General() {
  const updatedContactDetails = JSON.parse(localStorage.getItem("general"));
  const storedMainVisible = JSON.parse(
    localStorage.getItem("generalMainVisible")
  );
  const [contactDetails, setContactDetails] = useState(
    updatedContactDetails
      ? updatedContactDetails
      : {
          name: "",
          phNo: "",
          email: "",
          linkedIn: "",
          gitHub: "",
          formSubmitted: false,
        }
  );
  const [mainVisible, setMainVisible] = useState(
    storedMainVisible ? storedMainVisible : false
  );
  const editGeneralDetailsBtn = useRef(null);
  const generalForm = useRef(null);
  const dropDownSvg = useRef(null);
  const name = useRef(null);
  const phNo = useRef(null);
  const email = useRef(null);
  const linkedIn = useRef(null);
  const gitHub = useRef(null);

  useEffect(() => {
    localStorage.setItem("generalMainVisible", JSON.stringify(mainVisible));
  }, [mainVisible]);

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();

    // Add a formSubmitted prop to the contactDetails state
    setContactDetails({
      name: name.current.value,
      phNo: phNo.current.value,
      email: email.current.value,
      linkedIn: linkedIn.current.value,
      gitHub: gitHub.current.value,
      formSubmitted: true,
    });

    // Display the editDetails button on submit
    editGeneralDetailsBtn.current.style.cssText = "display: block;";

    // Will hide the form
    generalForm.current.style.cssText = "display: none;";

    localStorage.setItem("general", JSON.stringify(contactDetails));
  }

  function handleEdit() {
    // Hide the edit button after it was pressed
    editGeneralDetailsBtn.current.style.cssText = "display: none;";

    // Make formSubmitted false on edit
    setContactDetails({ ...contactDetails, formSubmitted: false });

    // Will display the form to update the details
    generalForm.current.style.cssText = "display: flex;";
  }

  function handleCancel() {
    generalForm.current.reset();
    generalForm.current.style.cssText = "display: none;";
    editGeneralDetailsBtn.current.style.cssText = "display: inline;";
    setContactDetails({ ...contactDetails, formSubmitted: true });
  }

  return (
    <div className="general">
      <div
        className="general-header"
        onClick={() => {
          setMainVisible(!mainVisible);
        }}
      >
        <h3
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
        >
          General Information
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
            fill="rgb(67, 67, 67)"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div
        className={mainVisible ? "general-main visible" : "general-main"}
        // style={{ padding: mainVisible && "1rem" }}
      >
        <button
          id="edit-general-details"
          ref={editGeneralDetailsBtn}
          onClick={() => handleEdit()}
        >
          {contactDetails.formSubmitted ? "Edit Details" : "Add Details"}
        </button>
        <form
          className="general-form"
          ref={generalForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="general-name">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              id="name"
              ref={name}
              autoComplete="on"
              required
            />
          </div>
          <div className="general-ph-no">
            <label htmlFor="ph-no">Phone Number </label>
            <input type="tel" id="ph-no" ref={phNo} required />
          </div>
          <div className="general-email">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              ref={email}
              autoComplete="on"
              required
            />
          </div>
          <div className="general-linked-in">
            <label htmlFor="linked-in">LinkedIn </label>
            <input type="text" id="linked-in" ref={linkedIn} required />
          </div>
          <div className="general-github">
            <label htmlFor="github">GitHub </label>
            <input type="text" id="github" ref={gitHub} required />
          </div>
          <div className="general-form-btns">
            <button
              type="button"
              id="cancel-general"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button type="submit" id="submit-general">
              Save
            </button>
          </div>
        </form>
        {contactDetails.formSubmitted && (
          <div className="contact-details-card">
            {contactDetails.name && <p>{contactDetails.name}</p>}
            {contactDetails.phNo && <p>{contactDetails.phNo}</p>}
            {contactDetails.email && <p>{contactDetails.email}</p>}
            {contactDetails.linkedIn && <p>{contactDetails.linkedIn}</p>}
            {contactDetails.gitHub && <p>{contactDetails.gitHub}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
