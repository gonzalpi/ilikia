import React from 'react';
import './MainScreenAdmin.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Elemento } from './elemento/Elemento';
import { ElementoEX } from './elemento/Elemento';
import {

    BrowserRouter as Router,
    Route,
    Routes,
    Link
  
  } from "react-router-dom";

function ExamenesPacientes(props) {

    let {id} = useParams();

    var names = [['19ABF0','03-05-2022'],['1HA30F', '03-04-2022'],['AS42Z3', '03-04-2022'],['H4B5K','01-01-2022']] 
    const items = []
  
    for (var i = 0; i < names.length; i++) {
  
      var idEx = names[i][0]
      var fechaExamen = names[i][1]
      
      items.push(<ElementoEX nombre={idEx} fecha = {fechaExamen}/>)
  
    }

  return (
    <div style={{margin: "0 auto", width: "75%"}}>

        <h1 className='h1'>{id}</h1>
        
        <div>

            <div style={{

                display: "grid",
                gridTemplateColumns: "50% 50%",
                fontFamily: "Montserrat",
                fontWeight: "500",
                fontSize: "1.3em",
                textAlign: "center"

            }}>

                <p>ID</p>
                <p>Fecha</p>

            </div>

            {items}

        </div>

    </div>
  )
}

export {ExamenesPacientes}