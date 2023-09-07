export function TableRow(props) {
  const { user, rowNo, activeId, getId } = props;

  return (
    <tr
      onClick={() => getId(rowNo)}
      className={rowNo === activeId ? "data-row active" : "data-row"}
    >
      <td className="column1">{user.id}</td>
      <td className="column2">{user.firstName}</td>
      <td className="column3">{user.lastName}</td>
      <td className="column4">{user.email}</td>
      <td className="column5">{user.phone}</td>
    </tr>
  );
}
