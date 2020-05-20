import React from 'react'
import Flashcard from './Flashcard'
import Badge from 'react-bootstrap/Badge'
import CardColumns from 'react-bootstrap/CardColumns'

const FlashcardsList = ({ cardsList, handleDelete }) => {

    return cardsList && (
        Object.entries(cardsList).map(([topic, cardArray]) => (
            <div key={topic+"-section"} data-cy="flashcardsList">
                <h4>
                    <Badge pill variant="light">{topic}</Badge>
                </h4>
                <CardColumns id={`${topic}-card-columns`}>
                    {
                        Object.entries(cardArray).map(([index, {id, term, definition, colour}]) => (
                            <Flashcard
                                key={id}
                                id={id}
                                term={term}
                                colour={colour}
                                definition={definition}
                                handleDelete={handleDelete}
                            />
                        ))
                    }
                </CardColumns>
            </div>
    )))
}

export default FlashcardsList
