import { useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
  }, [contactDetails]);

  function handleSubmit() {
    // Add a formSubmitted prop to the contactDetails state
    setContactDetails({ ...contactDetails, formSubmitted: true });
    
    // Display the editDetails button on submit
    document.getElementById("edit-general-details").style.cssText =
      "display: block;";

    // Will hide the form
    document.querySelector(".general-form").style.cssText = "display: none;";
  }

  function handleEdit() {
    // Hide the edit button after it was pressed
    document.getElementById("edit-general-details").style.cssText =
      "display: none;";

    // Make formSubmitted false on edit
    setContactDetails({ ...contactDetails, formSubmitted: false });

    // Will display the form to update the details
    document.querySelector(".general-form").style.cssText = "display: block;";
  }

  function handleCancel() {
    document.querySelector(".general-form").style.cssText = "display: none;";
    document.getElementById("edit-general-details").style.cssText =
      "display: inline;";
    setContactDetails({ ...contactDetails, formSubmitted: true });
  }

  return (
    <>
      <button id="edit-general-details" onClick={() => handleEdit()}>
        {contactDetails.formSubmitted ? "Edit Details" : "Add Details"}
      </button>
      <form className="general-form" onSubmit={() => handleSubmit()}>
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
        <button type="button" onClick={() => handleCancel()}>
          Cancel
        </button>
        <button type="submit">Save</button>
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
    </>
  );
}