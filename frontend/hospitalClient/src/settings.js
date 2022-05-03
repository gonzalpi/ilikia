import React from 'react'
import './settings.css'

function Settings() {
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

            }}>Cerrar sesión</button>
  
          </div>
  
  
      </div>
  )
}

export {Settings}