export function SkillsGroup(props) {
  const skillsGroup = props.skillsGroup;

  return (
    <div className="skills-group-card">
      {skillsGroup.skillsType}: {skillsGroup.skillsList}
      <button
        type="button"
<<<<<<< HEAD
        id="edit-skills-group"
=======
        id="edit-skills-group-btn"
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
        onClick={() => props.editSkillsGroup(skillsGroup.id)}
      >
        Edit Skills Group
      </button>
      <button
        type="button"
<<<<<<< HEAD
        id="delete-skills-group"
=======
        id="delete-skills-group-btn"
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
        onClick={() => props.deleteSkillsGroup(skillsGroup.id)}
      >
        Delete Skills Group
      </button>
    </div>
  );
}
