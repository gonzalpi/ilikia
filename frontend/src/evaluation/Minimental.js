import React from "react";
import DefaultQuestion from "./DefaultQuestion";
const minimental = require("./minimental.json")
var scores = Array(minimental.questions.length).fill(0)

export default function Evaluation()
{
    const [qNum, setQNum] = React.useState(-1)
    const prevQ = () => {setQNum(qNum - 1)}
    const nextQ = () => {setQNum(qNum + 1)}

    // Suma de puntajes por categoria
    const sumScores = () => {
        let perCategory = Array(minimental.categories.length).fill(0)
        for (let i = 0; i < minimental.questions.length; i++) {
            perCategory[minimental.questions[i].category] += scores[i]
        }
        return perCategory
    }

    // funcion para debugging
    const printState = () => {console.log(scores); console.log(qNum);}
    // funcion placeholder
    const sendData = () => {
        alert("Puntajes enviados: " + sumScores() + "\nPor hacer: conectar a back-end")
    }

    return (
        <>
            {/* Examen */}
            {qNum >= 0 && qNum < minimental.questions.length && <DefaultQuestion question={minimental.questions[qNum]} qNum={qNum} scores={scores} />}
            {/* Pantalla previa */}
            {qNum === -1 && <><h1>{minimental.name}</h1><p>A continuación se presentará una serie de instrucciones y preguntas que deberán hacerse al paciente.</p></>}
            {/* Pantalla de envío de datos */}
            {qNum === minimental.questions.length && <><h1>{minimental.name}</h1><p>Presione Enviar para finalizar.</p></>}
            {/* Botones de navegación */}
            <button onClick={prevQ}>Atrás</button>
            <button onClick={printState}>(dev)Estado</button>
            {/* Botón de continuar disponible excepto en última pantalla */}
            {qNum < minimental.questions.length && <button onClick={nextQ}>Continuar</button>}
            {/* Botón de enviar datos disponible en última pantalla */}
            {qNum === minimental.questions.length && <button onClick={sendData}>Enviar</button>}
        </>
    )
}