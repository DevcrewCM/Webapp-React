import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [modo, setModo] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (modo === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(traducirError(err.code))
    } finally {
      setLoading(false)
    }
  }

  const traducirError = (code) => {
    const errores = {
      'auth/invalid-credential': 'Email o contraseña incorrectos.',
      'auth/email-already-in-use': 'Este email ya está registrado.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/invalid-email': 'El email no es válido.',
      'auth/user-not-found': 'No existe cuenta con este email.',
      'auth/wrong-password': 'Contraseña incorrecta.',
    }
    return errores[code] || 'Ha ocurrido un error. Inténtalo de nuevo.'
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">C</div>
        <h1 className="auth-titulo">
          {modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h1>
        <p className="auth-subtitulo">
          {modo === 'login'
            ? 'Accede para puntuar, comentar y guardar favoritos'
            : 'Únete a CineVOD gratuitamente'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="form-input"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Cargando...' : (modo === 'login' ? 'Entrar' : 'Registrarse')}
          </button>
        </form>

        <div className="auth-switch">
          {modo === 'login' ? (
            <p>¿No tienes cuenta?{' '}
              <button className="btn-link" onClick={() => setModo('register')}>
                Regístrate
              </button>
            </p>
          ) : (
            <p>¿Ya tienes cuenta?{' '}
              <button className="btn-link" onClick={() => setModo('login')}>
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
