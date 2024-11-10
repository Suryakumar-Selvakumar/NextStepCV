import "../styles/Resume.css";
import { GeneralResume } from "./GeneralResume";
import { EducationResume } from "./EducationResume";
import { TechnicalSkillsResume } from "./TechnicalSkillsResume";
import { WorkResume } from "./WorkResume";
import { ProjectResume } from "./ProjectResume";

export function Resume({ appData }) {
  return (
    <div className="resume-container">
      <div className="resume">
        <GeneralResume appData={appData} />
        <EducationResume appData={appData} />
        {/* <TechnicalSkillsResume />
        <WorkResume />
        <ProjectResume /> */}
      </div>
    </div>
  );
}
