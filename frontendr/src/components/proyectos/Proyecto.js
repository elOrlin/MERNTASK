import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {

    //obtener el estate del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    const tareasContext = useContext(TareaContext)
    const {obtenerTareas} = tareasContext;

    const seleccionarProyecto = id => {
        proyectoActual(id); //fijar un proyecto actual
        obtenerTareas(id) //filtrar las tareas 
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;