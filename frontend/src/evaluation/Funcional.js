import React from "react";
import DefaultQuestion from "./DefaultQuestion";
import "./Minimental.css"
const funcional = require("./funcional.json")
var scores = Array(funcional.questions.length).fill(0)

export default function Evaluation()
{
    const [qNum, setQNum] = React.useState(-1)
    const prevQ = () => {setQNum(qNum - 1)}
    const nextQ = () => {setQNum(qNum + 1)}

    // Suma de puntajes por categoria
    const sumScores = () => {
        let perCategory = Array(funcional.categories.length).fill(0)
        for (let i = 0; i < funcional.questions.length; i++) {
            perCategory[funcional.questions[i].category] += scores[i]
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
        <div className="exam-info">
            {/* Examen */}
            {
                qNum >= 0 &&
                qNum < funcional.questions.length &&
                <DefaultQuestion question={funcional.questions[qNum]} qNum={qNum} scores={scores} />
            }
            {/* Pantalla previa */}
            {
                qNum === -1 &&
                <>
                    <h1>{funcional.name}</h1>
                    <p>A continuación se presentará una serie de instrucciones y preguntas que deberán hacerse al paciente.</p>
                </>
            }
            {/* Pantalla de envío de datos */}
            {
                qNum === funcional.questions.length &&
                <>
                    <h1>{funcional.name}</h1>
                    <p>Presione Enviar para finalizar.</p>
                </>
            }
            {/* Botones de navegación */}
            <div className="nav-buttons">
                <div>
                    <button onClick={prevQ}>Atrás</button>
                </div>
                <div>
                    {/* Botón de desarrollo: imprime puntajes e índice a consola */}
                    {/* <button onClick={printState}>(dev)Estado</button> */}
                </div>
                <div>
                {
                    qNum < funcional.questions.length &&
                    <button onClick={nextQ}>Continuar</button>
                }
                </div>
                {/* Botón de enviar datos disponible en última pantalla */}
                <div>
                {
                    qNum === funcional.questions.length &&
                    <button onClick={sendData}>Enviar</button>
                }
                </div>
            </div>
        </div>
    )
}