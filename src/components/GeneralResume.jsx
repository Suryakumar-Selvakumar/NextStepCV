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
      <div className="general-container">
        {contactDetails.phNo && (
          <div className="ph-no-resume">
            <p id="ph-no-general">{contactDetails.phNo}</p>
            <p> | </p>
          </div>
        )}
        {contactDetails.email && (
          <div className="email-resume">
            <a
              href={
                contactDetails.email.startsWith("http")
                  ? contactDetails.email
                  : `http://${contactDetails.email}`
              }
              id="email-general"
            >
              {contactDetails.email}
            </a>
            <p> | </p>
          </div>
        )}
        {contactDetails.linkedIn && (
          <div className="linked-in-resume">
            <a
              href={
                contactDetails.linkedIn.startsWith("http")
                  ? contactDetails.linkedIn
                  : `http://${contactDetails.linkedIn}`
              }
              id="linked-in-general"
            >
              {contactDetails.linkedIn}
            </a>
            <p> | </p>
          </div>
        )}
        {contactDetails.gitHub && (
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
        )}
      </div>
    </div>
  );
}
