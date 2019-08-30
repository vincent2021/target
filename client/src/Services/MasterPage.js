import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoginPage } from "../Components/Login";
import { RegisterPage } from "../Components/Register";
import '../Assets/App.css';

const AppRouter = (props) => {

    const login = {
        CurrentPath: '/Components/Login',
        path: '/Components/Register',
        text: <div>New in Target ? <br /> <span style={{ color: 'green' }}>Create an account</span> !</div>,
        content: LoginPage
    }

    const register = {
        CurrentPath: '/Components/Register',
        path: '/Components/Login',
        text: <div>Already have an < br /> account ? <span style={{ color: 'red' }}>Sign in</span> !</div>,
        content: RegisterPage
    }

    // Set la page par défaut sur login  (petite err à gérer si tu refresh sur '/register')
    const [page, setPage] = useState({ ...login, CurrentPath: window.location.pathname })

    // Set la page en fonction de l'event
    const handlePage = () => {
        page.path === login.path ? setPage({ ...register }) : setPage({ ...login });
    }

    const Content = (
        <Router>
            <div className='RouterBloc'>
                <Link
                    className='RouterLog'
                    onClick={handlePage}
                    to={page.path}
                >
                    {page.text}
                </Link>
            </div>
            <Route
                path={page.CurrentPath}
                component={page.content}
            />
        </Router>
    )

    return Content;
}

export default AppRouter;