import { useState, useEffect } from 'react'
import { getPeliculas, getFavoritos } from '../firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Favoritos() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    const cargar = async () => {
      setLoading(true)
      const favIds = await getFavoritos(user.uid)
      if (favIds.length === 0) {
        setPeliculas([])
        setLoading(false)
        return
      }
      const todas = await getPeliculas()
      const favoritas = todas.filter(p => favIds.includes(p.id))
      setPeliculas(favoritas)
      setLoading(false)
    }
    cargar()
  }, [user])

  if (loading) return <div className="loading"><div className="spinner"></div></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mis Favoritos</h1>
        <p className="page-subtitle">Tus películas guardadas</p>
      </div>

      {peliculas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h2>No tienes favoritos aún</h2>
          <p>Explora el catálogo y guarda las películas que más te gusten.</p>
          <Link to="/" className="btn-primary">Ver catálogo</Link>
        </div>
      ) : (
        <div className="peliculas-grid">
          {peliculas.map(pelicula => {
            const media = pelicula.numVotos > 0
              ? (pelicula.puntuacionTotal / pelicula.numVotos).toFixed(1)
              : null
            return (
              <Link key={pelicula.id} to={`/pelicula/${pelicula.id}`} className="pelicula-card">
                <div className="card-poster">
                  <img
                    src={pelicula.poster}
                    alt={pelicula.titulo}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/e94560?text=Sin+imagen' }}
                  />
                  <div className="card-overlay">
                    <span className="ver-ficha">Ver ficha →</span>
                  </div>
                </div>
                <div className="card-info">
                  <h3 className="card-titulo">{pelicula.titulo}</h3>
                  <div className="card-meta">
                    <span>{pelicula.año}</span>
                    <span>{media ? media : 'Sin votos'}</span>
                  </div>
                  <div className="card-categorias">
                    {pelicula.categorias?.slice(0, 2).map(cat => (
                      <span key={cat} className="categoria-badge-sm">{cat}</span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Favoritos
