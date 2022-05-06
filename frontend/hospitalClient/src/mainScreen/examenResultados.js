import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './examenResultados.css'

function Score(props) {

    return (

        <p className='score'>{props.sb}</p>

    )

}

function ExamenResultados(props) {
    
    let {id} = useParams()

    var nombrePaciente;
    var nombreDoctor;
    var nombrePersonalDeSalud;

    const [exam, setExam] = useState(null);
    useEffect(() => {

      fetch("/api/exam?id=" + id)
        .then(res => res.json())
        .then(data => {

          setExam(data[0])
          return data[0]
        })
        .then(exam => {
          nombrePaciente = exam.nombre
          console.log(exam)
        })

    }, []);


  return (

<div style={{

margin: "0 auto",
width: "75%"

}}>

<h1 className='h1'> {!exam ? "Cargando...":exam.nombre_paciente} </h1>

  <div className='containerExam'>
    
    <p>Orientación: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_1}/>

    <p>Registro, memoria inmediata: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_2}/>

    <p>Atención y cálculo: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_3}/>
    
    <p>Lenguaje: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_4}/>

    <p>Memoria diferida: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_5}/>
    
    <p>Viso / espacial: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_6}/>

    <p>Memoria semántica: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_7}/>

    <p>Lenguaje y repetición: </p>
    <Score sb={!exam ? "Cargando...":exam.cat_8}/>

    <p style={{fontWeight: "bold"}}>Total: </p>
    <Score sb={!exam ? "Cargando...":exam.total}/>
    


  </div>

</div>

  )
}

export {ExamenResultados}