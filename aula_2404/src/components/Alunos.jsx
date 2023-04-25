import { useState, useEffect } from 'react';
import './alunos.css';

const url = 'http://localhost:3000/alunos';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');

  useEffect(() => {
    async function fetchAlunos() {
      const response = await fetch(url);
      const data = await response.json();
      setAlunos(data);
    }

    fetchAlunos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        curso
      })
    });

    const data = await response.json();

    setAlunos([...alunos, data]);

    setNome('');
    setEmail('');
    setCurso('');
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="curso">Curso</label>
        <input
          type="text"
          id="curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required
        />
        <button type="submit">Adicionar Aluno</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>email</th>
            <th>curso</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.curso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
