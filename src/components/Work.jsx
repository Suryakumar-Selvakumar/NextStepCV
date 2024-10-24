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

    function returnToday() {
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    function renderEndDate() {
        const today = returnToday();
        if(endWork === today) {
            return "Present";
        } else {
            return endWork;
        }
    }

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
            <label htmlFor="role">Job roles: Click button to add more</label>
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
          <div className="work-resume">
            <div>
                <p id="company-work">{company}</p>
                <p id="place-work">{place}</p>
            </div>
            <div>
                <p id="position-work">{position}</p>
                <p id="start-end-date">{startWork} &#8210; {renderEndDate()}</p>
            </div>
            <ul className="roles-resume">
            {roles.map((role, index) => (
                <li key={index}>{role}</li>
            ))}
            </ul>
            <button type="button" onClick={() => handleEdit()}>
              Edit
            </button>
          </div>
        );
      }
}
