import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Noticias() {
  const [noticias, setNoticias] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/noticias')
      .then(response => response.json())
      .then(data => setNoticias(data))
  }, [])

  return (
    <div>
      <h2>Notícias</h2>
      <ul>
        {noticias.map(noticia => (
          <li key={noticia.id}>
            <Link to={`/noticias/${noticia.id}`}>
              <h3>{noticia.titulo}</h3>
              <p>{noticia.subtitulo}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Noticias
