function Filtro(props) {

    const categoriaHandler = (event) =>{
        props.modC(event.target.value)
    }

    return (
            <select defaultValue="todas" onChange={categoriaHandler}>
                <option value="todas">todas</option>
                <option value="accion">accion</option>
                <option value="aventuras">aventuras</option>
                <option value="misterio">misterio</option>
                <option value="romance">romance</option>
                <option value="terror">terror</option>
            </select>

    )
}

export default Filtro