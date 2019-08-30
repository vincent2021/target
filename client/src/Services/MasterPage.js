import '../Assets/App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginPage } from "../Components/Login";
import { RegisterPage } from "../Components/Register";

function AppRouter() {

    const [page, usePage] = useState('');

    useEffect(() => {
        if (window.location.pathname === '/Components/Register') {
            usePage(
                <div>
                    <Router>
                        <Link to='/Components/Login' className='RouterLog'>Alredy have an < br /> account ? <span style={{ color: 'red' }}>Sign in</span> !</Link>
                        <Route path='/Components/Register' component={RegisterPage} />
                    </Router>
                </div>
            )
        }
        else {
            usePage(
                <div>
                    <Router>
                        <Link to='/Components/Register' className='RouterLog'>New in Target ? <br /> <span style={{ color: 'green' }}>Create an account</span> !</Link>
                        <Route path='/Components/Login' component={LoginPage} />
                    </Router>
                </div>
            )
        }
    }

    return (page);
}

export default AppRouter;