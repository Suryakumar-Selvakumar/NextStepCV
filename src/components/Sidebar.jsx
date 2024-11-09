import { General } from "./General";
import { EducationSection } from "./EducationSection";
import { WorkSection } from "./WorkSection";
import { TechnicalSkills } from "./TechnicalSkills";
import { ProjectSection } from "./ProjectSection";
import "../styles/Sidebar.css";

export function Sidebar(appData) {
  return (
    <div className="sidebar">
      <General contactDetails={appData.contactDetails}/>
      <EducationSection />
      <TechnicalSkills />
      <WorkSection />
      <ProjectSection />
    </div>
  );
}
