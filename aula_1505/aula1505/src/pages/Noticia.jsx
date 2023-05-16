import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Noticia() {
  const { id } = useParams()
  const [noticia, setNoticia] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/noticias/${id}`)
      .then(response => response.json())
      .then(data => setNoticia(data))
  }, [id])

  if (!noticia) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <h2>{noticia.titulo}</h2>
      <h3>{noticia.subtitulo}</h3>
      <p>{noticia.texto}</p>
    </div>
  )
}

export default Noticia


