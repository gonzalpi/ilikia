import React from "react";
import DefaultQuestion from "./DefaultQuestion";
import "./Minimental.css"
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
        <div className="exam-info">
            {/* Examen */}
            {
                qNum >= 0 &&
                qNum < minimental.questions.length &&
                <DefaultQuestion question={minimental.questions[qNum]} qNum={qNum} scores={scores} />
            }
            {/* Pantalla previa */}
            {
                qNum === -1 &&
                <>
                    <h1>{minimental.name}</h1>
                    <p>A continuación se presentará una serie de instrucciones y preguntas que deberán hacerse al paciente.</p>
                </>
            }
            {/* Pantalla de envío de datos */}
            {
                qNum === minimental.questions.length &&
                <>
                    <h1>{minimental.name}</h1>
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
                    qNum < minimental.questions.length &&
                    <button onClick={nextQ}>Continuar</button>
                }
                </div>
                {/* Botón de enviar datos disponible en última pantalla */}
                <div>
                {
                    qNum === minimental.questions.length &&
                    <button onClick={sendData}>Enviar</button>
                }
                </div>
            </div>
        </div>
    )
}

export {Evaluation};