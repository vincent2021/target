import './style/App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LowBrain } from "./Components/Login";

function Index() {
    return <p>INDEX</p>;
}

function Login() {
    return < LowBrain />;
}

function Users() {
    return <h2>Users</h2>;
}

export function AppRouter() {
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Components/Login">Login</Link>
                            </li>
                            <li>
                                <Link to="/users/">Users</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={Index} />
                    <Route path="/Component/Login" component={Login} />
                    <Route path="/users/" component={Users} />
                </div>
            </Router>
        </div>
    );
}

