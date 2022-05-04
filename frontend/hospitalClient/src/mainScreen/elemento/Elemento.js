import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Elemento(props) {

  let navigate = useNavigate()
  let link = "examenRes/" + props.nombre

  return (

    <div className='elemento' onClick={ () => {

      navigate(link)

    }



    }>

        <p>{props.nombre}</p>
        <p style={{fontWeight: "500"}}>{props.fecha}</p>

    </div>
  )
}

export {Elemento}