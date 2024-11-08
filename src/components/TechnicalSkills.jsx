import { useEffect, useRef, useState } from "react";
import { SkillsGroup } from "./SkillsGroup";
import "../styles/TechnicalSkills.css";

export function TechnicalSkills() {
  const storedSkills = JSON.parse(localStorage.getItem("skills"));
  const storedMainVisible = JSON.parse(
    localStorage.getItem("skillsMainVisible")
  );
  const [skills, setSkills] = useState(storedSkills ? storedSkills : []);
  const [skillsGroup, setSkillsGroup] = useState({
    id: 0,
    skillsType: "",
    skillsList: "",
  });
  const [limit, setLimit] = useState(5);
  const [mainVisible, setMainVisible] = useState(
    storedMainVisible ? storedMainVisible : false
  );
  const [formVisible, setFormVisible] = useState(false);

  // useRef hooks for DOM nodes
  const addTechnicalSkillsBtn = useRef(null);
  const limitErrorDiv = useRef(null);
  const technicalSkillsForm = useRef(null);
  const addSkillsGroupBtn = useRef(null);
  const updateSkillsGroupBtn = useRef(null);
  const dropDownSvg = useRef(null);

  useEffect(() => {
    if (skills) localStorage.setItem("skills", JSON.stringify(skills));

    localStorage.setItem("skillsMainVisible", JSON.stringify(mainVisible));
  }, [skills, mainVisible]);

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();

    if (skills.length >= 1) {
      // Hide the form
      setFormVisible(false);

      // Display the Add Technical Skills button
      addTechnicalSkillsBtn.current.style.cssText = "display: flex";
      technicalSkillsForm.current.style.cssText =
        "margin-top: 0;margin-bottom: 0;";

      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      addSkillsGroupBtn.current.style.cssText = "display: flex;";

      // Reset skillsGroup
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
    }
  }

  function handleCancel() {
    // Hide the form
    setFormVisible(false);

    // Display the Add Technical Skills button
    addTechnicalSkillsBtn.current.style.cssText = "display: flex";
    technicalSkillsForm.current.style.cssText =
      "margin-top: 0;margin-bottom: 0;";

    updateSkillsGroupBtn.current.style.cssText = "display: none;";
    addSkillsGroupBtn.current.style.cssText = "display: flex;";

    // Reset skillsGroup
    setSkillsGroup({
      id: 0,
      skillsType: "",
      skillsList: "",
    });
  }

  function addTechnicalSkills() {
    if (skills.length < limit) {
      technicalSkillsForm.current.style.cssText =
        "margin-top: 1.25rem;margin-bottom: 1rem;";
      setFormVisible(true);
      addTechnicalSkillsBtn.current.style.cssText = "display: none;";
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: flex;";
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
    updateSkillsGroupBtn.current.style.cssText = "display: flex;";
    addSkillsGroupBtn.current.style.cssText = "display: none;";
    addTechnicalSkillsBtn.current.style.cssText = "display: none;";
    technicalSkillsForm.current.style.cssText =
      "margin-top: 1.25rem;margin-bottom: 1rem;";
    setFormVisible(true);
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
      addSkillsGroupBtn.current.style.cssText = "display: flex;";
      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      // addTechnicalSkillsBtn.current.style.cssText =
      //   "display: flex;";

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
      addSkillsGroupBtn.current.style.cssText = "display: flex;";
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
    <div className="technical-skills">
      <div
        className="technical-skills-header"
        onClick={() => {
          setMainVisible(!mainVisible);
        }}
      >
        <h3
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
        >
          Technical Skills
        </h3>
        <svg
          ref={dropDownSvg}
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
          className={
            mainVisible ? "dropdown-svg rotate-dropdown" : "dropdown-svg"
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div
        className={
          mainVisible ? "technical-skills-main" : "technical-skills-main closed"
        }
      >
        <button
          type="button"
          id="add-technical-skills"
          ref={addTechnicalSkillsBtn}
          onClick={() => addTechnicalSkills()}
        >
          <svg
            style={{ width: "30px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M3 16H10V14H3M18 14V10H16V14H12V16H16V20H18V16H22V14M14 6H3V8H14M14 10H3V12H14V10Z"
            />
          </svg>
          <span>Add Technical Skills</span>
        </button>
        <div className="limit-error" ref={limitErrorDiv}>
          <img src="/warning-gold.svg" alt="a warning logo" id="warning-img" />
          <span>Skills limit reached!</span>
        </div>
        <form
          className={
            formVisible
              ? "technical-skills-form"
              : "technical-skills-form closed"
          }
          ref={technicalSkillsForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="technical-skills-type">
            <label htmlFor="skills-type">Enter skills type </label>
            <input
              type="text"
              id="skills-type"
              value={skillsGroup.skillsType}
              onChange={(e) =>
                setSkillsGroup({ ...skillsGroup, skillsType: e.target.value })
              }
            />
          </div>
          <div className="technical-skills-list">
            <label htmlFor="skills-list">Enter list of skills </label>
            <input
              type="text"
              id="skills-list"
              value={skillsGroup.skillsList}
              onChange={(e) =>
                setSkillsGroup({ ...skillsGroup, skillsList: e.target.value })
              }
            />
          </div>
          <div className="skills-group-btns">
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
          </div>
          <div className="technical-skills-form-btns">
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
          </div>
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
      </div>
    </div>
  );
}
