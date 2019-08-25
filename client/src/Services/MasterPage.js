import '../Assets/App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginPage } from "../Components/Login";
import { RegisterPage } from "../Components/Register";

function AppRouter() {
    return (
        <div>
            <Router>
                <div className="RouterBloc">
                    <Link to="/Components/Login" className="RouterLog">
                        Alredy have an <br />account ?
                        <span style={{ color: 'red' }}>Sign in</span> !</Link>
                    <br />
                    <Link to="/Components/Register" className="RouterLog">
                        New in Target ? <br />
                        <span style={{ color: 'green' }}>Create an account</span> !</Link>
                </div>
                <div>
                    <Route path="/Components/Login" component={LoginPage} />
                    <Route path="/Components/Register" component={RegisterPage} />
                </div>
            </Router >
        </div>
    )
}


export default AppRouter;