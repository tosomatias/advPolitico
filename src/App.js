import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Inicio from './component/Inicio';
import Login from './component/Login';
import AgregarInfo from './component/AgregarInfo';
import Consultar from './component/Consultar';
import Seguridad from './component/Seguridad';
import Tareas from './component/Tareas';
import {auth} from './firebase/firebase';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  const [firebase,setFirebase] = useState(false);
  const [datos,setDatos] = useState([]);


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if(user){
        setFirebase(user);
        setDatos(user);
      }else{
        setFirebase(null);
      }
    })
  },[])

  return  firebase !== false ? (
    <Router>
      <Navbar  firebase = {firebase}  datos = {datos}/>
      <Switch>
        <Route exact path='/' component={Inicio}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/seguridad' component={Seguridad}/>
        <Route exact path = '/agregar' component={AgregarInfo}/>
        <Route exact path = '/consultar' component={Consultar}/>
        <Route exact path = '/tareas' component={Tareas}/>
      </Switch>
    </Router>
  ): (<p>Cargando .....</p>);
}

export default App;
