import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'
//import shortid from 'shortid'

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    const obtenerTareas = async proyecto => {

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarTarea = async tarea => {
      
        try{
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREAS,
                payload: tarea
            })
        }catch(error){
            console.log(error)
        }   
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
            payload: true
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try{
            const resultado = await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            console.log(resultado)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        }catch(error){
            console.log(error)
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea => {
        try{
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
            console.log(resultado)
        }catch(error){
            console.log(error)
        }
    }

    const limpiarTarea = tarea => {
        dispatch({
            type: LIMPIAR_TAREA,
            payload: tarea
        })
    }
    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}
export default TareaState;