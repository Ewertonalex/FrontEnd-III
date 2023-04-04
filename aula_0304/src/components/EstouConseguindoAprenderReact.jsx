import React from 'react'

const EstouConseguindoAprenderReact = (props) => {
  return (
    <div>
      {props.EstouConseguindo ? <h1>Estou indo bem...</h1> : <h1>Preciso estudar mais...</h1>}
    </div>
  )
}

export default EstouConseguindoAprenderReact
