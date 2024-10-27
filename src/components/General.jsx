import { useState } from "react";
import "../styles/General.css";

export function General() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    phNo: "",
    email: "",
    linkedIn: "",
    gitHub: "",
  });

  function handleSubmit() {
    // Will hide the form
    document.querySelector(".general-form").style.cssText = "display: none;";
    // Will add the data to the local storage which will be retrieved by GeneralResume
    // localStorage will also save the data on double rendering due to strict mode

    // Will display the contact-details-card
    document.querySelector(".contact-details-card").style.cssText =
      "display: block;";
  }

  function handleEdit() {
    // Will display the form to update the details
    document.querySelector(".general-form").style.cssText = "display: block;";
  }

  return (
    <>
      <button id="edit-general-details" onClick={() => handleEdit()}>
        Edit Details
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
        <button type="submit">Submit</button>
      </form>
      <div className="contact-details-card">
        <p>{contactDetails.name}</p>
        <p>{contactDetails.phNo}</p>
        <p>{contactDetails.email}</p>
        <p>{contactDetails.linkedIn}</p>
        <p>{contactDetails.gitHub}</p>
      </div>
    </>
  );
}
