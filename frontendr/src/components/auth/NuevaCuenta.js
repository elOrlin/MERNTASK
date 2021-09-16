import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext;

    const authContent = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContent;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])
    
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const iniciarSeion = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    const {nombre, email, password, confirmar} = usuario;

    const validarUsuario = e => {
        e.preventDefault();

        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }

        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }

        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales', 'alerta-error')
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        })

        guardarUsuario({
            nombre: '',
            email: '',
            password: '',
            confirmar: ''
        })
    }

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form onSubmit={validarUsuario}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu Nombre"
                            onChange={iniciarSeion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu Email"
                            onChange={iniciarSeion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={iniciarSeion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Repetir Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repetir Password"
                            onChange={iniciarSeion}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Registrar" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;