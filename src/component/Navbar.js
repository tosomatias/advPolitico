import React from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import imagen from '../imagenes/adv.jpg';
import {auth} from '../firebase/firebase';


const Navbar = ({firebase,datos}) => {
    const history = useHistory();

    const cerrarSesion = () => {
        
        auth.signOut()
            .then(() => {
                history.push('/login')
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" >
                <img src={imagen} width="40" height="40"  className="d-inline-block align-top " alt="imagen" /><span className='ml-4'>MARKETING POLITICO</span></a>
            <div>
                <div className="d-flex ">
                {firebase ?<p className='text-white font-weight-bold mt-2 '
                >Hola {datos.email}</p>:(
                    <NavLink 
                        className="btn btn-dark mr-4"  
                        to="/login"
                    >
                        INICIAR SESION
                    </NavLink>
                )}
            
                {firebase ? ( <NavLink 
                        className="btn btn-dark mr-4 mt-1"  
                        to="/login"
                        onClick= {() => cerrarSesion()}
                    >
                        CERRAR SESION
                    </NavLink>):null}
                </div>
        
                
            </div>
        </div>
    );
}

export default Navbar;