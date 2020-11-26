import React, { useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import {auth,db} from '../firebase/firebase';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const[pass,setPass] = useState('');
    const [error ,setError] = useState(false);
    const [esRegistro,setEsRegistro] = useState(true);


    const procesarDatos = e => {
        e.preventDefault();
        if(!email.trim()||!pass.trim()){ 
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos son Obligatorios',
            })
            return;
        }
        if(pass.length < 6){
            Swal.fire({
            icon: 'error',
            title: 'Tu contraseña debe tener  al menos 6 caracteres...',
            })
            return;
        }
        if(esRegistro){
            registrar();
        } 
        if(!esRegistro){
            login();
        }
    
    }

    const registrar = useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass);
    
            //console.log(res)
            await db.collection('usuarios').doc(res.user.email).set({
                fechaCreacion: Date.now(),
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                email: res.user.email,
                uid: res.user.uid
            })
            
            setEmail('');
            setPass('');
            setError(false);  
            history.push('/Seguridad')
        } catch (error) {
            console.log(error);
            if(error.code ===  "auth/invalid-email"){
                setError('Email no valido')
            }
            if(error.code === "auth/email-already-in-use"){
                setError('Este email ya esta registrado')
            }
        }
    },[email,pass,history]);

    const login = useCallback(async() => {

        try {
            await auth.signInWithEmailAndPassword(email, pass);
            setEmail('')
            setPass('')
            setError(null)
            history.push('/Seguridad') 
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                setError('Usuario o contraseña incorrecta')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Usuario o contraseña incorrecta')
            }
            console.log(error.code)
            console.log(error.message)
        }
    }, [email, pass, history])

    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
                    <div className='card'>
                        <h2 className='text-center font-weight-bold mt-2'>
                            {esRegistro ? 'Registro de Usuarios': 'Login de Acceso'}
                        </h2>
                            <div className='card-body'>
                                <form
                                    onSubmit={procesarDatos}
                                >
                                {error && (<div className='alert alert-danger text-center'>{error}</div>)}
                                    <input 
                                        type='email'
                                        className='form-control text-center mb-3'
                                        placeholder='Ingrese un Email'
                                        value={email}
                                        onChange= {(e) => setEmail(e.target.value)}
                                    />
                                    <input 
                                        type='password'
                                        className='form-control mb-3 text-center'
                                        placeholder='Ingrese una Contraseña'
                                        value={pass}
                                        onChange= {(e) => setPass(e.target.value)}
                                    />
                                    <button
                                        type='submit'
                                        className='btn btn-dark btn-block btn-lg mb-3'
                                    >{esRegistro ? 'Registrarse': 'Acceder'}</button>   
                                    <button 
                                        className="btn btn-sm btn-info btn-block"
                                        type="button"
                                        onClick={() => setEsRegistro(!esRegistro)}
                                    >
                                        {esRegistro ? '¿Ya estas Registrado?' : '¿No tienes Cuenta?'}
                                    </button> 
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
