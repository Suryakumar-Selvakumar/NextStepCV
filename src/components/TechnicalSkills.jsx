import { useEffect, useRef, useState } from "react";
import { SkillsGroup } from "./SkillsGroup";
import "../styles/TechnicalSkills.css";

export function TechnicalSkills() {
  const storedSkills = JSON.parse(localStorage.getItem("skills"));
  const [skills, setSkills] = useState(storedSkills);
  const [skillsGroup, setSkillsGroup] = useState({
    id: 0,
    skillsType: "",
    skillsList: "",
  });
  const [limit, setLimit] = useState(5);

  // useRef hooks for DOM nodes
  const addTechnicalSkillsBtn = useRef(null);
  const limitErrorDiv = useRef(null);
  const technicalSkillsForm = useRef(null);
  const addSkillsGroupBtn = useRef(null);
  const updateSkillsGroupBtn = useRef(null);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  function handleSubmit() {
    if (skills.length >= 1) {
      // Hide the form
      technicalSkillsForm.current.style.cssText = "display: none;";

      // Display the Add Technical Skills button
      addTechnicalSkillsBtn.current.style.cssText = "display: block";
    }
  }

  function handleCancel() {
    // Hide the form
    technicalSkillsForm.current.style.cssText = "display: none;";

    // Display the Add Technical Skills button
    addTechnicalSkillsBtn.current.style.cssText = "display: block";

    updateSkillsGroupBtn.current.style.cssText = "display: none;";
    addSkillsGroupBtn.current.style.cssText = "display: inline;";

    // Reset skillsGroup
    setSkillsGroup({
      id: 0,
      skillsType: "",
      skillsList: "",
    });
  }

  function addTechnicalSkills() {
    if (skills.length < limit) {
      technicalSkillsForm.current.style.cssText = "display: block;";
      addTechnicalSkillsBtn.current.style.cssText = "display: none;";
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: block;";
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
      addSkillsGroupBtn.current.disabled = true;
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
    updateSkillsGroupBtn.current.style.cssText = "display: inline;";
    addSkillsGroupBtn.current.style.cssText = "display: none;";
    addTechnicalSkillsBtn.current.style.cssText = "display: none;";
    technicalSkillsForm.current.style.cssText = "display: block;";
    limitErrorDiv.current.style.cssText = "display: none;";
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
      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      addSkillsGroupBtn.current.style.cssText = "display: inline;";
      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      // addTechnicalSkillsBtn.current.style.cssText =
      //   "display: inline;";

      if (skills.length === limit) {
        addSkillsGroupBtn.current.disabled = true;
      } else {
        addSkillsGroupBtn.current.disabled = false;
      }
    }
  }

  function deleteSkillsGroup(skillsGroupId) {
    setSkills(skills.filter((skill) => skill.id !== skillsGroupId));

    if (skillsGroup.id === skillsGroupId || skills.length === 1) {
      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      addSkillsGroupBtn.current.style.cssText = "display: inline;";
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
    }

    limitErrorDiv.current.style.cssText = "display: none;";

    if (skills.length - 1 === limit) {
      addSkillsGroupBtn.current.disabled = true;
    } else {
      addSkillsGroupBtn.current.disabled = false;
    }
  }

  return (
    <>
      <button
        type="button"
        id="add-technical-skills"
        ref={addTechnicalSkillsBtn}
        onClick={() => addTechnicalSkills()}
      >
        Add Technical Skills
      </button>
      <div className="limit-error" ref={limitErrorDiv}>
        Skills limit reached!
      </div>
      <form
        className="technical-skills-form"
        ref={technicalSkillsForm}
        onSubmit={() => handleSubmit()}
      >
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
          ref={addSkillsGroupBtn}
        >
          Add Skills Group
        </button>
        <button
          type="button"
          onClick={() => updateSkillsGroup()}
          id="update-skills-group"
          ref={updateSkillsGroupBtn}
        >
          Update Skills Group
        </button>
        <button
          type="button"
          id="cancel-technical-skills"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit" id="submit-technical-skills">
          Save
        </button>
      </form>
      <div className="technical-skills-cards">
        {skills &&
          skills.map((skillsGroup) => (
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
