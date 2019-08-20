import './style/App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";

class AppRouter extends Component {
    // constructor() {
    // super();
    // const Router = [
    //     { path: '/Components/Login', name: < Login /> },
    //     { path: '/Components/Register', name: 'Register' }
    // ];
    // }

    Login = () => {
        return (<Login />);
    }

    Register = () => {
        return <Register />
    }

    render() {
        return (
            <div>
                <Router>
                    <Link to="/Components/Login">Alredy have an account ? Sign in !</Link>
                    <br />
                    <Link to="/Components/Register">New in Target ? Create an account !</Link>
                    <div>
                        <Route path="/Components/Login" component={this.Login} />
                        <Route path="/Components/Register" component={this.Register} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default AppRouter;