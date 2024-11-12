import { useEffect, useRef, useState } from "react";
import { SkillsGroup } from "./SkillsGroup";
import "../styles/TechnicalSkills.css";
import warningGold from "../assets/warning-gold.svg";

export function TechnicalSkills({ appData, setAppData }) {
  const storedMainVisible = JSON.parse(
    localStorage.getItem("skillsMainVisible")
  );
  const [skills, setSkills] = useState(
    appData.skills.length ? appData.skills : []
  );
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
  const [limitReached, setLimitReached] = useState(false);

  // useRef hooks for DOM nodes
  const addTechnicalSkillsBtn = useRef(null);
  const technicalSkillsForm = useRef(null);
  const addSkillsGroupBtn = useRef(null);
  const updateSkillsGroupBtn = useRef(null);
  const dropDownSvg = useRef(null);

  useEffect(() => {
    localStorage.setItem("skillsMainVisible", JSON.stringify(mainVisible));
    setSkills(appData.skills);
  }, [mainVisible, appData]);

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();
    technicalSkillsForm.current.reset();

    // Hide the form
    setFormVisible(false);

    updateSkillsGroupBtn.current.style.cssText = "display: none;";
    addSkillsGroupBtn.current.style.cssText = "display: flex;";

    // Reset skillsGroup
    setSkillsGroup({
      id: 0,
      skillsType: "",
      skillsList: "",
    });
  }

  function handleCancel() {
    // Hide the form
    setFormVisible(false);

    updateSkillsGroupBtn.current.style.cssText = "display: none;";
    addSkillsGroupBtn.current.style.cssText = "display: flex;";

    // Reset skillsGroup
    setSkillsGroup({
      id: 0,
      skillsType: "",
      skillsList: "",
    });

    technicalSkillsForm.current.reset();
  }

  function addTechnicalSkills() {
    if (skills.length < limit) {
      setFormVisible(true);
      setLimitReached(false);
    } else {
      setLimitReached(true);
    }
  }

  function addSkillsGroup() {
    if (
      skills.length < limit &&
      skillsGroup.skillsType !== "" &&
      skillsGroup.skillsList !== ""
    ) {
      const updatedSkills = [
        ...skills,
        {
          id: crypto.randomUUID(),
          skillsType: skillsGroup.skillsType,
          skillsList: skillsGroup.skillsList,
        },
      ];
      setSkills(updatedSkills);
      setAppData({ ...appData, skills: updatedSkills });
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

    setFormVisible(true);
    setLimitReached(false);
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
      setAppData({ ...appData, skills: updatedSkills });
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      addSkillsGroupBtn.current.style.cssText = "display: flex;";

      if (skills.length === limit) {
        addSkillsGroupBtn.current.disabled = true;
      } else {
        addSkillsGroupBtn.current.disabled = false;
      }
    }
  }

  function deleteSkillsGroup(skillsGroupId) {
    const updatedSkills = skills.filter((skill) => skill.id !== skillsGroupId);

    const skillsGroupCards = document.querySelector(".technical-skills-cards");
    for (const skill of skillsGroupCards.children) {
      const skillId = skill.getAttribute("data-id");
      if (skillId == skillsGroupId) {
        skill.classList.add("delete");
      }
    }

    setTimeout(() => {
      setSkills(updatedSkills);
      setAppData({ ...appData, skills: updatedSkills });
    }, 450);

    if (skillsGroup.id === skillsGroupId || skills.length === 1) {
      updateSkillsGroupBtn.current.style.cssText = "display: none;";
      addSkillsGroupBtn.current.style.cssText = "display: flex;";
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
    }

    setLimitReached(false);

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
          className={
            formVisible
              ? "add-technical-skills"
              : "add-technical-skills visible"
          }
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
        <div className={limitReached ? "limit-error visible" : "limit-error"}>
          <img src={warningGold} alt="a warning logo" id="warning-img" />
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
        <div
          className="technical-skills-cards"
          style={{ display: skills.length ? "flex" : "none" }}
        >
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
