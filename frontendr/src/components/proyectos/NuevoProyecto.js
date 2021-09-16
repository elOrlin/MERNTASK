import React, {Fragment, useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //obtener el estate del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })


    const cambiarState = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre} = proyecto;
    
    const onsubmitProyecto = e => {
        e.preventDefault();

        //validar el proyecto
        if(nombre === ''){
            mostrarError()
            return 
        }

        //agregar al state
        agregarProyecto(proyecto)

        //reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }


    return ( 
       <Fragment>
            <button 
            type="button" 
            className="btn btn-block btn-primario"
            onClick={onClickFormulario}
        >Nuevo Proyecto</button>

            {formulario ? 
                (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onsubmitProyecto}
                >
                 <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre Proyecto"
                    name="nombre"
                    value={nombre}
                    onChange={cambiarState}
                />

                <input 
                    type="submit"
                    className="btn btn-primario btn=block"
                    value="Agregar Proyecto"
                />
                </form>
                ): null
            }
            {errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}
       </Fragment>
     );
}
 
export default NuevoProyecto;