import { useState } from "react";

function Education(schoolVar, titleStudyVar, dateStudyVar) {
    const [school, setSchool] = useState({schoolVar});
    const [titleStudy, setTitleStudy] = useState({titleStudyVar});
    const [dateStudy, setDateStudy] = useState({dateStudyVar});
    const [displayState, setDisplayState] = useState("form");

    function handleSubmit() {
        setDisplayState("resume");
      }
    
      function handleEdit() {
        setDisplayState("form");
      }
    
      if (displayState === "form") {
        return (
          <form className="education-form">
            <label htmlFor="school">School name: </label>
            <input
              type="text"
              id="name"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />
            <label htmlFor="title-study">Title of Study: </label>
            <input
              type="text"
              id="title-study"
              value={titleStudy}
              onChange={(e) => setTitleStudy(e.target.value)}
              required
            />
            <label htmlFor="date-study">Date of Study: </label>
            <input
              type="date"
              id="date-study"
              value={dateStudy}
              onChange={(e) => setDateStudy(e.target.value)}
              required
            />
            <button type="button" onClick={() => handleSubmit()}>
              Submit
            </button>
          </form>
        );
      }
    
      if (displayState === "resume") {
        return (
          <div className="education">
            <p id="school-education">{school}</p>
            <div>
              <p id="email-general">{email}</p>
              <p> | </p>
              <p id="ph-no-general">{phNo}</p>
            </div>
            <button type="button" onClick={() => handleEdit()}>
              Edit
            </button>
          </div>
        );
      }

}

// function Education() {
//   const [experiences, setExperiences] = useState([<Experiences key={0} />]);

  
// }

// export { General };
