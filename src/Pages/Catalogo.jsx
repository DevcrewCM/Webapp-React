import { useState, useEffect } from 'react'
import { getPeliculas } from '../firebase/firestore'
import { Link } from 'react-router-dom'
import Filtro from '../Components/Filtro'

const CATEGORIAS = ['todas', 'accion', 'aventuras', 'ciencia ficcion', 'crimen', 'drama', 'fantasia', 'misterio', 'romance', 'terror']

function Catalogo() {
  const [peliculas, setPeliculas] = useState([])
  const [categoria, setCategoria] = useState('todas')
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      const data = await getPeliculas()
      setPeliculas(data)
      setLoading(false)
    }
    cargar()
  }, [])

  const peliculasFiltradas = peliculas.filter(p => {
    const matchCategoria = categoria === 'todas' || p.categorias?.includes(categoria)
    const matchBusqueda = p.titulo?.toLowerCase().includes(busqueda.toLowerCase())
    return matchCategoria && matchBusqueda
  })

  if (loading) return <div className="loading"><div className="spinner"></div></div>

  return (
    <div className="page-container">
      <div className="catalogo-hero">
        <h1>Catálogo de Películas</h1>
        <p className="catalogo-subtitulo">Descubre, puntúa y guarda tus favoritas</p>

        <div className="catalogo-busqueda">
          <input
            type="text"
            placeholder="Buscar película..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="busqueda-input"
          />
        </div>
      </div>

      <Filtro
        categorias={CATEGORIAS}
        categoriaActiva={categoria}
        onCambio={setCategoria}
      />

      {peliculasFiltradas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h2>No hay películas en esta categoría</h2>
          <p>Prueba con otra categoría o limpia la búsqueda.</p>
        </div>
      ) : (
        <div className="peliculas-grid">
          {peliculasFiltradas.map(pelicula => {
            const media = pelicula.numVotos > 0
              ? (pelicula.puntuacionTotal / pelicula.numVotos).toFixed(1)
              : null
            return (
              <Link key={pelicula.id} to={`/pelicula/${pelicula.id}`} className="pelicula-card">
                <div className="card-poster">
                  <img
                    src={pelicula.poster}
                    alt={pelicula.titulo}
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/e94560?text=Sin+imagen' }}
                  />
                  <div className="card-overlay">
                    <span className="ver-ficha">Ver ficha →</span>
                  </div>
                  {media && (
                    <div className="card-rating">
                      {media}
                    </div>
                  )}
                </div>
                <div className="card-info">
                  <h3 className="card-titulo">{pelicula.titulo}</h3>
                  <div className="card-meta">
                    <span>{pelicula.año}</span>
                    <span>{pelicula.duracion}</span>
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

export default Catalogo
