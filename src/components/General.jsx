import { useState } from "react";

function General() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    phNo: "",
    email: "",
    linkedIn: "",
    gitHub: "",
  });

  function handleSubmit() {
  }

  function handleEdit() {
  }

    return (
      <form className="general-form" onSubmit={() => handleSubmit()}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={contactDetails.name}
          onChange={(e) =>
            setContactDetails({ ...contactDetails, name: e.target.value })
          }
          required
        />
        <label htmlFor="ph-no">Phone Number: </label>
        <input
          type="tel"
          id="ph-no"
          value={contactDetails.phNo}
          onChange={(e) =>
            setContactDetails({ ...contactDetails, phNo: e.target.value })
          }
          required
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={contactDetails.email}
          onChange={(e) =>
            setContactDetails({ ...contactDetails, email: e.target.value })
          }
          required
        />
        <label htmlFor="linked-in">LinkedIn: </label>
        <input
          type="text"
          id="linked-in"
          value={contactDetails.linkedIn}
          onChange={(e) =>
            setContactDetails({ ...contactDetails, linkedIn: e.target.value })
          }
          required
        />
        <label htmlFor="github">GitHub: </label>
        <input
          type="text"
          id="github"
          value={contactDetails.gitHub}
          onChange={(e) =>
            setContactDetails({ ...contactDetails, gitHub: e.target.value })
          }
          required
        />
        <button type="submit">Submit</button>
      </form>
    );

}

export { General };
