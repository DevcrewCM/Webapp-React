import { captureOwnerStack } from "react"
import { useState } from "react"
import Pelicula from "./Pelicula"
import Filtro from "./Filtro"

function ListaPeliculas() {

    let [categoria, setCategoria] = useState("todas")

    const modCategoria = (categoria) => {
        setCategoria(categoria)
    }

    return(
        <>
            <Filtro modC={modCategoria}> </Filtro>
            <Pelicula ident="1" categoria={categoria}></Pelicula>
            <Pelicula ident="2" categoria={categoria}></Pelicula>
            <Pelicula ident="3" categoria={categoria}></Pelicula>
            <Pelicula ident="4" categoria={categoria}></Pelicula>
        </>
    )
    

}
export default ListaPeliculas