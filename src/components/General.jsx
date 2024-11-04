import { useEffect, useState, useRef } from "react";
import "../styles/General.css";

export function General() {
  const updatedContactDetails = JSON.parse(
    localStorage.getItem("general")
  );
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

  useEffect(() => {
    localStorage.setItem("generalMainVisible", JSON.stringify(mainVisible));
  }, [mainVisible]);

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();

    // Add a formSubmitted prop to the contactDetails state
    setContactDetails({ ...contactDetails, formSubmitted: true });

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
        onClick={() => {
          setMainVisible(!mainVisible);
        }}
      >
        <h2
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
        >
          General Information
        </h2>
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
      <div className={mainVisible ? "general-main visible" : "general-main"}>
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
            autoComplete="on"
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
            autoComplete="on"
            required
          />
          <label htmlFor="linked-in">LinkedIn: </label>
          <input
            type="text"
            id="linked-in"
            value={contactDetails.linkedIn}
            onChange={(e) =>
              setContactDetails({
                ...contactDetails,
                linkedIn: e.target.value,
              })
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
        <div className="contact-details-card">
          <p>{contactDetails.name}</p>
          <p>{contactDetails.phNo}</p>
          <p>{contactDetails.email}</p>
          <p>{contactDetails.linkedIn}</p>
          <p>{contactDetails.gitHub}</p>
        </div>
      </div>
    </div>
  );
}
