import React from 'react';
import './MainScreenAdmin.css';
import { Elemento } from './elemento/Elemento';
import { ElementoEX } from './elemento/Elemento';
import Sidebar from '../sidebar/Sidebar';
import {

  BrowserRouter as Router,
  Route,
  Routes,
  Link

} from "react-router-dom";

function MainScreenAdmin() {

  var names = [['Maria Eugenia Durán Cañedo','03-05-2022'],['Javier Sánchez Panduro', '03-04-2022'],['Jesus Miguel Pérez Padilla', '03-04-2022'],['Lydia Delgado Uriarte','01-01-2022']] 
  const items = []

  for (var i = 0; i < names.length; i++) {

    var nombrePaciente = names[i][0]
    var fechaExamen = names[i][1]
    
    items.push(<Elemento nombre={nombrePaciente} fecha = {fechaExamen}/>)

  }

  return (
    
    <div style={{

      margin: "0 auto",
      width: "70%"

    }}>
      <h1 className='h1'> Exámenes recientes </h1>

        <div>

          <div style={{

            display: "grid",
            gridTemplateColumns: "50% 50%",
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "1.3em",
            textAlign: "center"

          }}>

            <p>Nombre</p>
            <p>Fecha</p>

          </div>

          {items}
          {/* <Elemento nombre={"Maria Eugenia Durán Cañedo"} fecha={"02-05-2022"} hora = {"16:21"}/> */}

          
        </div>


    </div>

  )
}

export {MainScreenAdmin}