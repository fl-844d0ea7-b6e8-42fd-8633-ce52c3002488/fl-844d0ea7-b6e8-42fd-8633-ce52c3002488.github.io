import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FlashcardsManager from './FlashcardsManager'
import TopicManager from './TopicManager'

const FlashcardTopicManager = () => {
    return (
        <Tabs>
            <Tab eventKey="manageFlashcards" title="Manage Flashcards">
                <FlashcardsManager />
            </Tab>
            <Tab eventKey="manageTopics" title="Manage Topics" disabled>
                <TopicManager />
            </Tab>
        </Tabs>
    )
}

export default FlashcardTopicManager