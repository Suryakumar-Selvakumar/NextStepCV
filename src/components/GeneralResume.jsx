import { useState } from "react";

export function GeneralResume({ appData }) {
  const contactDetails =
    Object.keys(appData.contactDetails).length > 0
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
    <div className="general-resume">
      <h1 id="name-general">{contactDetails.name}</h1>
      <div>
        {contactDetails.phNo && (
          <div className="ph-no-resume">
            <p id="ph-no-general">{contactDetails.phNo}</p>
            <p> | </p>
          </div>
        )}
        {contactDetails.email && (
          <div className="email-resume">
            <p id="email-general">{contactDetails.email}</p>
            <p> | </p>
          </div>
        )}
        {contactDetails.linkedIn && (
          <div className="linked-in-resume">
            <p id="linked-in-general">{contactDetails.linkedIn}</p>
            <p> | </p>
          </div>
        )}
        {contactDetails.gitHub && (
          <p id="github-general">{contactDetails.gitHub}</p>
        )}
      </div>
    </div>
  );
}
