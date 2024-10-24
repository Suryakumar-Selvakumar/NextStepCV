import { useState } from "react";

export default function General() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phNo, setPhNo] = useState("");
  const [displayState, setDisplayState] = useState("form");

  if (displayState === "form") {
    return (
      <form className="general-form">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="ph-no">Phone Number: </label>
        <input
          type="tel"
          id="ph-no"
          value={phNo}
          onChange={(e) => setPhNo(e.target.value)}
        />
      </form>
    );
  }

  
}
