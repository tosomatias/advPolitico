import React, { Fragment ,useState,useEffect} from 'react'
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import {db} from '../firebase/firebase';
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

const Tareas = () => {
    const [tarea,guardarTarea]= useState('');
    const [modoEdicion,setModoEdicion] =useState (false);
    const [id,setId] = useState('');


    const [tareas,setTareas] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
        
        try {
            
            const data = await db.collection('tareas').get();
            const arrayTareas = data.docs.map(doc => ({id:doc.id,...doc.data()}));
            setTareas(arrayTareas);
        } catch (error) {
            console.log(error);
            
        }
        }
        obtenerDatos();
    },[]);

    const onSubmitTarea = async(e) => {
        e.preventDefault();
        if(!tarea.trim()){
        Swal.fire({
            icon: 'error',
            title: 'Completa todos los campos...',
        })
        return;
        }
        try {
        
        const nuevaTarea = {
            name:tarea,
            fecha:Date.now()
        }
        const data = await db.collection('tareas').add(nuevaTarea);
        setTareas([
            ...tareas,
            {id: data.id, ...nuevaTarea }
        ])
        guardarTarea('');
        } catch (error) {
        console.log(error);
        
        }
        
    }

    const eliminar = async(id)=> {
        console.log(id);

        try {
        
        await db.collection('tareas').doc(id).delete();
        const arrayFiltrado = tareas.filter(tarea => tarea.id !== id);
        setTareas(arrayFiltrado);
        } catch (error) {
        console.log(error);
        }
    }
    const activarEdicion = (tarea) => {
        setModoEdicion(true);
        guardarTarea(tarea.name);
        setId(tarea.id);
    }


    const editar = async (e) => {
        e.preventDefault()
        if(!tarea.trim()){
        console.log('vacio')
        return
        }
        try {

        await db.collection('tareas').doc(id).update({
            name: tarea
        })
        const arrayEditado = tareas.map(item => (
            item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
        ))
        setTareas(arrayEditado)
        setModoEdicion(false)
        setId('')
        guardarTarea('')
        } catch (error) {
        console.log(error)
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

            <div  className='container mt-3 mr-2'>
                <div className='row justify-content-center'>
                
                    <div className='col-md-6'>
                    <h1>{modoEdicion ? <p className='text-white text-center' >Editar</p> : <p className='text-white text-center'>Agregar Tareas</p>}</h1>
                        <form
                        onSubmit={modoEdicion ? editar : onSubmitTarea}
                        >
                        <input type='text' placeholder='Ingrese tarea' className='form-control mb-2' value={tarea} 
                            onChange={e => guardarTarea(e.target.value)}
                        />
                        <button type='submit' className={
                            modoEdicion ? 'btn btn-warning btn-block btn-sm' : 
                            'btn btn-dark btn-block btn-sm'
                            } >
                            {modoEdicion ? 'Confirmar Edicion' : 'Confirmar Tarea'}
                        </button>
                        <div className=''>
                        <h1 className='text-center text-white'>Lista de Tareas</h1>
                        <ul className='list-group'>
                        {tareas.map(tarea => (
                            <li className='list-group-item' key={tarea.id}>
                            {tarea.name}
                            <button
                            type='button'
                            className='btn btn-success btn-sm float-right'
                            onClick={() => activarEdicion(tarea)}
                            
                            >Editar</button>
                            <button
                            type='button'
                            className='btn btn-danger  btn-sm float-right mr-2'
                            onClick = {() => eliminar(tarea.id)}
                            >Eliminar</button>
                            </li>
                        ))}

                        </ul>
                    </div>
                        </form>
                    </div>
                </div>
            </div>
    </Fragment>
    )
}

export default Tareas
