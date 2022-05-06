import React from 'react'
import {useNavigate} from "react-router-dom";
import './settings.css'

function Settings() {

  let navigate = useNavigate();

  return (
    <div style={{

        margin: "0",
        position: "absolute",
        top: "50%",
        left: "60%",
        msTransform: "translate(-50%, -60%)",
        transform: "translate(-50%, -60%)",
  
      }}>
  
        <h1 className='h1'> Ajustes </h1>
  
          <div className='gridScreenS'>
  
            <button className='coolButton'>Tutorial de uso</button>
            <button className='coolButton' style={{

                backgroundColor: "#FFDAD4"

            }} onClick = {() => {

              navigate("/")

            }}>Cerrar sesión</button>
  
          </div>
  
  
      </div>
  )
}

export {Settings}