import './style/App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
 
export function Index() {
    return <h2>Home</h2>;
}
  
export function About() {
    return <h2>About</h2>;
}
  
export function Users() {
    return <h2>Users</h2>;
}

export function Header(){
    return(
        <ul>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/Components/Login">Login</Link></li>
    <li><Link to="/Components/Register">Register</Link></li>
        </ul>
    )
}

export function AppRouter() {
    return (
    <Router>
        < Header/>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
    </Router>
    )
}
