import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Faculdade from './pages/Faculdade'
import DpoLgpd from './pages/DpoLgpd'
import Noticias from './pages/Noticias'
import Noticia from './pages/Noticia'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import imagem from '../src/assets/logo2.png'
import imagem2 from '../src/assets/logo.jpg'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <h1 style={{ 
          backgroundImage: `url(${imagem2})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          height: '200px',
          width: '100%',
        }}></h1>

        <Navbar />

        <Routes>
          <Route path='/' element={<img src={imagem} alt='Imagem' />}/>
          <Route path='/a-faculdade' element={<Faculdade/>}/> 
          <Route path='/dpo-lgpd' element={<DpoLgpd />}/>
          <Route path='/noticias' element={<Noticias />}/>
          <Route path='/noticias/:id' element={<Noticia />} />
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
