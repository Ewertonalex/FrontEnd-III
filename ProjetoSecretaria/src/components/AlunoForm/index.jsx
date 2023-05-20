import "./styles.css";

export default function AlunoForm({
  handleSubmit,
  nome,
  setNome,
  email,
  setEmail,
  curso,
  setCurso,
  uploadToClient,
  image,
}) {
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
      {image ? (
        <img id="imageUploaded" src={URL.createObjectURL(image)} />
      ) : (
        <></>
      )}
      <label id="uploadImage" htmlFor="artwork">
        Adicione uma Foto
      </label>
      <input
        type="file"
        name="artwork"
        id="artwork"
        onChange={(e) => uploadToClient(e)}
        required
      />
      <button type="submit">Adicionar Aluno</button>
    </>
  );
}
