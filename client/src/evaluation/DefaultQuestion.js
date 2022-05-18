import React, { useState } from "react"
import "./DefaultQuestion.css"

export default function DefaultQuestion({question, qNum, scores, updateCallback}) {
    // Current question score state and hook
    const [score, setScore] = useState(scores[qNum])
    // Update score and refresh parent component with callback function
    const updateScore = (x) => {
        setScore(x)
        scores[qNum] = x
        updateCallback()
    }
    // Score button
    function ScoreButton(x) {
        return (
        <button
            className={x === scores[qNum] ? "score-button-selected" : "score-button"}
            onClick={() => updateScore(x)}
        >
            {x}
        </button>
        )
    }
    
    return (
        <>
            <div className="question">
                <p className="instructions">
                    {
                        question.note &&
                        <><b>{question.note}</b><br /></>
                    } {
                        question.instructions
                    }
                </p>
                <h1 className="question-text">
                    {question.text}
                </h1>
            </div>
            <div id="score-buttons" className="score-buttons">
                {
                    question.scores.map(x => (<div>{ScoreButton(x)}</div>))
                }
            </div>
        </>
    )
}