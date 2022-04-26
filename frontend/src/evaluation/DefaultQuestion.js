import React from "react"
import "./DefaultQuestion.css"

export default function DefaultQuestion({question, qNum, scores}) {
    const [state, setState] = React.useState(true)
    const reloadQuestion = () => {setState(!state);}
    return (
        <>
            <div className="question">
                <p className="instructions">{question.note && <><b>{question.note}</b><br /></>} {question.instructions}</p>
                <h1 className="question-text">{question.text}</h1>
            </div>
            <div className="score-buttons">
                {
                    question.scores.map(x => (
                    <div><button
                        className={x === scores[qNum] ? "score-button-selected" : "score-button"}
                        onClick={() => {
                            scores[qNum] = x
                            reloadQuestion()
                            // scores[qNum]=x; score=x; setScore(x);
                            console.log(scores)
                            console.log(scores[qNum])
                        }}
                        >
                            {x}
                    </button></div>
                    ))
                }
            </div>
        </>
    )
}