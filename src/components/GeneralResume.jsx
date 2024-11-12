import { useState } from "react";

export function GeneralResume({ appData }) {
  const contactDetails =
    appData.contactDetails && Object.keys(appData.contactDetails).length > 0
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
      <div className="general-container">
        <p id="general-details">
          {contactDetails.phNo} |{" "}
          <a
            href={
              contactDetails.email.startsWith("http")
                ? contactDetails.email
                : `http://${contactDetails.email}`
            }
            id="email-general"
          >
            {contactDetails.email}
          </a>{" "}
          |{" "}
          <a
            href={
              contactDetails.linkedIn.startsWith("http")
                ? contactDetails.linkedIn
                : `http://${contactDetails.linkedIn}`
            }
            id="linked-in-general"
          >
            {contactDetails.linkedIn}
          </a>{" "}
          |{" "}
          <a
            href={
              contactDetails.gitHub.startsWith("http")
                ? contactDetails.gitHub
                : `http://${contactDetails.gitHub}`
            }
            id="github-general"
          >
            {contactDetails.gitHub}
          </a>
        </p>
      </div>
    </div>
  );
}
