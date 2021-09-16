import React, {useContext, useState, useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

const proyectosContext = useContext(proyectoContext);
const {proyecto} = proyectosContext;

const tareasContext = useContext(TareaContext);
const {tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, eliminarTarea} = tareasContext;

const [tarea, guardarTarea] = useState({
    nombre: ''
})


useEffect(() =>{
    if(tareaSeleccionada !== null){
        guardarTarea(tareaSeleccionada)
    }else{
        guardarTarea({
            nombre: ''
        })
    }
}, [tareaSeleccionada])

if(!proyecto) return null

const [proyectoActual] = proyecto;

const actualizarState = e => {
    guardarTarea({
        ...tarea,
        [e.target.name] : e.target.value
    })
}

const {nombre} = tarea;

const agregarTareas = e => {
    e.preventDefault();

    //validar
    if(nombre.trim() === ''){
        validarTarea()
        return null;
    }

    if(tareaSeleccionada === null){

        //agregar la nueva tarea al state de tareas
        tarea.proyecto = proyectoActual._id;
        agregarTarea(tarea)

    }else{

        actualizarTarea(tarea)

        eliminarTarea()
    }
    

    obtenerTareas(proyectoActual._id)

    //reiniciar el form
    guardarTarea({
        nombre: ''
    })
}

    return ( 
        <div className="formulario">
            <form
                onSubmit={agregarTareas}
            >
                <div className="contendor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        value={nombre}
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="contendor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>

     );
}
 
export default FormTarea;