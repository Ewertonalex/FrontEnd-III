import { useState, useEffect } from "react";
import "./styles.css";
import logo from "../../assets/logo.jpg";
import logo2 from "../../assets/logo2.png";
import AlunoForm from "../../components/AlunoForm";
import AlunoEditForm from "../../components/AlunoEditForm";
import AlunoTable from "../../components/AlunoTable";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/alunos";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [filtro, setFiltro] = useState("");
  const [editando, setEditando] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState({});
  const [filtroCurso, setFiltroCurso] = useState("");
  const [image, setImage] = useState(null);

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
  const navigate = useNavigate();
  const handleOnClick = (id) => navigate(`/perfil/${id}`);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "zu5yhcep");

    return await fetch(
      "https://api.cloudinary.com/v1_1/dfut42yzs/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  };

  async function handleAddAluno(e) {
    e.preventDefault();
    const alunoExistente = alunos.find((a) => a.email === email);
    if (alunoExistente) {
      alert("Esse aluno já está cadastrado!");
      return;
    }

    const imageUploaded = (await uploadImage()).json();

    const imagemUrl = (await imageUploaded).url;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        curso,
        imagemUrl,
      }),
    });
    const data = await response.json();
    setAlunos([...alunos, data]);
    setNome("");
    setEmail("");
    setCurso("");
    setImage(null);
  }

  async function uploadToClient(event) {
    if (event.target.files && event.target.files[0]) {
      const uploadedImage = event.target.files[0];
      setImage(uploadedImage);
    }
  }

  async function handleEditAluno(e) {
    e.preventDefault();
    let imagemUrl = image;

    const response = await fetch(`${apiUrl}/${alunoEditando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        curso,
        imagemUrl,
      }),
    });
    const data = await response.json();
    const index = alunos.findIndex((a) => a.id === data.id);
    const newAlunos = [...alunos];
    newAlunos[index] = data;
    setAlunos(newAlunos);
    setNome("");
    setEmail("");
    setCurso("");
    setEditando(false);
    setAlunoEditando({});
    setImage(null);
  }

  async function handleDelete(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
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
    setImage(aluno.imagemUrl);
  }

  return (
    <>
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
        <img src={logo2} alt="Logo2" className="logo2" />
        <form
          className="form"
          onSubmit={editando ? handleEditAluno : handleAddAluno}
        >
          {editando ? (
            <AlunoEditForm
              handleSubmit={handleEditAluno}
              nome={nome}
              setNome={setNome}
              email={email}
              setEmail={setEmail}
              curso={curso}
              setCurso={setCurso}
              uploadToClient={uploadToClient}
              image={image}
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
              uploadToClient={uploadToClient}
              image={image}
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
        <AlunoTable
          alunos={alunos}
          handleDelete={handleDelete}
          handleOnClick={handleOnClick}
          handleEdit={handleEdit}
        />
      </div>
    </>
  );
}

export default App;
