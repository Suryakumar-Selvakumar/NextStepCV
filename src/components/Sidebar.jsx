import { General } from "./General";
import { EducationSection } from "./EducationSection";
import { WorkSection } from "./WorkSection";
import { TechnicalSkills } from "./TechnicalSkills";
import { ProjectSection } from "./ProjectSection";
import "../styles/Sidebar.css";

export function Sidebar() {
  return (
    <>
      {/* <General /> has no limit*/}
      {/* <EducationSection /> limit state added */}
      {/* <TechnicalSkills /> limit state added */}
      <WorkSection />
      {/* <ProjectSection /> */}
    </>
  );
}
