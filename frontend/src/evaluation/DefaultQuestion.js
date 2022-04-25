import React from "react"
import "./DefaultQuestion.css"

export default function DefaultQuestion({question, qNum, scores}) {
    return (
        <>
            <div className="question">
                <p className="instructions">{question.instructions}</p>
                <h1 className="question">{question.text}</h1>
            </div>
            <div id="buttons" className="score-buttons">
                {question.scores.map(x => <div><button key={`${x}`} onClick={() => scores[qNum]=x}>{x}</button></div>)}
            </div>
        </>
    )
}