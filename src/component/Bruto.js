import React, { Fragment, useState} from 'react';
import {db} from '../firebase/firebase';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

const Bruto = ({consulta}) => {

    const[mostrarform,setMostarForm] = useState(false)
    
    const [bruto,guardarBruto] = useState({
        nombre:'',
        fecha:'',
        clave:'',
        clave2:'',
        ubicacion:'',
        linkBruto:'',
        linkExportado:''
    });
    const {nombre,fecha,linkBruto,linkExportado,ubicacion,id,clave,clave2} = bruto;
    const history = useHistory();

    
    
    const eliminar = async(id) => {
        try {
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
            
            })
            await db.collection('brutos').doc(id).delete();  
        
            history.push('/tareas');
        } catch (error) {
            console.log(error);
        }
    }
    const comenzarEdicion = (consulta) => {
        setMostarForm(true)
        guardarBruto(consulta)
        
    }
    const onChangeBruto = e => {
        guardarBruto({
            ...bruto,
            [e.target.name]:e.target.value
        });
    }
    const confirmarEdicion = async(e) => {
        e.preventDefault();

        try {
            await db.collection('brutos').doc(id).update({
                nombre:bruto.nombre,
                fecha:bruto.fecha,
                clave:bruto.clave,
                clave2:bruto.clave2,
                linkBruto:bruto.linkBruto,
                linkExportado:bruto.linkExportado,
                ubicacion:bruto.ubicacion
            })
            setMostarForm(false);
            Swal.fire({
                icon: 'success',
                title: '',
                text: 'La informacion se edito correctamente'
            })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <Fragment>
                {mostrarform ? (
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className='text-center font-weignt-bold mt-1'>AGREGAR INFORMACION</h1>
                                <form 
                                    onSubmit = {confirmarEdicion}
                                >
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label >Nombre del archivo:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name='nombre'
                                                value = {nombre}
                                                onChange = {onChangeBruto}
                                                
                                                
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Fecha:</label>
                                            <input 
                                                type="type" 
                                                className="form-control"
                                                name= 'fecha'
                                                value= {fecha}
                                                onChange = {onChangeBruto}
                                            
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
                                                value={clave}
                                                onChange = {onChangeBruto}
                                            
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Palabra clave #:</label>
                                            <input 
                                                type="type" 
                                                className="form-control"
                                                name='clave2'
                                                value={clave2}
                                                onChange = {onChangeBruto}
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
                                            onChange = {onChangeBruto}
                                        
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label >Link de archivo Exportado:</label>
                                            <input 
                                            type="text" 
                                            className="form-control"
                                            name = 'linkExportado'
                                            value={linkExportado}
                                            onChange = {onChangeBruto}
                                        
                                            />
                                        </div>
                        
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label >Ubicacion del Archivo:</label>
                                            <input 
                                            type="text" className="form-control" 
                                                value ={ubicacion}
                                                name='ubicacion'
                                                onChange = {onChangeBruto}
                                            
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn boton  font-weight-bold text-uppercase  text-white d-block w-100"> Confirmar Edicion</button>
                                </form>
                            </div>
                        </div>
                ) : (
                    <div >
                        <div className="col md-4 mb-3 font-weight-bold ml-5">
                            <div className="card ">
                        
                                <h2 className='card-header '>Titulo: {consulta.nombre.replace(/^\w/, (c) => c.toUpperCase())}</h2>
                                <div className='card-body'>
                                    <ul>
                                        <li className='mt-2'>Fecha: {consulta.fecha}</li>
                                        <li>Ubicacion:  {consulta.ubicacion.replace(/^\w/, (c) => c.toUpperCase())}</li>
                                        <li>Link Bruto:   {consulta.linkBruto}</li>
                                        <li>Link Exportado: {consulta.linkExportado}</li>
                                    </ul>
                                        <button 
                                            type="button"
                                            className="btn btn-primary ml-2"
                                            onClick= {() => comenzarEdicion(consulta)}
                                            >Editar
                                        </button>
                                        
                                        <button
                                            type="button"
                                            className="btn btn-danger ml-4"
                                            onClick={() => eliminar(consulta.id)}
                                        >
                                        Eliminar
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                
        </Fragment>
    )
}

export default Bruto
