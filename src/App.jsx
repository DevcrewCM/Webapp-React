import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './Components/Navbar'
import Catalogo from './Pages/Catalogo'
import FichaPelicula from './Pages/FichaPelicula'
import Favoritos from './Pages/Favoritos'
import Login from './Pages/Login'
import Contacto from './Pages/Contacto'
import AvisoLegal from './Pages/AvisoLegal'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/pelicula/:id" element={<FichaPelicula />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
