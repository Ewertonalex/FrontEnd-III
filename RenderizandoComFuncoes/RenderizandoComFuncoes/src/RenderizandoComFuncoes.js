import React from "react";

function RenderizandoComFuncoes() {
    function escolhaDeRenderizacao(oQueRenderizar) {
      if (oQueRenderizar === "h1") {
        return <h1>Texto em h1</h1>;
      } else {
        return <h2>Texto em h2</h2>;
      }
    }
  
    return (
      <div>
        <h1>Renderizando com Funções</h1>
        {escolhaDeRenderizacao("h1")}
        {escolhaDeRenderizacao("h2")}
      </div>
    );
  }
  

export default RenderizandoComFuncoes;
