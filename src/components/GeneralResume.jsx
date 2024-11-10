import { useState } from "react";

export function GeneralResume({ appData }) {
  const contactDetails = appData.contactDetails
    ? appData.contactDetails
    : {
        name: "",
        phNo: "",
        email: "",
        linkedIn: "",
        gitHub: "",
        formSubmitted: false,
      };

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
