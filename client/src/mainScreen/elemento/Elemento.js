import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ElementoEX(props) {

  let navigate = useNavigate()
  let link = "examenResultados/" + props.nombre

  var header = props.nombre

  return (

    <div className='elemento' onClick={ () => {

      navigate(link)

    }
    
    }>

        <p>{header}</p>
        <p style={{fontWeight: "500"}}>{props.fecha}</p>

    </div>

  )

}

function Elemento(props) {

  let navigate = useNavigate()
  let link = "examenResultados/" + props.idExam
  // console.log(props.nombre)
  // console.log(props.id)
  
  var header = props.nombre

  return (

    <div className='elemento' onClick={ () => {

      navigate(link)

    }

    }>

        <p>{header}</p>
        <p style={{fontWeight: "500"}}>{props.fecha}</p>

    </div>
  )
}

export {Elemento}
export {ElementoEX}