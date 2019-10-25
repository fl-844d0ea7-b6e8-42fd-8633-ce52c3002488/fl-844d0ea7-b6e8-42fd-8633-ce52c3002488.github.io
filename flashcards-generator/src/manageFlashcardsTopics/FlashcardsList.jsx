import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Flashcard from './Flashcard'
import TopicCard from './TopicCard'

const FlashcardsList = ({ cardsList, handleDelete }) => {

    return (
        Object.entries(cardsList).map(([topic, cardArray]) => (
            <div key={topic+"-section"}>
                <h4>{topic}</h4>
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
