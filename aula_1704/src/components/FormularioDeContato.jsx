import React, { useState } from "react";

function FormularioDeContato() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const contatoJSON = JSON.stringify({
      nome: nome,
      contato: contato,
      mensagem: mensagem,
    });
    console.log(`O seguinte JSON será enviado via HTTP POST para o back-end: ${contatoJSON}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </label>
      <label>
        Contato:
        <input
          type="text"
          value={contato}
          onChange={(event) => setContato(event.target.value)}
        />
      </label>
      <label>
        Mensagem:
        <textarea
          value={mensagem}
          onChange={(event) => setMensagem(event.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioDeContato;
