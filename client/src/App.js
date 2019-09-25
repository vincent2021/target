import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { LoginPage } from "./Components/Login";
import { RegisterPage } from "./Components/Register";
import ProfilClient from "./Components/Profil_User";
import ProfilUser from "./Components/Profil_Target";
import ProfilMatch from "./Components/MatchPage/Match_Profil";
import { isLogged } from "./Services/Token";
import BigLogo from "./Assets/Svg/BigLogo";

import './Assets/Styles/App.css';
import './Assets/Styles/Connection.css';
import './Assets/Styles/Match_Page.css';
import './Assets/Styles/Profil_User.css';
import './Assets/Styles/Profil_Target.css';
import './Assets/Styles/Svg.css';

const socket = io.connect('http://localhost:8000');
socket.on('info', function (data) {
    console.log(data);
});

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    // regarde au démarrage seulement si le token existe 
    // et redefinit la variable loggedIn si besoin
    useEffect(() => {
        console.log('component mont')
        isLogged()
            .then(res => {
                setLoggedIn(res);
            })
    }, [])

    // regarde si la variable loggedIn change et modifie le bouton logout en fonction
    useEffect(() => {
        const e = document.getElementById("LogoutButton");
        e.className = (loggedIn === true) ? "ShowButton" : "HideButton";
    }, [loggedIn])


    // redefinit la variable loggedIn après un clic
    // et kill le token
    const isLogout = () => {
        localStorage.removeItem('token')
        setLoggedIn(false);
    }


    return (
        <div>
            <Link to='/' >
                <BigLogo />
            </Link>
            {/* logout */}
            <button id="LogoutButton" onClick={isLogout} >Logout</button>
            <div className='RouterBloc'>
                <Link
                    id='login'
                    className='RouterLog'
                    to='/register'
                >
                    New in Target ? <br /> Create an account !
                    </Link>
                <Link
                    id='register'
                    className='Hide'
                    to='/login'
                >
                    Already have an < br /> account ? Sign in !
                    </Link>
                <Link
                    id='match'
                    className='RouterMatch'
                    to='/match'
                >
                    Target people !
                    </Link>
                <Link
                    id='profilClient'
                    className='RouterProfil'
                    to='/profil'
                >
                    My Profil
                    </Link>
            </div>
            <Switch>
                {/* <Route exact path="/" render={() => (
                    loggedIn === true ? (
                        <Redirect to="/match" />
                    ) : (
                            <LoginPage />
                        )
                )} /> */}
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/profil' component={ProfilClient} />
                <Route exact path='/match' component={ProfilMatch} />
                <Route exact path="/user/:uid" component={ProfilUser} />
                <Route component={LoginPage} />
            </Switch>
        </div>
    )
}

export default App;