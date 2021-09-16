import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: action.payload
            }
        case AGREGAR_TAREAS:
            return {
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                errorTarea: false
            }
        case VALIDAR_TAREA: 
            return {
                ...state,
                errorTarea: action.payload
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload )
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                tareaSeleccionada: null
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case LIMPIAR_TAREA: 
            return {
                ...state,
                tareaSeleccionada: null
            }   
        default:
            return state;
    }
}