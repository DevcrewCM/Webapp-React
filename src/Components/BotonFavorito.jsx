function BotonFavorito({ esFavorito, onToggle }) {
  return (
    <button
      className={`btn-favorito ${esFavorito ? 'es-favorito' : ''}`}
      onClick={onToggle}
      aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <span className="fav-icono">{esFavorito ? '♥' : '♡'}</span>
      <span>{esFavorito ? 'En favoritos' : 'Añadir a favoritos'}</span>
    </button>
  )
}

export default BotonFavorito
