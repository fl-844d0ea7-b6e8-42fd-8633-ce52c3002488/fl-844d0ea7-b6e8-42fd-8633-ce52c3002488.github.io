import "./App.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Body from './common/containers/Body'
import Header from './common/Header'
import Footer from './common/Footer'

import configureStore from './configureStore'

const App = () => {
    return (
        <div className="App">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path={'/'} component={App} />
        </Router>
    </Provider>
, document.getElementById("root"));
