export function Education(props) {
  const educationDetails = props.educationDetails;
  return (
    <div className="education-card">
      <p>{educationDetails.school}</p>
      <p>{educationDetails.placeStudy}</p>
      <p>{educationDetails.titleStudy}</p>
      <p>{educationDetails.gpa}</p>
      <p></p>
      <button
        id="edit-education"
        type="button"
        onClick={() => props.editEducation(educationDetails.id)}
      >
        Delete Education
      </button>
      <button
        id="delete-education"
        type="button"
        onClick={() => props.deleteEducation(educationDetails.id)}
      >
        Delete Education
      </button>
    </div>
  );
}
