import { useState } from "react";
import "../styles/technicalSkills.css";

export function TechnicalSkills() {
  const [skills, setSkills] = useState([]);
  const [skillsGroup, setSkillsGroup] = useState({
    id: 0,
    skillsType: "",
    skillsList: "",
  });
  const [displayState, setDisplayState] = useState("form");

  function handleSubmit() {
    setDisplayState("resume");
  }

  function handleEdit() {
    setDisplayState("form");
  }

  function addSkillsGroup(limit) {
    if (
      skills.length < limit &&
      skillsGroup.skillsType !== "" &&
      skillsGroup.skillsList !== ""
    ) {
      setSkills([
        ...skills,
        {
          id: crypto.randomUUID(),
          skillsType: skillsGroup.skillsType,
          skillsList: skillsGroup.skillsList,
        },
      ]);
    }

    if (skillsGroup.skillsType === "" && skillsGroup.skillsList !== "") {
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: skillsGroup.skillsList,
      });
    } else if (skillsGroup.skillsType !== "" && skillsGroup.skillsList === "") {
      setSkillsGroup({
        id: 0,
        skillsType: skillsGroup.skillsType,
        skillsList: "",
      });
    } else {
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
    }
  }

  function editSkillsGroup(skillsGroupId) {
    skills.forEach((skill) => {
      if (skill.id === skillsGroupId) {
        setSkillsGroup({
          id: skill.id,
          skillsType: skill.skillsType,
          skillsList: skill.skillsList,
        });
      }
    });
    document.getElementById("update-skills-group").style.cssText =
      "display: inline;";
    document.getElementById("add-skills-group").style.cssText =
      "display: none;";
  }

  function updateSkillsGroup() {
    if (skillsGroup.skillsType !== "" && skillsGroup.skillsList !== "") {
      const updatedSkills = skills.map((skill) => {
        if (skill.id === skillsGroup.id) {
          return {
            ...skill,
            skillsType: skillsGroup.skillsType,
            skillsList: skillsGroup.skillsList,
          };
        } else {
          return skill;
        }
      });
      setSkills(updatedSkills);
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
      document.getElementById("update-skills-group").style.cssText =
        "display: none;";
      document.getElementById("add-skills-group").style.cssText =
        "display: inline;";
    }
  }

  function deleteSkillsGroup(skillsGroupId) {
    setSkills(skills.filter((skill) => skill.id !== skillsGroupId));
    document.getElementById("update-skills-group").style.cssText =
      "display: none;";
    document.getElementById("add-skills-group").style.cssText =
      "display: inline;";
    setSkillsGroup({
      id: 0,
      skillsType: "",
      skillsList: "",
    });
  }

  if (displayState === "form") {
    return (
      <>
        <form className="technical-skills-form" onSubmit={() => handleSubmit()}>
          <label htmlFor="skills-type">Enter skills type: </label>
          <input
            type="text"
            id="skills-type"
            value={skillsGroup.skillsType}
            onChange={(e) =>
              setSkillsGroup({ ...skillsGroup, skillsType: e.target.value })
            }
          />
          <label htmlFor="skills-list">Enter list of skills: </label>
          <input
            type="text"
            id="skills-list"
            value={skillsGroup.skillsList}
            onChange={(e) =>
              setSkillsGroup({ ...skillsGroup, skillsList: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => addSkillsGroup(5)}
            id="add-skills-group"
          >
            Add Skills Group
          </button>
          <button
            type="button"
            onClick={() => updateSkillsGroup()}
            id="update-skills-group"
          >
            Update Skills Group
          </button>
          <button type="submit">Submit</button>
        </form>
        <div>
          {skills.map((skillsGroup) => (
            <div key={skillsGroup.id}>
              {skillsGroup.skillsType}: {skillsGroup.skillsList}
              <button
                type="button"
                id="edit-skills-group-btn"
                onClick={() => editSkillsGroup(skillsGroup.id)}
              >
                Edit Skills Group
              </button>
              <button
                type="button"
                id="delete-skills-group-btn"
                onClick={() => deleteSkillsGroup(skillsGroup.id)}
              >
                Delete Skills Group
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (displayState === "resume") {
    return (
      <div className="technical-skills-resume">
        {skills.map((skillsGroup) => (
          <div key={skillsGroup.id}>
            {skillsGroup.skillsType}: {skillsGroup.skillsList}
          </div>
        ))}
        <button type="button" onClick={() => handleEdit()}>
          Edit
        </button>
      </div>
    );
  }
}
