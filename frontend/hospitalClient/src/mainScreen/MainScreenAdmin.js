import React, { useState, useEffect } from 'react';
import './MainScreenAdmin.css';
import { Elemento, ElementoEX } from './elemento/Elemento';
import Sidebar from '../sidebar/Sidebar';
import {

  BrowserRouter as Router,
  Route,
  Routes,
  Link

} from "react-router-dom";

function MainScreenAdmin() {
  const [exams, setExams] = useState(null);
  useEffect(() =>
  {
    fetch("/api/exam")
      .then(res => res.json())
      .then(data =>
        {
          setExams(data.map(x => <Elemento key={x.id_examen} nombre={
            x.nombre_paciente
          } fecha={x.fecha.slice(0, 10)} />));
        });
        console.log(exams);
  }, []);

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

          {exams}
          
        </div>


    </div>

  )
}

export {MainScreenAdmin}