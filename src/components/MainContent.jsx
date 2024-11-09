import { Sidebar } from "./Sidebar";
import { Resume } from "./Resume";
import { useState } from "react";

export function MainContent() {
  const storedAppData = JSON.parse(localStorage.getItem("app-data"));
  const [appData, setAppData] = useState(
    storedAppData
      ? storedAppData
      : {
          contactDetails: {
            name: "",
            phNo: "",
            email: "",
            linkedIn: "",
            gitHub: "",
            formSubmitted: false,
          },
          courses: [],
          skills: [],
          experiences: [],
          projects: [],
        }
  );

  return (
    <main>
      <Sidebar appData={appData} />
      <Resume appData={appData} />
    </main>
  );
}
