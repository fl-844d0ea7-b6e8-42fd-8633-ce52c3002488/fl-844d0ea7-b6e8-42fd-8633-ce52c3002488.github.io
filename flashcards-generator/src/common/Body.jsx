import React from 'react'
import { Route } from "react-router-dom";

import Home from '../home/Home';
import FlashcardsViewer from '../viewFlashcards/FlashcardsViewer';
import FlashcardCreator from '../createFlashcards/FlashcardCreator';
import FlashcardTester from '../testFlashcards/FlashcardTester';

const Body = () => {
    return (
        <div>
            <Route path="/home/" component={Home}/>
            <Route path="/view/" component={FlashcardsViewer} />
            <Route path="/create/" component={FlashcardCreator} />
            <Route path="/test/" component={FlashcardTester} />
        </div>
    )
}

export default Body