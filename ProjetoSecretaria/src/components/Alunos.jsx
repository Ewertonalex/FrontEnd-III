import { useState, useEffect } from 'react';
import './alunos.css';
import logo from '../assets/logo.jpg';
import logo2 from '../assets/logo2.png';


const apiUrl = 'http://localhost:3000/alunos';

function AlunoForm({ handleSubmit, nome, setNome, email, setEmail, curso, setCurso }) {
  
  return (
    <>
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
    </>
  );
}

function AlunoEditForm({ handleSubmit, nome, setNome, email, setEmail, curso, setCurso }) {
  return (
    <>
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
      <button type="submit">Salvar</button>
    </>
  );
}

function AlunoTable({ alunos, handleDelete, handleEdit }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>id</th>
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
            <td>{aluno.nome}</td>
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

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [filtro, setFiltro] = useState('');
  const [editando, setEditando] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState({});
  const [filtroCurso, setFiltroCurso] = useState('');

  useEffect(() => {
    async function fetchAlunos() {
      let endpoint = apiUrl;
      if (filtro || filtroCurso) {
        endpoint = `${apiUrl}?nome_like=${filtro}&curso_like=${filtroCurso}`;
      }
      const response = await fetch(endpoint);
      const data = await response.json();
      setAlunos(data);
    }
    fetchAlunos();
  }, [filtro, filtroCurso]);
  

async function handleAddAluno(e) {
  e.preventDefault();
  const alunoExistente = alunos.find(a => a.email === email);
  if (alunoExistente) {
    alert("Esse aluno já está cadastrado!");
    return;
  }
  const response = await fetch(apiUrl, {
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


  async function handleEditAluno(e) {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/${alunoEditando.id}`, {
      method: 'PUT',
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
    const index = alunos.findIndex(a => a.id === data.id);
    const newAlunos = [...alunos];
    newAlunos[index] = data;
    setAlunos(newAlunos);
    setNome('');
    setEmail('');
    setCurso('');
    setEditando(false);
    setAlunoEditando({});
  }

  async function handleDelete(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      const newAlunos = alunos.filter((aluno) => aluno.id !== id);
      setAlunos(newAlunos);
    }
  }

  function handleEdit(aluno) {
    setEditando(true);
    setAlunoEditando(aluno);
    setNome(aluno.nome);
    setEmail(aluno.email);
    setCurso(aluno.curso);
  }

  return (
    <>
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
        <img src={logo2} alt="Logo2" className="logo2" />
        <form className="form" onSubmit={editando ? handleEditAluno : handleAddAluno}>
          {editando ? (
            <AlunoEditForm
              handleSubmit={handleEditAluno}
              nome={nome}
              setNome={setNome}
              email={email}
              setEmail={setEmail}
              curso={curso}
              setCurso={setCurso}
            />
          ) : (
            <AlunoForm
              handleSubmit={handleAddAluno}
              nome={nome}
              setNome={setNome}
              email={email}
              setEmail={setEmail}
              curso={curso}
              setCurso={setCurso}
            />
          )}
        </form>
        <div>
          <label htmlFor="filtro">Filtrar por nome:</label>
          <input
            type="text"
            id="filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="cursoFiltro">Filtrar por curso: </label>
          <input
            type="text"
            id="cursoFiltro"
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
          />
        </div>
        <AlunoTable alunos={alunos} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </>
  );
}

export default App;