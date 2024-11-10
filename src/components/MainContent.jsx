import { Sidebar } from "./Sidebar";
import { Resume } from "./Resume";
import { useEffect, useState } from "react";

export function MainContent() {
  const storedAppData = JSON.parse(localStorage.getItem("app-data"));
  const [appData, setAppData] = useState(
    storedAppData
      ? storedAppData
      : {
          contactDetails: {},
          courses: [],
          skills: [],
          experiences: [],
          projects: [],
        }
  );

  useEffect(() => {
    localStorage.setItem("app-data", JSON.stringify(appData));
  }, [appData]);

  return (
    <main>
      <Sidebar appData={appData} setAppData={setAppData} />
      <Resume appData={appData} />
    </main>
  );
}
