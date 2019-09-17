import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { LoginPage } from "./Components/Login";
import { RegisterPage } from "./Components/Register";
import ProfilClient from "./Components/Profil_Client";
import ProfilUser from "./Components/Profil_User";
import ProfilMatch from "./Components/MatchPage/Match_Profil";

import './Assets/Styles/App.css';
import './Assets/Styles/Connection.css';
import './Assets/Styles/Profil_Match.css';
import './Assets/Styles/Profil_Client.css';

const App = () => {

    const loggedIn = false;

    return (
        <div>
            <div className='RouterBloc'>
                <Link
                    id='login'
                    className='RouterLog'
                    to='register'
                >
                    New in Target ? <br /> Create an account !
                    </Link>
                <Link
                    id='register'
                    className='Hide'
                    to='login'
                >
                    Already have an < br /> account ? Sign in !
                    </Link>
                <Link
                    id='match'
                    className='RouterMatch'
                    to='match'
                >
                    Target people !
                    </Link>
                <Link
                    id='profilClient'
                    className='RouterProfil'
                    to='profil'
                >
                    My Profil
                    </Link>
            </div>
            <Switch>
                <Route exact path="/" render={() => (
                    loggedIn ? (
                        <Redirect to="/match" />
                    ) : (
                            <LoginPage />
                        )
                )} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/profil' component={ProfilClient} />
                <Route exact path='/match' component={ProfilMatch} />
                <Route exact path="/user/:usernameId" component={ProfilUser} />
                <Route component={LoginPage} />
            </Switch>
        </div>
    )
}

export default App;