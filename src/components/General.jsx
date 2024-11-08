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
  const [formVisible, setFormVisible] = useState(false);

  // DOM Refs
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
    editGeneralDetailsBtn.current.style.cssText = "display: flex;";
    generalForm.current.style.cssText = "margin-top: 0;margin-bottom: 0;";

    // Will hide the form
    setFormVisible(false);

    localStorage.setItem("general", JSON.stringify(contactDetails));
  }

  function handleEdit() {
    // Hide the edit button after it was pressed
    editGeneralDetailsBtn.current.style.cssText = "display: none;";

    // Add values to the input fields
    name.current.value = contactDetails.name;
    phNo.current.value = contactDetails.phNo;
    email.current.value = contactDetails.email;
    linkedIn.current.value = contactDetails.linkedIn;
    gitHub.current.value = contactDetails.gitHub;

    // Make formSubmitted false on edit
    setContactDetails({ ...contactDetails, formSubmitted: false });

    // Will display the form to update the details
    generalForm.current.style.cssText =
      "margin-top: 1.25rem;margin-bottom: 1rem;";
    setFormVisible(true);
  }

  function handleCancel() {
    generalForm.current.reset();
    setFormVisible(false);

    editGeneralDetailsBtn.current.style.cssText = "display: flex;";
    generalForm.current.style.cssText = "margin-top: 0;margin-bottom: 0;";
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
      <div className={mainVisible ? "general-main" : "general-main closed"}>
        <button
          style={{ display: "flex", alignItems: "center" }}
          id="edit-general-details"
          ref={editGeneralDetailsBtn}
          onClick={() => handleEdit()}
        >
          <svg
            style={{ width: "25px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M4 6H2V20C2 21.11 2.9 22 4 22H18V20H4V6M18.7 7.35L17.7 8.35L15.65 6.3L16.65 5.3C16.86 5.08 17.21 5.08 17.42 5.3L18.7 6.58C18.92 6.79 18.92 7.14 18.7 7.35M9 12.94L15.06 6.88L17.12 8.94L11.06 15H9V12.94M20 4L20 4L20 16L8 16L8 4H20M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
            />
          </svg>
          <span>Edit Details</span>
        </button>
        <form
          className={formVisible ? "general-form" : "general-form closed"}
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
