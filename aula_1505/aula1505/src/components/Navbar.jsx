import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Home</Link> <br/>
      <Link to='/a-faculdade'>A Facudade</Link> <br/>
      <Link to='/dpo-lgpd'>DpoLgpd</Link> <br/>
      <Link to='/noticias'>Notícias</Link>

    </nav>
  )
}

export default Navbar
