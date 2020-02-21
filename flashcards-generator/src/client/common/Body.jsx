import React from 'react'
import { Route } from "react-router-dom";

import Home from '../home/Home';
import FlashcardTopicManager from '../manageFlashcardsTopics/FlashcardTopicManager';
import FlashcardCreator from '../createFlashcards/FlashcardCreator';
import FlashcardTester from '../testFlashcards/FlashcardTester';
import FlashcardViewer from '../viewFlashcards/FlashcardViewer';

const Body = () => {
    return (
        <div>
            <Route path="/home/" component={Home}/>
            <Route path="/manage/" component={FlashcardTopicManager} />
            <Route path="/view/" component={FlashcardViewer} />
            <Route path="/create/" component={FlashcardCreator} />
            <Route path="/test/" component={FlashcardTester} />
        </div>
    )
}

export default Body