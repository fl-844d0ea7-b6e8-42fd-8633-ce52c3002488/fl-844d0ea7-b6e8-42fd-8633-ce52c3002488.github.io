import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'

const Flashcard = ({ id, term, color, definition, testOption }) => {
    const [showTerm, setShowTerm] = useState(true)
    const [showDefinition, setShowDefinition] = useState(false)

    const handleTermClick = () => {
        setShowTerm(!showTerm)
    }

    const handleDefinitionClick = () => {
        setShowDefinition(!showDefinition)
    }

    return (
        <Card id={id}>
            <Card.Header
                style={{ backgroundColor: color }}
                onClick={() => handleTermClick()}>{showTerm ? term : ""}
            </Card.Header>
            {
                testOption
                    ?   <textarea type="text" />
                    :   <Card.Body onClick={() => handleDefinitionClick()}>
                            <Card.Text>{showDefinition ? definition : ""}</Card.Text>
                        </Card.Body>
            }
        </Card>
    )
}

export default Flashcard