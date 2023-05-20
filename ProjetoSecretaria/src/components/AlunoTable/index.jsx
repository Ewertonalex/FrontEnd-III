import "./styles.css";

export default function AlunoTable({
  alunos,
  handleDelete,
  handleEdit,
  handleOnClick,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>id</th>
          <th>imagem</th>
          <th>nome</th>
          <th>email</th>
          <th>curso</th>
          <th>excluir</th>
          <th>editar</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((aluno) => (
          <tr key={aluno.id}>
            <td>{aluno.id}</td>
            <td>
              <img src={aluno.imagemUrl} alt={aluno.nome} />
            </td>
            <td className="nomeClick" onClick={() => handleOnClick(aluno.id)}>
              {aluno.nome}
            </td>
            <td>{aluno.email}</td>
            <td>{aluno.curso}</td>
            <td>
              <button onClick={() => handleDelete(aluno.id)}>Excluir</button>
            </td>
            <td>
              <button onClick={() => handleEdit(aluno)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
