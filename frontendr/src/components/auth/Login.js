import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext;

    const authContent = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContent;

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
        email: '',
        password: ''
    })

    const {email, password} = usuario;

    const leerValores = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const validarUsuario = e => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }

        iniciarSesion({ email, password })
    }

    return ( 
        <div className="form-usuario">
            {alerta ? <p className={`alerta ${alerta.categoria}`}>{alerta.msg}</p> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form onSubmit={validarUsuario}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu Email"
                            onChange={leerValores}
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
                            onChange={leerValores}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Iniciar Sesion" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;