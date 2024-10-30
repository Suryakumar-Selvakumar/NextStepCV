export function Detail(props) {
  const detail = props.detail;

  return (
    <li className="detail-card">
      {detail.value}
      <button
        type="button"
        id="edit-detail"
        onClick={() => props.editDetail(detail.id)}
      >
        Edit Detail
      </button>
      <button
        type="button"
        id="delete-detail"
        onClick={() => props.deleteDetail(detail.id)}
      >
        Delete Detail
      </button>
    </li>
  );
}