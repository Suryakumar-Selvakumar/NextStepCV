import { useEffect, useState } from "react";
import { SkillsGroup } from "./SkillsGroup";
import "../styles/TechnicalSkills.css";

export function TechnicalSkills() {
  const storedSkills = JSON.parse(localStorage.getItem("skills"));
  const [skills, setSkills] = useState(storedSkills ? storedSkills : []);
  const [skillsGroup, setSkillsGroup] = useState({
    id: 0,
    skillsType: "",
    skillsList: "",
  });
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  function handleSubmit() {
    if (skills.length >= 1) {
      // Hide the form
      document.querySelector(".technical-skills-form").style.cssText =
        "display: none;";

      // Display the Add Technical Skills button
      document.getElementById("add-technical-skills").style.cssText =
        "display: block";
    }
  }

  function handleCancel() {
    // Hide the form
    document.querySelector(".technical-skills-form").style.cssText =
      "display: none;";

    // Display the Add Technical Skills button
    document.getElementById("add-technical-skills").style.cssText =
      "display: block";

    document.getElementById("update-skills-group").style.cssText =
      "display: none;";
    document.getElementById("add-skills-group").style.cssText =
      "display: inline;";

    // Reset skillsGroup
    setSkillsGroup({
      id: 0,
      skillsType: "",
      skillsList: "",
    });
  }

  function addTechnicalSkills() {
    if (skills.length < limit) {
      document.querySelector(".technical-skills-form").style.cssText =
        "display: block;";
      document.getElementById("add-technical-skills").style.cssText =
        "display: none;";
      document.querySelector(".limit-error").style.cssText = "display: none;";
    } else {
      document.querySelector(".limit-error").style.cssText = "display: block;";
    }
  }

  function addSkillsGroup() {
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

    if (skills.length + 1 === limit) {
      document.getElementById("add-skills-group").disabled = true;
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
    document.getElementById("add-technical-skills").style.cssText =
      "display: none;";
    document.querySelector(".technical-skills-form").style.cssText =
      "display: block;";
    document.querySelector(".limit-error").style.cssText = "display: none;";
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
      document.getElementById("update-skills-group").style.cssText =
        "display: none;";
      // document.getElementById("add-technical-skills").style.cssText =
      //   "display: inline;";

      if (skills.length === limit) {
        document.getElementById("add-skills-group").disabled = true;
      } else {
        document.getElementById("add-skills-group").disabled = false;
      }
    }
  }

  function deleteSkillsGroup(skillsGroupId) {
    setSkills(skills.filter((skill) => skill.id !== skillsGroupId));

    if (skillsGroup.id === skillsGroupId || skills.length === 1) {
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

    document.querySelector(".limit-error").style.cssText = "display: none;";

    if (skills.length - 1 === limit) {
      document.getElementById("add-skills-group").disabled = true;
    } else {
      document.getElementById("add-skills-group").disabled = false;
    }
  }

  return (
    <>
      <button
        type="button"
        id="add-technical-skills"
        onClick={() => addTechnicalSkills()}
      >
        Add Technical Skills
      </button>
      <div className="limit-error">Skills limit reached!</div>
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
          onClick={() => addSkillsGroup()}
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
        <button type="button" onClick={() => handleCancel()}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
      <div className="technical-skills-cards">
        {skills.map((skillsGroup) => (
          <SkillsGroup
            key={skillsGroup.id}
            skillsGroup={skillsGroup}
            editSkillsGroup={editSkillsGroup}
            deleteSkillsGroup={deleteSkillsGroup}
          />
        ))}
      </div>
    </>
  );
}
