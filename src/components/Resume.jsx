import "../styles/Resume.css";
import { GeneralResume } from "./GeneralResume";
import { EducationResume } from "./EducationResume";
import { TechnicalSkillsResume } from "./TechnicalSkillsResume";
import { WorkResume } from "./WorkResume";
import { ProjectResume } from "./ProjectResume";

export function Resume() {
  return (
    <div className="resume-container">
      <div className="resume">
        <GeneralResume />
        <EducationResume />
        {/* <TechnicalSkillsResume />
        <WorkResume />
        <ProjectResume /> */}
      </div>
    </div>
  );
}
