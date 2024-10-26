import { useState } from "react";
import "./styles/App.css";
import { General } from "./components/General";
import { EducationSection } from "./components/EducationSection";
import { WorkSection } from "./components/WorkSection";
import { TechnicalSkills } from "./components/TechnicalSkills";
import { Project } from "./components/Project";

function App() {
  return (
    <>
      <General />
      <EducationSection />
      <TechnicalSkills />
      <WorkSection />
      <Project />
    </>
  );
}

export default App;
