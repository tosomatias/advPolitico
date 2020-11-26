import React,{useEffect, useState} from 'react';
import {auth } from '../firebase/firebase';
import {useHistory} from 'react-router-dom';

const Seguridad = () => {
    const history = useHistory();
    const [user,setUser] = useState(null);
    console.log(user);

    useEffect(() => {
        

        if ( auth.currentUser) {
            console.log('existe')
            setUser( auth.currentUser)
        
            history.push('/consultar')
            
        } else {
        console.log('No existe')
        history.push('/login')
        
        }
    },[history])

    return (
        <div>
        
        </div>
    )
}

export default Seguridad
