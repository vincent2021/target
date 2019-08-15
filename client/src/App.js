// npm install axios --save  >>> for http request

import './style/App.css';
import React,{Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {AppRouter} from "./MasterPage";

class App extends Component {
    constructor(){
        super();
        this.state = {
            value : 'yeah'
        }
    }

    render(){
        return(
            < AppRouter/>
        );
    }
}

export default App;
