import React from "react";
import "./Aluno.css";


const Aluno = ({ children }) => {
    return (
        <>
        {children}
        </>
    )
}

export default Aluno;

// function Aluno({ nome, email, curso, media }) {
    
//     const status = media >= 7.0 ? 'APROVADO(A)' : 'REPROVADO(A)';
    
//     return (
//       <>
//         <h2>{nome}</h2>
//         <p>Email: {email}</p>
//         <p>Curso: {curso}</p>
//         <p>Média: {media}</p>
//         <p>Status: {status}</p>
//       </>
//     );
//   }



// function Aluno(props) {
//   const { nome, email, curso } = props;

//   return (
//     <div className="aluno-container">
//       <h2 className="aluno-nome">Nome: {nome}</h2>
//       <p className="aluno-email">Email: {email}</p>
//       <p className="aluno-curso">Curso: {curso}</p>
//     </div>
//   );
// }



