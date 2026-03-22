import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPelicula, getComentarios, addComentario, getFavoritos, addFavorito, removeFavorito, getPuntuacionUsuario, setPuntuacion } from '../firebase/firestore'
import { useAuth } from '../context/AuthContext'
import Estrellas from '../Components/Estrellas'
import BotonFavorito from '../Components/BotonFavorito'
import Comentarios from '../Components/Comentarios'

function FichaPelicula() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [pelicula, setPelicula] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comentarios, setComentarios] = useState([])
  const [esFavorito, setEsFavorito] = useState(false)
  const [miPuntuacion, setMiPuntuacion] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      const data = await getPelicula(id)
      if (!data) { navigate('/'); return }
      setPelicula(data)

      const coms = await getComentarios(id)
      setComentarios(coms)

      if (user) {
        const favs = await getFavoritos(user.uid)
        setEsFavorito(favs.includes(id))
        const puntuacion = await getPuntuacionUsuario(user.uid, id)
        setMiPuntuacion(puntuacion)
      }
      setLoading(false)
    }
    cargar()
  }, [id, user])

  const handlePuntuar = async (valor) => {
    if (!user || !pelicula) return
    const nuevaData = await setPuntuacion(user.uid, id, valor, pelicula)
    setMiPuntuacion(valor)
    setPelicula(prev => ({ ...prev, ...nuevaData }))
  }

  const handleToggleFavorito = async () => {
    if (!user) return
    if (esFavorito) {
      await removeFavorito(user.uid, id)
      setEsFavorito(false)
    } else {
      await addFavorito(user.uid, id)
      setEsFavorito(true)
    }
  }

  const handleAddComentario = async (texto) => {
    if (!user) return
    await addComentario(id, user.uid, user.email, texto)
    const coms = await getComentarios(id)
    setComentarios(coms)
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>
  if (!pelicula) return null

  const puntuacionMedia = pelicula.numVotos > 0
    ? (pelicula.puntuacionTotal / pelicula.numVotos).toFixed(1)
    : null

  return (
    <div className="ficha-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>

      <div className="ficha-hero">
        <div className="ficha-poster">
          <img
            src={pelicula.poster}
            alt={pelicula.titulo}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a2e/e94560?text=Sin+imagen' }}
          />
        </div>

        <div className="ficha-info">
          <div className="ficha-categorias">
            {pelicula.categorias?.map(cat => (
              <span key={cat} className="categoria-badge">{cat}</span>
            ))}
          </div>

          <h1 className="ficha-titulo">{pelicula.titulo}</h1>

          <div className="ficha-meta">
            <span>{pelicula.año}</span>
            <span>{pelicula.duracion}</span>
          </div>

          <p className="ficha-descripcion">{pelicula.descripcion}</p>

          <div className="ficha-puntuacion-bloque">
            <div className="puntuacion-media">
              <span className="estrella-grande">★</span>
              <span className="media-valor">
                {puntuacionMedia ? puntuacionMedia : '—'}
              </span>
              <span className="media-label">
                {pelicula.numVotos > 0 ? `(${pelicula.numVotos} votos)` : 'Sin votos aún'}
              </span>
            </div>

            {user ? (
              <div className="mi-puntuacion">
                <p className="mi-puntuacion-label">Tu valoración:</p>
                <Estrellas valor={miPuntuacion} onPuntuar={handlePuntuar} />
              </div>
            ) : (
              <p className="aviso-login">
                <a href="/login">Inicia sesión</a> para puntuar esta película
              </p>
            )}
          </div>

          {user && (
            <BotonFavorito esFavorito={esFavorito} onToggle={handleToggleFavorito} />
          )}
        </div>
      </div>

      <div className="ficha-comentarios">
        <h2>Comentarios</h2>
        <Comentarios
          comentarios={comentarios}
          user={user}
          onAddComentario={handleAddComentario}
        />
      </div>
    </div>
  )
}

export default FichaPelicula
