// npm install axios --save  >>> for http request
// https://knowbody.github.io/react-router-docs/api/RouteComponents.html
// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/

import './style/App.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AppRouter } from "./MasterPage";

class App extends Component {
    constructor() {
        super();
        this.state = {
            value: 'yeah'
        }
    }

    render() {
        return (
            <div>
                <AppRouter/>
            </div>
        );

    }
}

export default App;
