import React from 'react'
import Flashcard from './Flashcard'
import Badge from 'react-bootstrap/Badge'
import CardColumns from 'react-bootstrap/CardColumns'

const FlashcardsList = ({ cardsList }) => {

    return (
        Object.entries(cardsList).map(([topic, cardArray]) => (
            <div key={topic+"-section"}>
                <h4>
                    <Badge pill variant="light">{topic}</Badge>
                </h4>
                <CardColumns id={`${topic}-card-columns`}>
                    {
                        Object.entries(cardArray).map(([index, {id, term, definition}]) => (
                            <Flashcard
                                key={id}
                                id={id}
                                term={term}
                                definition={definition}
                            />
                        ))
                    }
                </CardColumns>
            </div>
    )))
}

export default FlashcardsList
