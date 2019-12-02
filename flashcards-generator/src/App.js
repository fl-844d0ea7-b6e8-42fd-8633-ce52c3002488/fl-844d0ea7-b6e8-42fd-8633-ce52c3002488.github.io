import { hot } from "react-hot-loader";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from './common/Header'
import Body from './common/Body'
import Footer from './common/Footer'

import "./App.css";

const ENV = process.env.NODE_ENV

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Body />
        <Footer />
      </Router>
    </div>
  );
}

if (ENV === 'production') {
  export default App;
}

export default hot(module)(App);
