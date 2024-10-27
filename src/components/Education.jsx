
export function Education(props) {
  const educationDetails = props.educationDetails;
  return (
    <>
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
    </>
  );
}
