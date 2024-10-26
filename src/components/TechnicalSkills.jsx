import { useState } from "react";

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


}
