import React, {useState, Fragment} from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import ReactDOM from "react-dom"
import DefaultQuestion from "./DefaultQuestion";
import "./Minimental.css"
// const imagen = require('./Reloj-de-pulsera-Amazon.jpg')
// import imagen from './relojito.jpg';
const minimental = require("./minimental.json")
var scores = Array(minimental.questions.length).fill(-1)
var qNum = -1

export default function Minimental({personal, paciente, medico, tipo}) // tipo = 1 para minimental
{

    const unityContext = new UnityContext({
        loaderUrl: "webGL/pentagons/WebBuildPentagon.loader.js",
        dataUrl: "webGL/pentagons/WebBuildPentagon.data",
        frameworkUrl: "webGL/pentagons/WebBuildPentagon.framework.js",
        codeUrl: "webGL/pentagons/WebBuildPentagon.wasm",
    });
    
    const unityContext2 = new UnityContext({
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

    // Estado y hook de envío de datos
    const [sent, setSent] = useState(false);
    
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

    // Función que retorna puntaje total y por categoría
    const sumScores = () => {
        let perCategory = Array(minimental.categories.length).fill(0)
        let scoreSum = 0
        for (let i = 0; i < minimental.questions.length; i++)
        {
            perCategory[minimental.questions[i].category] += scores[i];
        }
        for (let i = 0; i < perCategory.length; i++)
        {
            scoreSum += perCategory[i];
        }
        return {"total": scoreSum, "categories": perCategory}
    }

    // DEV
    // - Imprime puntajes e índice de pregunta actual
    const printState = () => {console.log(scores); console.log("Question index: " + qNum);}
    // DEV
    // - Despliega puntajes que se deben mandar al backend al presionar Enviar
    const sendData = () => {
        setSent(true);
        let results = sumScores();
        let post = `/api/exam?personal=${personal}&paciente=${paciente}&medico=${medico}&tipo=${tipo}`
            + `&total=${results.total}`
            + `&c1=${results.categories[0]}`
            + `&c2=${results.categories[1]}`
            + `&c3=${results.categories[2]}`
            + `&c4=${results.categories[3]}`
            + `&c5=${results.categories[4]}`
            + `&c6=${results.categories[5]}`
            + `&c7=${results.categories[6]}`
            + `&c8=${results.categories[7]}`;
        fetch(post, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data =>
                {
                    console.log(data);
                });
    }

    // Botones de navegación
    function NavButtons() {
        return (
            <>
                {/* Botón de retroceso
                    - Disponible en todas las pantallas excepto la primera */}
                <div>
                    {qNum >= 0 &&
                    <button className="eval-nav-button" onClick={prevQ}>
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
                    <button className="eval-nav-button" onClick={nextQ}>
                        Continuar
                    </button>}
                </div>
                
                {/* Botón de envío de datos
                    - Disponible en la última pantalla
                    - Envía datos una vez */}
                <div>
                    {qNum === minimental.questions.length &&
                    <button className="eval-nav-button" onClick={() => {if (!sent) sendData();}}>
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
                {minimental.questions[qNum].additional === 1 ?
                    <h1 style={{fontSize: "10em", textAlign: "center"}}>CIERRE LOS OJOS </h1>
                : minimental.questions[qNum].additional === 2 ?
                    <Fragment>
                        <div className="unity-container">
                            <Unity unityContext={unityContext} style={{height: "80vh", width: "150vh", border: "0px solid black"}}/>
                            {/* The Unity app will be rendered here. */}
                        </div>
                    </Fragment>
                    // /frontend\hospitalClient\public\Reloj-de-pulsera-Amazon.jpg'
                : minimental.questions[qNum].additional === 3 ?
                    // <image src={require("https://www.consumoteca.com/wp-content/uploads/Reloj-de-pulsera-Amazon.jpg")} width="500" height="600"></image>
                    <iframe src="https://www.consumoteca.com/wp-content/uploads/Reloj-de-pulsera-Amazon.jpg" width={500} height={600}></iframe>
                    // <a href="https://www.consumoteca.com/wp-content/uploads/Reloj-de-pulsera-Amazon.jpg">IMAGEN</a>
                : minimental.questions[qNum].additional === 4 ?
                    <Fragment>
                    <div className="unity-container">
                        <Unity unityContext={unityContext2} style={{height: "80vh", width: "150vh", border: "0px solid black"}}/>
                        {/* The Unity app will be rendered here. */}
                    </div>
                </Fragment>
                : <></>
                }

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
