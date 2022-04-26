import React from "react";
import DefaultQuestion from "./DefaultQuestion";
import "./Minimental.css"
const minimental = require("./minimental.json")
var scores = Array(minimental.questions.length).fill(-1)

export default function Minimental()
{
    const [show, setShow] = React.useState(false)
    const [qNum, setQNum] = React.useState(-1)
    const [score, setScore] = React.useState(scores[qNum])
    const prevQ = () => {setQNum(qNum - 1); setShow(false); setScore(scores[qNum]);}
    const nextQ = () => {setQNum(qNum + 1); setShow(false); setScore(scores[qNum]);}
    // const updateScore = () => {
    //     setScore(scores[qNum])
    //     console.log(scores)
    // }

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
                        <button
                            onClick={() => setShow(!show)}>
                                Ocultar
                        </button>
                    </> :
                    <></> :
                    <>
                        <DefaultQuestion
                            question={minimental.questions[qNum]}
                            qNum={qNum}
                            scores={scores}
                        />
                        <div>
                            {
                                minimental.questions[qNum].additional &&
                                <button
                                    onClick={() => setShow(!show)}>
                                        Mostrar
                                </button>
                            }
                        </div>
                    </>
                )
            }
            {/* Pantalla previa */}
            {
                qNum === -1 &&
                <>
                    <h1>{minimental.name}</h1>
                    <p className="instructions">
                        A continuación se presentará una serie de instrucciones que deberá leer y posteriormente hacer la pregunta que está escrita en grande al paciente.
                    </p>
                </>
            }
            {/* Pantalla de envío de datos */}
            {
                qNum === minimental.questions.length &&
                <>
                    <h1>{minimental.name}</h1>
                    <p className="instructions">
                        Presione Enviar para finalizar.
                    </p>
                </>
            }
            {/* Botones de navegación */}
            <div className="nav-buttons">
                {/* Botón de Atrás */}
                <div>
                    {
                        qNum >= 0 &&
                        <button onClick={prevQ}>
                            Atrás
                        </button>
                    }
                </div>
                {/* Botón de desarrollo: imprime puntajes e índice a consola */}
                <div>
                    {/* <button onClick={printState}>(dev)Estado</button> */}
                </div>
                {/* Botón de continuar a siguiente pregunta */}
                <div>
                    {
                        qNum < minimental.questions.length &&
                        <button onClick={nextQ}>
                            Continuar
                        </button>
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