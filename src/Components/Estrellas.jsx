import { useState } from 'react'

function Estrellas({ valor, onPuntuar }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="estrellas-widget">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          className={`estrella-btn ${n <= (hover || valor) ? 'activa' : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onPuntuar(n)}
          title={`${n} estrella${n > 1 ? 's' : ''}`}
          aria-label={`Puntuar ${n} de 5`}
        >
          ★
        </button>
      ))}
      {valor && (
        <span className="estrella-valor">{valor}/5</span>
      )}
    </div>
  )
}

export default Estrellas
