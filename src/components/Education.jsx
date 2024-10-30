export function Education(props) {
  const education = props.education;
  return (
    <div className="education-card">
      <p>{education.school}</p>
      <p>{education.placeStudy}</p>
      <p>{education.titleStudy}</p>
      <p>{education.gpa}</p>
      <p></p>
      <button
        id="edit-education"
        type="button"
        onClick={() => props.editEducation(education.id)}
      >
<<<<<<< HEAD
        Edit Education
=======
        Delete Education
>>>>>>> 9ebe82d7b02dd12e60dc0224825f30889513e769
      </button>
      <button
        id="delete-education"
        type="button"
        onClick={() => props.deleteEducation(education.id)}
      >
        Delete Education
      </button>
    </div>
  );
}
