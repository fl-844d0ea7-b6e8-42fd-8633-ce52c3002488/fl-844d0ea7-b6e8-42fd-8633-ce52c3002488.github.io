import React, { useState, useMemo } from 'react'
import Card from 'react-bootstrap/Card'

const Flashcard = ({ id, term, definition }) => {

    const [currentSide, setCurrentSide] = useState("front")

    const handleCardFlip = () => {
        const side = (currentSide === "front" ? "back" : "front")
        setCurrentSide(side)
    }

    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map((word) => word.replace(word[0], word[0].toUpperCase())).join(' ');
    }

    return (
        <Card
            id={id}
            onClick={handleCardFlip}
            className='flip-card'
        >
            <Card.Body className='flip-card-inner'>
                <Card.Text className={ 'flip-card-front' }>
                    {titleCase(term)}
                </Card.Text>
                <Card.Text className={ 'flip-card-back' }>
                    {titleCase(definition)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Flashcard
