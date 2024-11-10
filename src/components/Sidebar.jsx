import { General } from "./General";
import { EducationSection } from "./EducationSection";
import { WorkSection } from "./WorkSection";
import { TechnicalSkills } from "./TechnicalSkills";
import { ProjectSection } from "./ProjectSection";
import "../styles/Sidebar.css";

export function Sidebar({ appData, setAppData }) {
  return (
    <div className="sidebar">
      <General appData={appData} setAppData={setAppData} />
      <EducationSection appData={appData} setAppData={setAppData} />
      <TechnicalSkills appData={appData} setAppData={setAppData} />
      <WorkSection appData={appData} setAppData={setAppData} />
      <ProjectSection appData={appData} setAppData={setAppData} />
    </div>
  );
}
