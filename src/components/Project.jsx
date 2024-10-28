import "../styles/project.css";

export function Project(props) {
  const project = props.project;

  return (
    <div className="project-card">
      <p>{project.projectName}</p>
      <p>{project.projectDate}</p>
      <button
        id="edit-project"
        type="button"
        onClick={() => props.editProject(project.id)}
      >
        Edit Project
      </button>
      <button
        id="delete-project"
        type="button"
        onClick={() => props.deleteProject(project.id)}
      >
        Delete Project
      </button>
    </div>
  );
}
