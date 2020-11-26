import React,{Fragment, useEffect, useState} from 'react';
import {db} from '../firebase/firebase';
import Bruto from './Bruto';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';



const Sidebar = styled.aside`
    margin: 0;
    padding-left: 20px;
    width: 200px;
    background-color: #343a40;
    position: fixed;
    height: 100vh;
    opacity:0.8;
    z-index:200;
    animation:slide-open 0.5s forwards;
    

`;
const SidebarUl = styled.ul`
    color: rgba(230, 230, 230, .9);
    list-style: none;
    padding: 15px 10px;
    border-bottom: 1px solid rgba(100, 100, 100, .3);
    text-align: left;
    cursor: pointer;
    a:hover {
    background-color: yellow;
    text-decoration:none;
}

`;



const Consultar = () => {
    //const history = useHistory();

    const [brutos,setBrutos] = useState([]);
    const [busqueda,setBusqueda] = useState('');
    const [consultas,setConsultas] = useState([]);
    const {buscar} = busqueda;
    useEffect(() => {

        const obtenerDatos = async() => {
            //const db = firebase.firestore();
            try {
                const data = await db.collection('brutos').get();
                const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                console.log(arrayData);
                setBrutos(arrayData);
            } catch (error) {
                console.log(error);
                
            }
        }
        obtenerDatos();
    },[]);


    const onSubmitBuscar = e => {
        e.preventDefault();
        if(busqueda.trim() === ''){
            return  Swal.fire({
                icon: 'error',
                title: 'Todos los Campos son Obligatorios',
            });
        };
        const respuesta = brutos.filter(bruto => {
            return (bruto.nombre.trim() === busqueda.trim()||bruto.fecha === busqueda ||  bruto.clave.trim() === busqueda.trim()||bruto.clave2.trim() === busqueda.trim() ||bruto.ubicacion.trim() === busqueda.trim()  )
            
        });
        //console.log(respuesta);
        setConsultas(respuesta);

    }



    return (
        <Fragment>
            <Sidebar >
                <SidebarUl>
                    
                    <Link to='/agregar' className='text-white font-weight-bold'><li  className='mt-4'>Agregar Informacion</li></Link>
                    <hr/>
                    <Link to='/consultar' className='text-white font-weight-bold'><li  className='mt-4'>Buscar Informacion</li></Link>
                    <hr/>
                    <Link to='/tareas' className='text-white font-weight-bold'><li  className='mt-4'>Lista de Tareas</li></Link>
                </SidebarUl>

            </Sidebar>
            

            <div className=" container mt-5  ">
                <div className=" row justify-content-center">
                    <div className='col-md-8'>
                        <h2 className="text-center text-white mb-4  font-weight-bold">
                            Buscar información
                        </h2>
                            <form
                                onSubmit = {onSubmitBuscar}
                            >
                                <div className='form-group'>
                                    <input 
                                        type='text'
                                        name='buscar'
                                        className="form-control text-center"
                                        placeholder= 'Ej: Parque Sarmiento'
                                        value = {buscar}
                                        onChange = {e => setBusqueda(e.target.value)}
                                        
                                    />
                                </div>
                                <button
                                        type="submit"
                                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                    >Buscar Informacion</button>
                            </form>
                        </div>
                        <div className=' mt-5'>
                                
                                {consultas.length === 0 ? null : (
                                    consultas.map(consulta => (
                                        <Bruto 
                                            key = {consulta.id}
                                            consulta = {consulta}
                                        />

                                    ))
                                    
                                )}
                            </div>
                    </div>
                </div>
            
        </Fragment>
    );
}

export default Consultar
