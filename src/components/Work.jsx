import { useState } from "react";

export function Education() {
    const [company, setCompany] = useState("");
    const [place, setPlace] = useState("");
    const [position, setPosition] = useState("");
    const [startWork, setStartWork] = useState("");
    const [endWork, setEndWork] = useState(""); 
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [displayState, setDisplayState] = useState("form");

    function handleRoleSubmit(limit) {
        if(roles.length < limit) {
            setRoles([...roles, role]);
        }
        setRole('');
    }

    function handleSubmit() {
        setDisplayState("resume");
      }
    
    function handleEdit() {
        setDisplayState("form");
      }
    
      if (displayState === "form") {
        return (
          <form className="work-form" onSubmit={() => handleSubmit()}>
            <label htmlFor="company">Company name: </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <label htmlFor="place">Company location: </label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
            <label htmlFor="position">Position: </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <label htmlFor="start-work">Start date: </label>
            <input
              type="date"
              id="start-work"
              value={startWork}
              onChange={(e) => setStartWork(e.target.value)}
              required
            />
            <label htmlFor="end-work">Start date: </label>
            <input
              type="date"
              id="end-work"
              value={endWork}
              onChange={(e) => setEndWork(e.target.value)}
              required
            />
            <form onSubmit={() => handleRoleSubmit(5)}>
            <label htmlFor="role">Job roles: Click to add more</label>
            <input 
              type="text" 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <button type="submit">Add role</button>
            </form>
            <button type="submit">
              Submit
            </button>
          </form>
        );
      }
    
      if (displayState === "resume") {
        return (
          <div className="education-resume">
            <div>
            <p id="school-education">{school}</p>
            <p id="title-study-education">{titleStudy}</p>
            </div>
              <p id="date-study">{dateStudy}</p>
            <button type="button" onClick={() => handleEdit()}>
              Edit
            </button>
          </div>
        );
      }
}
