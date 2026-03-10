function Pelicula(props) {

    const db = {
        "1": {
            "nombre": "Pelicula 1",
            "categorias": ["accion", "aventuras"]
        },
        "2": {
            "nombre": "Pelicula 2",
            "categorias": ["misterio"]
        },
        "3": {
            "nombre": "Pelicula 3",
            "categorias": ["romance", "accion"]
        },
        "4": {
            "nombre": "Pelicula 4",
            "categorias": ["terror"]
        },

    }
    const nombre = db[props.ident].nombre
    
    let filtrado = true
    for (let i = 0; i< db[props.ident].categorias.length; i++){
        if (db[props.ident].categorias[i] == props.categoria) {
            filtrado = false
            break
        }
    }
    let codigo
    if (!filtrado || props.categoria=="todas"){
        codigo = <h3>{nombre}</h3>
    }

    return(
        <>
            {codigo}
        </>
    )
}

export default Pelicula