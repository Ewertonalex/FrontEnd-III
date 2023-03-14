import React from "react";

function componenteSubtracao (props) {
  const resultado = props.num1 - props.num2;
  return (
    <div>
      <h1>O resultado de {props.num1} - {props.num2} é igual a {resultado}</h1>
    </div>
  );
}

export default componenteSubtracao