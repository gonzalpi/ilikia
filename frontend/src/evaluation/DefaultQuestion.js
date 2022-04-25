import React from "react"

export default function DefaultQuestion({question, qNum, scores}) {
    return (
        <div>
            <p className="instructions">{question.instructions}</p>
            <h1 className="question">{question.text}</h1>
            <div id="buttons">
                {question.scores.map(x => <button key={`${x}`} onClick={() => scores[qNum]=x}>{x}</button>)}
            </div>
        </div>
    )
}