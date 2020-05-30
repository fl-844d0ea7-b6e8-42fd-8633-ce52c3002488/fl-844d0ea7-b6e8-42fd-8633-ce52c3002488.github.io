import React, { useState } from 'react'
import CreateFlashcardsForm from './CreateFlashcardsForm'
import CreateTopicsForm from './CreateTopicsForm'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const FlashcardCreator = () => {

    const [newTopicCreated, setNewTopicCreated] = useState(false)
    // THIS IS SO SMELLY

    const handleNewTopic = () => {
        console.log("We've detected a new topic to be created now")
        setNewTopicCreated(!newTopicCreated)
    }

    return (
        <Tabs>
            <Tab eventKey="createFlashcards" title="Create Flashcards">
                <CreateFlashcardsForm
                    newTopicCreated={newTopicCreated}
                />
            </Tab>
            <Tab eventKey="createTopic" title="Create Topics">
                <CreateTopicsForm
                    handleNewTopic={handleNewTopic}
                />
            </Tab>
        </Tabs>
    )
}

export default FlashcardCreator