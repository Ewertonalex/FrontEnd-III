// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import React from "react";
import Aluno from "./components/Aluno";

function App() {
  return (
    <div>

      <Aluno>

        {[
          { nome: "Ewerton Alexander", email: "ewerton@example.com", curso: "Engenharia de Software", media: 6.5  },
          { nome: "Enzo Oliveira", email: "enzo@example.com", curso: "Ciência da Computação", media: 8.5  },
          { nome: "Matteo Lopes", email: "matteo@example.com", curso: "Sistemas de Informação", media: 9.0  },
        ].map((aluno, index) => (
        <>
        <p>Nome: {aluno.nome}</p>
        <p>Nome: {aluno.email}</p>
        <p>Nome: {aluno.curso}</p>
        <p>Nome: {aluno.media}</p>
        <p>Status: {aluno.media >= 7.0 ? "APROVADO" : "REPROVADO" }</p>
        </>
        ))}
      </Aluno>
    </div>
  );
}

export default App;









// function App() {
//   return (
//     <div>
//       {[
//         { nome: "Ewerton Alexander", email: "ewerton@example.com", curso: "Engenharia de Software", media: 6.5  },
//         { nome: "Enzo Oliveira", email: "enzo@example.com", curso: "Ciência da Computação", media: 8.5  },
//         { nome: "Matteo Lopes", email: "matteo@example.com", curso: "Sistemas de Informação", media: 9.0  },
//       ].map((aluno, index) => (
//         <Aluno key={index} nome={aluno.nome} email={aluno.email} curso={aluno.curso} media={aluno.media} />
//       ))}
//     </div>
//   );
// }









// import EstouConseguindoAprenderReact from './components/EstouConseguindoAprenderReact'

// function App() {
  

//   return (
//     <div>
//       <EstouConseguindoAprenderReact estouConseguindo = {false} />
//     </div>
//   )
// }

// export default App
