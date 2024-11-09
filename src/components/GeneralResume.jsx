import { useState } from "react";

export function GeneralResume() {
  const storedContactDetails = JSON.parse(localStorage.getItem("general"));

  const [contactDetails, setContactDetails] = useState(
    storedContactDetails
      ? storedContactDetails
      : {
          name: "",
          phNo: "",
          email: "",
          linkedIn: "",
          gitHub: "",
        }
  );

  if (JSON.stringify(contactDetails) !== JSON.stringify(storedContactDetails)) {
    setContactDetails(storedContactDetails);
  }

  return (
    <div className="general">
      <h1 id="name-general">{contactDetails.name}</h1>
      <div>
        <p id="ph-no-general">{contactDetails.phNo}</p>
        <p> | </p>
        <p id="email-general">{contactDetails.email}</p>
        <p> | </p>
        <p id="linked-in-general">{contactDetails.linkedIn}</p>
        <p> | </p>
        <p id="github-general">{contactDetails.gitHub}</p>
      </div>
    </div>
  );
}
