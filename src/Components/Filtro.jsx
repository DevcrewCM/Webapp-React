function Filtro({ categorias, categoriaActiva, onCambio }) {
  return (
    <div className="filtro-container">
      {categorias.map(cat => (
        <button
          key={cat}
          className={`filtro-btn ${categoriaActiva === cat ? 'activo' : ''}`}
          onClick={() => onCambio(cat)}
        >
          {cat === 'todas' ? 'Todas' : cat}
        </button>
      ))}
    </div>
  )
}

export default Filtro