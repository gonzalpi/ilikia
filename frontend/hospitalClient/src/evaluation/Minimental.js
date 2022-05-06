import React, {useState} from "react";
import ReactDOM from "react-dom"
import DefaultQuestion from "./DefaultQuestion";
import "./Minimental.css"
import { Pentagons } from './unity/pentagons'
const minimental = require("./minimental.json")
var scores = Array(minimental.questions.length).fill(-1)
var qNum = -1

export default function Minimental({personal, paciente, medico, tipo})
{

    const unityContext = new UnityContext({
        loaderUrl: "webGL/pentagons/WebBuildPentagon.loader.js",
        dataUrl: "webGL/pentagons/WebBuildPentagon.data",
        frameworkUrl: "webGL/pentagons/WebBuildPentagon.framework.js",
        codeUrl: "webGL/pentagons/WebBuildPentagon.wasm",
    });
    
    // Estado y hook de visibilidad de botón Continuar
    const [showNext, setShowNext] = useState(true)

    // Estado y hook de visibilidad de contenido adicional
    const [showAdditional, setShowAdditional] = useState(false)

    // Estado y hook de puntaje que SIEMPRE cambia
    // Se garantiza que se actualice la página
    // No se actualiza si:
    // - puntaje de pregunta actual == pregunta anterior al presionar Atrás
    // - puntaje de pregunta actual == pregunta siguiente al presionar Continuar
    const [update, setUpdate] = useState(false)
    
    // Funciones de navegación
    // - Actualizan índice de pregunta
    // - Ocultan contenido adicional para mostrar pregunta
    // - Corren hook de actualización
    // - Muestran y ocultan botón de continuar
    const prevQ = () => {
        qNum--
        setShowAdditional(false)
        setUpdate(!update)
        setShowNext(true)
    }
    const nextQ = () => {
        qNum++
        setShowAdditional(false)
        setUpdate(!update)
        // uso de `scores[qNum]` en lugar de `score` porque no se actualiza a tiempo
        setShowNext(scores[qNum] !== -1)
    }

    // Función de llamada para mostrar botón de continuar
    // Se pasa a componente DefaultQuestion
    const updateCallback = () => setShowNext(true)

    // Función que retorna la suma de puntajes por categoría
    const sumScores = () => {
        let perCategory = Array(minimental.categories.length).fill(0)
        for (let i = 0; i < minimental.questions.length; i++) {
            perCategory[minimental.questions[i].category] += scores[i]
        }
        return perCategory
    }

    // DEV
    // - Imprime puntajes e índice de pregunta actual
    const printState = () => {console.log(scores); console.log("Question index: " + qNum);}
    // DEV
    // - Despliega puntajes que se deben mandar al backend al presionar Enviar
    const sendData = () => {
        alert("Puntajes enviados: " + sumScores() + "\nPor hacer: conectar a back-end")
    }

    // Botones de navegación
    function NavButtons() {
        return (
            <>
                {/* Botón de retroceso
                    - Disponible en todas las pantallas excepto la primera */}
                <div>
                    {qNum >= 0 &&
                    <button className="nav-button" onClick={prevQ}>
                        Atrás
                    </button>}
                </div>

                {/* DEV
                    - Imprime puntajes e índice a consola */}
                <div>
                    {/* <button onClick={printState}>(dev)Estado</button> */}
                </div>

                {/* Botón de avance
                    - Disponible en todas las pantallas excepto la última
                    - No disponible en pantalla de pregunta cuando aún no se responde */}
                <div>
                    {qNum < minimental.questions.length &&
                    showNext &&
                    <button className="nav-button" onClick={nextQ}>
                        Continuar
                    </button>}
                </div>
                
                {/* Botón de envío de datos
                    - Disponible en la última pantalla */}
                <div>
                    {qNum === minimental.questions.length &&
                    <button className="nav-button" onClick={sendData}>
                        Enviar
                    </button>}
                </div>
            </>
        )
    }
    
    return (
        <div className="exam-info">
            {/* Pantalla previa
                - Se despliega cuando el índice es -1
                  (i. e. no corresponde a ninguna pregunta) */}
            {qNum === -1 &&
            <>
                <h1 className="exam-name">{minimental.name}</h1>
                <p className="instructions">
                    A continuación se presentará una serie de instrucciones que deberá leer y posteriormente hacer la pregunta que está escrita en grande al paciente.
                </p>
            </>}

            {/* Examen
                - Se despliega cuando el índice corresponde a una pregunta */}
            {qNum >= 0 &&
            qNum < minimental.questions.length &&

            // Condicionales para desplegar distintas pantallas de examen
            (showAdditional ?
            minimental.questions[qNum].additional ?
            // ¿Desplegar cont. adicional?: VERDADERO
            // ¿Pregunta tiene cont. adicional?: VERDADERO
            <>
                minimental.questions[qNum].additional === 1 ?(
                    <h4>CIERRE LOS OJOS </h4>
                ) :
                minimental.questions[qNum].additional === 2 ?(
                    <Fragment>
                        <div className="unity-container">
                            <Unity unityContext={unityContext} style={{height: "80vh", width: "150vh", border: "0px solid black"}}/>
                            {/* The Unity app will be rendered here. */}
                        </div>
                    </Fragment>
                )

                <button onClick={() => setShowAdditional(!showAdditional)}>
                    Ocultar
                </button>
            </> :

            // ¿Desplegar cont. adicional?: VERDADERO
            // ¿Pregunta tiene cont. adicional?: FALSO
            // NOTA: No se despliega nada porque nunca se llega a este estado
            <></> :

            // ¿Desplegar cont. adicional?: FALSO
            // ¿Pregunta tiene cont. adicional?: IRRELEVANTE
            <>
                <DefaultQuestion
                    question={minimental.questions[qNum]}
                    qNum={qNum}
                    scores={scores}
                    updateCallback={updateCallback}
                />

                {/* Botón de despliegue de contenido adicional
                    - Disponible en preguntas con contenido adicional */}
                <div>
                    {minimental.questions[qNum].additional &&
                    <button onClick={() => setShowAdditional(!showAdditional)}>
                        Mostrar
                    </button>}
                </div>
            </>)}

            {/* Pantalla de envío de datos
                - Se despliega cuando el índice es la cantidad de preguntas
                  (i. e. no corresponde a ninguna pregunta) */}
            {qNum === minimental.questions.length &&
            <>
                <h1>{minimental.name}</h1>
                <p className="instructions">
                    Presione Enviar para finalizar.
                </p>
            </>}

            {/* Botones de navegación */}
            <div id="nav-buttons" className="nav-buttons">
                <NavButtons />
            </div>
        </div>
    )
}
