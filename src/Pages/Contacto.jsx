function Contacto() {
  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Contacto</h1>
        <p className="static-subtitulo">Estamos aquí para ayudarte</p>
      </div>

      <div className="static-content">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">@</div>
            <h3>Email</h3>
            <p>contacto@cinevod.es</p>
            <p className="contact-nota">Respondemos en menos de 24 horas laborables</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">T</div>
            <h3>Teléfono</h3>
            <p>+34 900 123 456</p>
            <p className="contact-nota">Lunes a viernes, 9:00 - 18:00</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">D</div>
            <h3>Dirección</h3>
            <p>Av navarra, 42</p>
            <p>31006 Pamplona, Navarra, España</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Envíanos un mensaje</h2>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado (demo)') }}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" type="text" placeholder="Tu nombre" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="email-contacto">Email</label>
                <input id="email-contacto" type="email" placeholder="tu@email.com" className="form-input" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asunto">Asunto</label>
              <input id="asunto" type="text" placeholder="¿En qué podemos ayudarte?" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" rows={5} placeholder="Escribe tu mensaje aquí..." className="form-input form-textarea" required />
            </div>
            <button type="submit" className="btn-primary">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contacto
