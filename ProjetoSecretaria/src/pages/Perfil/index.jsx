import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3000/alunos";

export default function Perfil() {
  const { id } = useParams();
  const [aluno, setAluno] = useState([]);

  useEffect(() => {
    async function fetchAluno() {
      let endpoint = apiUrl;
      endpoint = `${apiUrl}?id=${id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setAluno(data[0]);
    }

    fetchAluno();
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="user">
            <img
              className="profileImage"
              src={aluno.imagemUrl}
              alt={aluno.nome}
            />
            <h1>{aluno.nome}</h1>
          </div>
          <div className="userInfo">
            <span>
              <b>Curso:</b> {aluno.curso}
            </span>
            <span>
              <b>Email:</b> {aluno.email}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
