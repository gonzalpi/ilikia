import React from 'react';
import './MainScreenAdmin.css';

function MainScreenAdmin() {
  return (
    
    
    <div style={{

      margin: "0",
      position: "absolute",
      top: "50%",
      left: "60%",
      msTransform: "translate(-50%, -60%)",
      transform: "translate(-50%, -60%)"

    }}>

      <h1 className='h1'> Administrador </h1>

        <div className='gridScreen'>

          <button className='coolButton'>Gestionar usuarios</button>
          <button className='coolButton'>Gestionar hospitales</button>

        </div>


    </div>

  )
}

export {MainScreenAdmin}