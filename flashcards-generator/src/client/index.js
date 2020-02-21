import "./App.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Body from './common/Body'
import Header from './common/Header'
import Footer from './common/Footer'
import Home from './home/Home';

import FlashcardTopicManager from './manageFlashcardsTopics/FlashcardTopicManager';
import FlashcardCreator from './createFlashcards/FlashcardCreator';
import FlashcardTester from './testFlashcards/FlashcardTester';
import FlashcardViewer from './viewFlashcards/FlashcardViewer';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

ReactDOM.render(
    <Router>
        <Route path={'/'} component={App} />
        {/* <div>
            <Route path="/home/" component={Home}/>
            <Route path="/manage/" component={FlashcardTopicManager} />
            <Route path="/view/" component={FlashcardViewer} />
            <Route path="/create/" component={FlashcardCreator} />
            <Route path="/test/" component={FlashcardTester} />
        </div> */}
    </Router>
, document.getElementById("root"));
