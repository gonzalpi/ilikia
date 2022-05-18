import React, {useState, Fragment} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import DefaultQuestion from "./DefaultQuestion";
import Unity, {UnityContext} from "react-unity-webgl";
import "./Minimental.css"
const minimental = require("./minimental.json")
var scores = Array(minimental.questions.length).fill(-1)
var qNum = -1

export default function Minimental({personal, paciente, medico, tipo}) // tipo: 1 para minimental
{
    // Use URL parameters
    var { personal, paciente, medico, tipo } = useParams();

    // Navigate to return to login screen upon completion
    let navigate = useNavigate();

    // Unity contexts to render in questions (ideally contained in minimental.json)
    const unityContext = new UnityContext({
        loaderUrl: "/../../../../webGL/pentagons/WebBuildPentagon.loader.js",
        dataUrl: "/../../../../webGL/pentagons/WebBuildPentagon.data",
        frameworkUrl: "/../../../../webGL/pentagons/WebBuildPentagon.framework.js",
        codeUrl: "/../../../../webGL/pentagons/WebBuildPentagon.wasm",
    });
    const unityContext2 = new UnityContext({
        loaderUrl: "/../../../../webGL/pencil/WebBuild.loader.js",
        dataUrl: "/../../../../webGL/pencil/WebBuild.data",
        frameworkUrl: "/../../../../webGL/pencil/WebBuild.framework.js",
        codeUrl: "/../../../../webGL/pencil/WebBuild.wasm",
    });

    // Continuar button visibility state and hook
    const [showNext, setShowNext] = useState(true)

    // Additional content visibility state and hook
    const [showAdditional, setShowAdditional] = useState(false)

    // Flip-flop state and hook to ensure score is always updated
    // It does not update when:
    // - current q. score == prev. q. score when tapping Atrás
    // - current q. score == next q. score when tapping Continuar
    const [update, setUpdate] = useState(false)

    // Data send status state and hook
    const [sent, setSent] = useState(false);
    
    // Navigation functions
    // - Update page/question index
    // - Hide additional content to show question
    // - Run update hook
    // - Show and hide Continuar button
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

    // Callback function to display Continuar button
    // Passed down as prop to DefaultQuestion component
    const updateCallback = () => setShowNext(true)

    // Compute total and per category score
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
    // - Print scores and current q. idx.
    const printState = () => {console.log(scores); console.log("Question index: " + qNum);}

    // Send scores and return to login screen
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
        navigate("/");
    }

    // Navigation buttons
    function NavButtons() {
        return (
            <>
                {/* Atrás: previous screen
                    - Available in all but first screen */}
                <div>
                    {qNum >= 0 &&
                    <button className="eval-nav-button" onClick={prevQ}>
                        Atrás
                    </button>}
                </div>

                {/* DEV
                    - Print scores and current q. idx. */}
                <div>
                    {/* <button onClick={printState}>(dev)Estado</button> */}
                </div>

                {/* Continuar: next screen
                    - Available in all but last screen
                    - Unavailable if question has not yet been answered */}
                <div>
                    {qNum < minimental.questions.length &&
                    showNext &&
                    <button className="eval-nav-button" onClick={nextQ}>
                        Continuar
                    </button>}
                </div>
                
                {/* Enviar: send data
                    - Available in last screen
                    - Send data once */}
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
            {/* Pre-exam screen
                - Displayed when q. idx. is -1 */}
            {qNum === -1 &&
            <>
                <h1 className="exam-name">{minimental.name}</h1>
                <p className="instructions">
                    A continuación se presentará una serie de instrucciones que deberá leer y posteriormente hacer la pregunta que está escrita en grande al paciente.
                </p>
            </>}

            {/* Exam
                - Displayed when q. idx. corresponds to a question */}
            {qNum >= 0 &&
            qNum < minimental.questions.length &&

            // Conditionals to display exam screens
            (showAdditional ?
            minimental.questions[qNum].additional ?
            // Display additional content?: TRUE
            // Question has add. content?: TRUE
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
                {/* Ocultar: hide additional content
                    - Available in questions with additional content */}
                <button className="eval-nav-button" onClick={() => setShowAdditional(!showAdditional)}>
                    Ocultar
                </button>
            </> :

            // Display additional content?: TRUE
            // Question has add. content?: FALSE
            // NOTE: Nothing is displayed because state is never reached
            <></> :

            // Display additional content?: FALSE
            // Question has add. content?: IRRELEVANT
            <>
                <DefaultQuestion
                    question={minimental.questions[qNum]}
                    qNum={qNum}
                    scores={scores}
                    updateCallback={updateCallback}
                />

                {/* Mostrar: show additional content
                    - Available in questions with additional content */}
                <div>
                    {minimental.questions[qNum].additional &&
                    <button className="eval-nav-button" onClick={() => setShowAdditional(!showAdditional)}>
                        Mostrar
                    </button>}
                </div>
            </>)}

            {/* Data send screen
                - Displayed when q. idx. is equal to no. of questions
                  (i.e. it does not correspond to any question) */}
            {qNum === minimental.questions.length &&
            <>
                <h1>{minimental.name}</h1>
                <p className="instructions">
                    Presione Enviar para finalizar.
                </p>
            </>}

            {/* Navigation buttons */}
            <div id="nav-buttons" className="nav-buttons">
                <NavButtons />
            </div>
        </div>
    )
}
