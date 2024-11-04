import { useEffect, useState, useRef } from "react";
import "../styles/General.css";

export function General() {
  const updatedContactDetails = JSON.parse(
    localStorage.getItem("contactDetails")
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
  const editGeneralDetailsBtn = useRef(null);
  const generalForm = useRef(null);
  const generalMainDiv = useRef(null);
  const dropDownSvg = useRef(null);

  useEffect(() => {
    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
  }, [contactDetails]);

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();
    // Add a formSubmitted prop to the contactDetails state
    setContactDetails({ ...contactDetails, formSubmitted: true });

    // Display the editDetails button on submit
    editGeneralDetailsBtn.current.style.cssText = "display: block;";

    // Will hide the form
    generalForm.current.style.cssText = "display: none;";
  }

  function handleEdit() {
    // Hide the edit button after it was pressed
    editGeneralDetailsBtn.current.style.cssText = "display: none;";

    // Make formSubmitted false on edit
    setContactDetails({ ...contactDetails, formSubmitted: false });

    // Will display the form to update the details
    generalForm.current.style.cssText = "display: block;";
  }

  function handleCancel() {
    generalForm.current.style.cssText = "display: none;";
    editGeneralDetailsBtn.current.style.cssText = "display: inline;";
    setContactDetails({ ...contactDetails, formSubmitted: true });
  }

  return (
    <div className="general">
      <div
        className="general-header"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            if (generalMainDiv.current.classList.contains("visible")) {
              generalMainDiv.current.classList.add("not-visible");
              generalMainDiv.current.classList.remove("visible");
            } else {
              generalMainDiv.current.classList.remove("not-visible");
              generalMainDiv.current.classList.add("visible");
            }
            dropDownSvg.current.classList.toggle("rotate-dropdown");
          }
        }}
      >
        <h2
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              generalMainDiv.current.classList.toggle("visible");
              dropDownSvg.current.classList.toggle("rotate-dropdown");
            }
          }}
        >
          General Information
        </h2>
        <svg
          ref={dropDownSvg}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              generalMainDiv.current.classList.toggle("visible");
              dropDownSvg.current.classList.toggle("rotate-dropdown");
            }
          }}
          className="dropdown-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div className="general-main not-visible" ref={generalMainDiv}>
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
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={contactDetails.name}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, name: e.target.value })
            }
            required
          />
          <label htmlFor="ph-no">Phone Number: </label>
          <input
            type="tel"
            id="ph-no"
            value={contactDetails.phNo}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, phNo: e.target.value })
            }
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={contactDetails.email}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, email: e.target.value })
            }
            required
          />
          <label htmlFor="linked-in">LinkedIn: </label>
          <input
            type="text"
            id="linked-in"
            value={contactDetails.linkedIn}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, linkedIn: e.target.value })
            }
            required
          />
          <label htmlFor="github">GitHub: </label>
          <input
            type="text"
            id="github"
            value={contactDetails.gitHub}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, gitHub: e.target.value })
            }
            required
          />
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
        </form>
        {contactDetails.formSubmitted && (
          <div className="contact-details-card">
            <p>{contactDetails.name}</p>
            <p>{contactDetails.phNo}</p>
            <p>{contactDetails.email}</p>
            <p>{contactDetails.linkedIn}</p>
            <p>{contactDetails.gitHub}</p>
          </div>
        )}
      </div>
    </div>
  );
}
