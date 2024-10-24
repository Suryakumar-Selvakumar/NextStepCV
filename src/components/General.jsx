import { useState } from "react";

function General() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phNo, setPhNo] = useState("");
  const [displayState, setDisplayState] = useState("form");

  function handleSubmit() {
    setDisplayState("resume");
  }

  function handleEdit() {
    setDisplayState("form");
  }

  if (displayState === "form") {
    return (
      <form className="general-form">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="ph-no">Phone Number: </label>
        <input
          type="tel"
          id="ph-no"
          value={phNo}
          onChange={(e) => setPhNo(e.target.value)}
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
      <div className="general">
        <h1 id="name-general">{name}</h1>
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

export { General };
