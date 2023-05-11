import { useState, useEffect } from 'react';
import './alunos.css';
import logo from '../assets/logo.jpg';
import logo2 from '../assets/logo2.png';


const apiUrl = 'http://localhost:3000/alunos';

function AlunoForm({ handleSubmit, nome, setNome, idade, setIdade, posicao, setPosicao}) {
  
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
      <label htmlFor="idade">Idade</label>
      <input
        type="text"
        id="idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        required
      />
      <label htmlFor="posicao">Posicao</label>
      <input
        type="text"
        id="posicao"
        value={posicao}
        onChange={(e) => setPosicao(e.target.value)}
        required
      />
      <button type="submit">Adicionar Atleta</button>
    </>
  );
}

function AlunoEditForm({ handleSubmit, nome, setNome, idade, setIdade, posicao, setPosicao }) {
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
      <label htmlFor="idade">Idade</label>
      <input
        type="text"
        id="idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        required
      />
      <label htmlFor="posicao">Posicao</label>
      <input
        type="text"
        id="posicao"
        value={posicao}
        onChange={(e) => setPosicao(e.target.value)}
        required
      />
      <button type="submit">Salvar Dados</button>
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
          <th>idade</th>
          <th>posicao</th>
          <th>excluir</th>
          <th>editar</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((aluno) => (
          <tr key={aluno.id}>
            <td>{aluno.id}</td>
            <td>{aluno.nome}</td>
            <td>{aluno.idade}</td>
            <td>{aluno.posicao}</td>
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
  const [idade, setIdade] = useState('');
  const [posicao, setPosicao] = useState('');
  const [filtro, setFiltro] = useState('');
  const [editando, setEditando] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState({});
  const [filtroPosicao, setFiltroPosicao] = useState('');

  useEffect(() => {
    async function fetchAlunos() {
      let endpoint = apiUrl;
      if (filtro || filtroPosicao) {
        endpoint = `${apiUrl}?nome_like=${filtro}&posicao_like=${filtroPosicao}`;
      }
      const response = await fetch(endpoint);
      const data = await response.json();
      setAlunos(data);
    }
    fetchAlunos();
  }, [filtro, filtroPosicao]);
  

async function handleAddAluno(e) {
  e.preventDefault();
  const alunoExistente = alunos.find(a => a.posicao === posicao);
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
      idade,
      posicao
    })
  });
  const data = await response.json();
  setAlunos([...alunos, data]);
  setNome('');
  setIdade('');
  setPosicao('');
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
        idade,
        posicao
      })
    });
    const data = await response.json();
    const index = alunos.findIndex(a => a.id === data.id);
    const newAlunos = [...alunos];
    newAlunos[index] = data;
    setAlunos(newAlunos);
    setNome('');
    setIdade('');
    setPosicao('');
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
    setIdade(aluno.idade);
    setPosicao(aluno.posicao);
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
              idade={idade}
              setIdade={setIdade}
              posicao={posicao}
              setPosicao={setPosicao}
            />
          ) : (
            <AlunoForm
              handleSubmit={handleAddAluno}
              nome={nome}
              setNome={setNome}
              idade={idade}
              setIdade={setIdade}
              posicao={posicao}
              setPosicao={setPosicao}
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
        <label htmlFor="posicaoFiltro">Filtrar por posição: </label>
          <input
            type="text"
            id="posicaoFiltro"
            value={filtroPosicao}
            onChange={(e) => setFiltroPosicao(e.target.value)}
          />
        </div>
        <AlunoTable alunos={alunos} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </>
  );
}

export default App;