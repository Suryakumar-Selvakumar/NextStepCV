export function Role(props) {
  const role = props.role;

  return (
    <li className="role-card">
      {role.value}
      <button
        type="button"
        id="edit-role-btn"
        onClick={() => props.editRole(role.id)}
      >
        Edit Role
      </button>
      <button
        type="button"
        id="delete-role-btn"
        onClick={() => props.deleteRole(role.id)}
      >
        Delete Role
      </button>
    </li>
  );
}
