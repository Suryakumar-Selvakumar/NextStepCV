import { useState } from "react";
import "./styles/App.css";
import { General } from "./components/General";
import { EducationSection } from "./components/EducationSection";
import { WorkSection } from "./components/WorkSection";
import { TechnicalSkills } from "./components/TechnicalSkills";
import { ProjectSection } from "./components/ProjectSection";

function App() {
  return (
    <>
      {/* <General /> */}
      <EducationSection />
      {/* <TechnicalSkills /> */}
      {/* <WorkSection />
      <ProjectSection /> */}
    </>
  );
}

export default App;
