export function SkillsGroup(props) {
  const skillsGroup = props.skillsGroup;

  return (
    <div className="skills-group-card">
      {skillsGroup.skillsType}: {skillsGroup.skillsList}
      <button
        type="button"
        id="edit-skills-group"
        onClick={() => props.editSkillsGroup(skillsGroup.id)}
      >
        Edit Skills Group
      </button>
      <button
        type="button"
        id="delete-skills-group"
        onClick={() => props.deleteSkillsGroup(skillsGroup.id)}
      >
        Delete Skills Group
      </button>
    </div>
  );
}
