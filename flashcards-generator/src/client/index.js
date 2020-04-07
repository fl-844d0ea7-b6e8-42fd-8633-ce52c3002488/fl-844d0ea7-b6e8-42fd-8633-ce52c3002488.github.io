import "./App.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Body from './common/Body'
import Header from './common/Header'
import Footer from './common/Footer'

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
    </Router>
, document.getElementById("root"));
