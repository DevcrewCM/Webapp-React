import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-name">CineVOD</span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
          Catálogo
        </NavLink>
        {user && (
          <NavLink to="/favoritos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Favoritos
          </NavLink>
        )}
        <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Contacto
        </NavLink>
        <NavLink to="/aviso-legal" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Aviso Legal
        </NavLink>
      </div>

      <div className="navbar-auth">
        {user ? (
          <div className="user-area">
            <span className="user-email">{user.email}</span>
            <button className="btn-logout" onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <Link to="/login" className="btn-login">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
