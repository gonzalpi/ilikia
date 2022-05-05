import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './examenResultados.css'

function Score(props) {

    return (

        <p className='score'>{props.sb}</p>

    )

}

function ExamenResultados() {
    
    let {id} = useParams()

  return (

<div style={{

margin: "0 auto",
width: "75%"

}}>

<h1 className='h1'> {id} </h1>

  <div className='containerExam'>
    
    <p>Orientación: </p>
    <Score sb="3"/>

    <p>Registro, memoria inmediata: </p>
    <Score sb="3"/>

    <p>Atención y cálculo: </p>
    <Score sb="3"/>
    
    <p>Lenguaje: </p>
    <Score sb="3"/>

    <p>Memoria diferida: </p>
    <Score sb="3"/>
    
    <p>Viso / espacial: </p>
    <Score sb="3"/>

    <p>Memoria semántica: </p>
    <Score sb="3"/>

    <p>Lenguaje y repetición: </p>
    <Score sb="3"/>

    <p style={{fontWeight: "bold"}}>Total: </p>
    <Score sb="30"/>
    


  </div>

</div>

  )
}

export {ExamenResultados}