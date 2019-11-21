import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


const Flashcard = ({ id, term, color, definition, testOption, handleScoreUpdate }) => {
    const [showTerm, setShowTerm] = useState(true)
    const [showDefinition, setShowDefinition] = useState(false)
    const [definitionAttempt, setDefinitionAttempt] = useState("")
    const [answerCorrect, setAnswerCorrect] = useState(false)
    const [answerWrong, setAnswerWrong] = useState(false)


    const handleTermClick = () => {
        if (testOption === 0) setShowTerm(!showTerm)
    }

    const handleDefinitionClick = () => {
        if (testOption === 0) setShowDefinition(!showDefinition)
    }

    const markSubmittedDefinition = (e) => {
        if ((e.key === "Enter" && e.ctrlKey) || (e.key === "Enter" && e.metaKey)) {
            if (definition.toLowerCase() === definitionAttempt.toLowerCase()) {
                setAnswerCorrect(true)
                setAnswerWrong(false)
                handleScoreUpdate({id, status: 'correct'})
            }
            else {
                setAnswerWrong(true)
                setAnswerCorrect(false)
                handleScoreUpdate({id, status: 'incorrect'})
            }
        }
    }

    return (
        <Card id={id}>
            <Card.Header
                style={{ backgroundColor: color }}
                onClick={() => handleTermClick()}>{showTerm ? term : ""}
                {answerCorrect ? <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{ color: "green" }} /> : ""}
                {answerWrong ? <FontAwesomeIcon icon={faTimesCircle} size="lg" style={{ color: "red" }}/> : ""}
            </Card.Header>
            {
                testOption
                    ?   <textarea
                            type="text"
                            value={definitionAttempt}
                            onChange={(e) => setDefinitionAttempt(e.target.value)}
                            onKeyDown={markSubmittedDefinition}
                            readOnly={answerCorrect}
                        />
                    :   <Card.Body onClick={() => handleDefinitionClick()}>
                            <Card.Text>{showDefinition ? definition : ""}</Card.Text>
                        </Card.Body>
            }
        </Card>
    )
}

export default Flashcard