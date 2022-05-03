import React from 'react'

function Elemento(props) {
  return (

    <div className='elemento'>

        <p>{props.nombre}</p>
        <p style={{fontWeight: "500"}}>{props.fecha}</p>

    </div>
  )
}

export {Elemento}