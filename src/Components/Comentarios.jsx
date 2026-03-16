import { useState } from 'react'

function Comentarios({ comentarios, user, onAddComentario }) {
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    setEnviando(true)
    await onAddComentario(texto.trim())
    setTexto('')
    setEnviando(false)
  }

  const formatDate = (fecha) => {
    if (!fecha) return ''
    const d = fecha.seconds ? new Date(fecha.seconds * 1000) : new Date(fecha)
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="comentarios-section">
      {user && (
        <form onSubmit={handleSubmit} className="comentario-form">
          <div className="comentario-form-header">
            <div className="avatar-sm">{user.email[0].toUpperCase()}</div>
            <span className="comentario-email">{user.email}</span>
          </div>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe tu comentario..."
            rows={3}
            className="form-input form-textarea"
            maxLength={500}
          />
          <div className="comentario-form-footer">
            <span className="char-count">{texto.length}/500</span>
            <button type="submit" className="btn-primary" disabled={enviando || !texto.trim()}>
              {enviando ? 'Enviando...' : 'Publicar comentario'}
            </button>
          </div>
        </form>
      )}

      {!user && (
        <div className="aviso-login comentarios-aviso">
          <a href="/login">Inicia sesión</a> para dejar un comentario
        </div>
      )}

      <div className="comentarios-lista">
        {comentarios.length === 0 ? (
          <p className="sin-comentarios">Sé el primero en comentar esta película.</p>
        ) : (
          comentarios.map(com => (
            <div key={com.id} className="comentario-item">
              <div className="comentario-header">
                <div className="avatar">{com.userEmail[0].toUpperCase()}</div>
                <div className="comentario-autor-info">
                  <span className="comentario-autor">{com.userEmail}</span>
                  <span className="comentario-fecha">{formatDate(com.fecha)}</span>
                </div>
              </div>
              <p className="comentario-texto">{com.texto}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Comentarios
