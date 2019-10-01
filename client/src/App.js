import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { LoginPage } from "./Components/Login";
import { RegisterPage } from "./Components/Register";
import ProfilClient from "./Components/ProfilUser/Profil_User";
import ProfilUser from "./Components/ProfilTarget/Profil_Target";
import ProfilMatch from "./Components/MatchPage/Match_Profil";
import { isLogged } from "./Services/Token";
import BigLogo from "./Assets/Svg/BigLogo";
import Notification from "./Services/Notification";

import './Assets/Styles/App.css';
import './Assets/Styles/Connection.css';
import './Assets/Styles/Match_Page.css';
import './Assets/Styles/Profil_User.css';
import './Assets/Styles/Profil_Target.css';
import './Assets/Styles/Svg.css';
import './Assets/Styles/Notification.css';

const socket = io.connect('http://localhost:8000');
socket.on('info', function (data) {
    console.log(data);
});

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log('component mont')
        isLogged()
            .then(res => {
                setLoggedIn(res);
            })
    }, [])

    useEffect(() => {
        const logout = document.getElementById('LogoutButton');
        const match = document.getElementById('match');
        const profil = document.getElementById('profilClient');
        logout.className = (loggedIn === true) ? "ShowButton" : "HideButton";
        match.className = (loggedIn === true) ? "RouterMatch" : "Hide";
        profil.className = (loggedIn === true) ? "RouterProfil" : "Hide";
    }, [loggedIn])

    const isLogout = () => {
        localStorage.removeItem('token')
        setLoggedIn(false);
    }

    const changeState = () => {
        setLoggedIn(true);
        // changer ce truc horrible....
        window.location.href('http://localhost:3000/profil')
        window.location.reload();
    }

    return (
        <div>
            <Link to='/' id="BigLogo">
                <BigLogo />
            </Link>
            <div className='RouterBloc'>
                <Link
                    id='match'
                    className='RouterMatch'
                    to='/match'
                >
                    Target
                    </Link>
                <Link
                    id='profilClient'
                    className='RouterProfil'
                    to='/profil'
                >
                    My Profil
                    </Link>
                <Notification loggedIn={loggedIn} />
                <button id="LogoutButton" onClick={isLogout} >Logout</button>
            </div>
            <Switch>
                <Route exact path="/" render={() => (
                    loggedIn === true ? (
                        <Redirect to="/match" />
                    ) : (
                            <LoginPage loggedIn={changeState} />
                        )
                )} />
                <Route exact path='/login'
                    render={() => <LoginPage loggedIn={changeState} />} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/profil' component={ProfilClient} />
                <Route exact path='/match' component={ProfilMatch} />
                <Route exact path="/user/:uid" component={ProfilUser} />
                <Route
                    render={() => <LoginPage loggedIn={changeState} />} />
            </Switch>
        </div>
    )
}

export default App;