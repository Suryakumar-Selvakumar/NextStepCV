import { useState } from "react";

export function EducationResume() {
  const [educationDetails, setEducationDetails] = useState({
    school: "",
    placeStudy: "",
    titleStudy: "",
    startDateStudy: "",
    endDateStudy: "",
    gpa: 0,
    completedStudy: true,
  });

  return (
    <div className="education-resume">
      <div>
        <p id="school-education">{educationDetails.school}</p>
        <p id="place-study-education">{educationDetails.placeStudy}</p>
      </div>
      <div>
        <p id="title-gpa-education">
          {educationDetails.titleStudy} <b>(GPA: {educationDetails.gpa}/4.0)</b>
        </p>
        {educationDetails.startDateStudy ? (
          <p id="date-study-education">
            {educationDetails.startDateStudy} &#8210;{" "}
            {educationDetails.endDateStudy}
          </p>
        ) : (
          <p id="date-study-education">
            Expected Graduation Year: {educationDetails.endDateStudy}
          </p>
        )}
      </div>
    </div>
  );
}
