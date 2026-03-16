function AvisoLegal() {
  return (
    <div className="static-page">
      <div className="static-hero">
        <h1>Aviso Legal</h1>
        <p className="static-subtitulo">Términos y condiciones de uso</p>
      </div>

      <div className="static-content legal-content">
        <div className="legal-section">
          <h2>1. Datos del Titular</h2>
          <p>
            En cumplimiento con el deber de información recogido en el artículo 10
            de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
            Información y del Comercio Electrónico (LSSI-CE), se facilitan los
            siguientes datos:
          </p>
          <ul>
            <li><strong>Razón social:</strong> CineVOD S.L.</li>
            <li><strong>CIF:</strong> B-12345678</li>
            <li><strong>Domicilio:</strong> Calle del Cine, 42, 28001 Madrid, España</li>
            <li><strong>Email:</strong> contacto@cinevod.es</li>
            <li><strong>Teléfono:</strong> +34 900 123 456</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>2. Condiciones de Uso</h2>
          <p>
            El acceso y uso de este sitio web implica la aceptación de las presentes
            condiciones de uso. El usuario se compromete a hacer un uso adecuado de
            los contenidos y servicios ofrecidos a través de este portal.
          </p>
          <p>
            Queda prohibido el uso de este sitio web con fines ilegales o no
            autorizados, así como la reproducción, distribución o modificación de
            los contenidos sin autorización expresa del titular.
          </p>
        </div>

        <div className="legal-section">
          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todos los contenidos del sitio web, incluyendo textos, imágenes, gráficos
            y código fuente, son propiedad de CineVOD S.L. o de sus respectivos
            titulares, y están protegidos por las leyes de propiedad intelectual e
            industrial. Los títulos, sinopsis e imágenes de películas se utilizan
            únicamente con fines informativos y educativos.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Protección de Datos (RGPD)</h2>
          <p>
            De conformidad con el Reglamento General de Protección de Datos (RGPD),
            le informamos que los datos personales que nos facilite serán tratados
            por CineVOD S.L. con la finalidad de gestionar su cuenta de usuario y
            prestar los servicios solicitados.
          </p>
          <p>
            Tiene derecho a acceder, rectificar y suprimir los datos, así como otros
            derechos, dirigiéndose a contacto@cinevod.es.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Política de Cookies</h2>
          <p>
            Este sitio web utiliza cookies propias de sesión necesarias para el
            funcionamiento del servicio de autenticación. No se utilizan cookies
            de seguimiento ni publicidad de terceros.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española.
            Para la resolución de cualquier conflicto, las partes se someten a los
            juzgados y tribunales de Madrid.
          </p>
        </div>

        <p className="legal-fecha">
          Última actualización: Marzo 2026
        </p>
      </div>
    </div>
  )
}

export default AvisoLegal
