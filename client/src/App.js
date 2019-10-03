/* eslint no-unused-vars: 0 */
import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { LoginPage } from "./Components/Login";
import { RegisterPage } from "./Components/Register";
import ProfilClient from "./Components/ProfilUser/Profil_User";
import ProfilUser from "./Components/ProfilTarget/Profil_Target";
import ProfilMatch from "./Components/MatchPage/Match_Profil";
import { isLogged } from "./Services/Token";
import { isLogout } from "./Services/Fct";
import BigLogo from "./Assets/Svg/BigLogo";
import Notification from "./Services/Notification";
import { ResetPwd } from "./Components/ResetPwd";

import './Assets/Styles/App.css';
import './Assets/Styles/Connection.css';
import './Assets/Styles/Match_Page.css';
import './Assets/Styles/Profil_User.css';
import './Assets/Styles/Profil_Target.css';
import './Assets/Styles/Svg.css';
import './Assets/Styles/Notification.css';


const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        isLogged()
            .then(res => {
                setLoggedIn(res);
            })
    }, [])

    useEffect(() => {
        const logout = document.getElementById('LogoutButton');
        const match = document.getElementById('matcheux');
        const profil = document.getElementById('profilClient');
        logout.className = (loggedIn === true) ? "ShowButton" : "HideButton";
        match.className = (loggedIn === true) ? "RouterMatch" : "Hide";
        profil.className = (loggedIn === true) ? "RouterProfil" : "Hide";
    }, [loggedIn])

    return (
        <div>
            <Link to='/' id="BigLogo">
                <BigLogo />
            </Link>
            <div className='RouterBloc'>
                <Link
                    id='matcheux'
                    className='Hide'
                    to='/match'
                >
                    Target
                    </Link>
                <Link
                    id='profilClient'
                    className='Hide'
                    to='/profil'
                >
                    My Profil
                    </Link>
                <Notification loggedIn={loggedIn} />
                <button id="LogoutButton" onClick={isLogout} className="HideButton">Logout</button>
            </div>
            <Switch>
                <Route exact path="/" render={() => (
                    loggedIn === true ? (
                        <Redirect to="/profil" />
                    ) : (
                        <Redirect to="/login" />
                        )
                )} />
                <Route exact path='/login' render={() => <LoginPage setloggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/resetpwd' component={ResetPwd} />
                <Route exact path='/profil' component={ProfilClient} />
                <Route exact path='/match' component={ProfilMatch} />
                <Route exact path="/user/:uid" component={ProfilUser} />
                <Route render={() => <LoginPage setloggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
            </Switch>
        </div>
    )
}

export default App;