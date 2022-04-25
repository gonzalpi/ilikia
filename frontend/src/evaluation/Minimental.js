import React from "react";
import DefaultQuestion from "./DefaultQuestion";
import "./Minimental.css"
const minimental = require("./minimental.json")
var scores = Array(minimental.questions.length).fill(0)

export default function Evaluation()
{
    const [show, setShow] = React.useState(false)

    const [qNum, setQNum] = React.useState(-1)
    const prevQ = () => {setQNum(qNum - 1); setShow(false);}
    const nextQ = () => {setQNum(qNum + 1); setShow(false);}

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
                (
                    show ?
                    minimental.questions[qNum].additional ?
                    <>
                        <p>En construcción.<br/>Por hacer: tomar datos adicionales para desplegar texto, imagenes y Unity</p>
                        <button onClick={() => setShow(!show)}>Ocultar</button>
                    </> :
                    <></> :
                    <>
                        <DefaultQuestion question={minimental.questions[qNum]} qNum={qNum} scores={scores} />
                        <div>
                            {minimental.questions[qNum].additional && <button onClick={() => setShow(!show)}>Mostrar</button>}
                        </div>
                    </>
                )
            }
            {/* Pantalla previa */}
            {
                qNum === -1 &&
                <>
                    <h1>{minimental.name}</h1>
                    <p className="instructions">A continuación se presentará una serie de instrucciones que deberá leer y posteriormente hacer la pregunta que está escrita en grande al paciente.</p>
                </>
            }
            {/* Pantalla de envío de datos */}
            {
                qNum === minimental.questions.length &&
                <>
                    <h1>{minimental.name}</h1>
                    <p className="instructions">Presione Enviar para finalizar.</p>
                </>
            }
            {/* Botones de navegación */}
            <div className="nav-buttons">
                <div>
                    {
                        qNum >= 0 &&
                        <button onClick={prevQ}>Atrás</button>
                    }
                </div>
                <div>
                    {/* Botón de desarrollo: imprime puntajes e índice a consola */}
                    {/* <button onClick={printState}>(dev)Estado</button> */}
                </div>
                {
                    qNum < minimental.questions.length &&
                    <div>
                        <button onClick={nextQ}>Continuar</button>
                    </div>
                }
                {/* Botón de enviar datos disponible en última pantalla */}
                {
                    qNum === minimental.questions.length &&
                    <div>
                        <button onClick={sendData}>Enviar</button>
                    </div>
                }
            </div>
        </div>
    )
}