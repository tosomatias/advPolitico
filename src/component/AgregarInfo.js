import React, { Fragment,useState } from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import {db} from '../firebase/firebase';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';




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

const AgregarInfo = () => {
    const history = useHistory();
    
    const [agregar,setAgregar] = useState({
        nombre:'',
        fecha:'',
        clave:'',
        clave2:'',
        linkBruto:'',
        linkExportado:'',
        ubicacion:''
    });
    
    const actualizarState= e => {
        setAgregar({
            ...agregar,
            [e.target.name]:e.target.value
        });
    }

    const {nombre,fecha,clave,clave2,linkBruto,linkExportado,ubicacion} = agregar;
    const submitNuevoBruto= async(e) => {
        e.preventDefault();
        if(nombre.trim() === ''|| clave.trim() === ''|| clave2.trim() === '' || ubicacion.trim() === '' || linkBruto.trim() === ''){
            return  Swal.fire({
                icon: 'error',
                title: 'Todos los Campos son Obligatorios',
            });
        }
        //console.log(agregar.nombre);
        try {
            const nuevoBruto = {
                nombre:agregar.nombre,
                fecha:agregar.fecha,
                clave:agregar.clave,
                clave2:agregar.clave2,
                linkBruto:agregar.linkBruto,
                linkExportado:agregar.linkExportado,
                ubicacion:agregar.ubicacion
            }
            await db.collection('brutos').add(nuevoBruto)
            Swal.fire({
                icon: 'success',
                title: '',
                text: 'La informacion se agrego correctamente'
            })
            setAgregar({});
            history.push('/consultar')
        } catch (error) {
            console.log(error);
        }
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
            
            <div className='row justify-content-center mt-4'>
                <div className='col-12 col-sm-8 '>
                    <div className='card'>
                    
                        <div className='card-body'>
                        <h1 className='text-center font-weignt-bold mt-1'>AGREGAR INFORMACION</h1>
                            <form 
                                onSubmit={submitNuevoBruto}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Nombre del archivo:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name='nombre'
                                            value={nombre}
                                            onChange={actualizarState} 
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Fecha:</label>
                                        <input 
                                            type="type" 
                                            className="form-control"
                                            name= 'fecha'
                                            value= {fecha}
                                            onChange={actualizarState} 
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Palabra Clave:</label>
                                        <input 
                                            type="text" 
                                            name='clave'
                                            className="form-control"  
                                            value = {clave}
                                            onChange={actualizarState}  
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Palabra clave #:</label>
                                        <input 
                                            type="type" 
                                            className="form-control"
                                            name='clave2'
                                            value = {clave2} 
                                            onChange={actualizarState} 
                                        />
                                    </div>
                                </div>
                                    <div className="form-group">
                                        <label >Link de archivo Bruto:</label>
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        name='linkBruto'
                                        value={linkBruto}
                                        onChange={actualizarState}  
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label >Link de archivo Exportado:</label>
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        name = 'linkExportado'
                                        value={linkExportado}
                                        onChange={actualizarState} 
                                        />
                                    </div>
                    
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Ubicacion del Archivo:</label>
                                        <input 
                                        type="text" className="form-control" 
                                            value = {ubicacion}
                                            name='ubicacion'
                                            onChange={actualizarState} 
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn boton  font-weight-bold text-uppercase  text-white d-block w-100"> Confirmar Informacion</button>
                            </form>

                        </div>

                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default AgregarInfo
