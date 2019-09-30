import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from '../Services/Axios';
import auth from '../Services/Token';

function LoginPage(props) {

    const [profil, setProfil] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        if (profil.username && profil.password) {
            axios.post(`/login/connect`, profil)
                .then(res => {
                    localStorage.setItem('token', res.data)
                    props.loggedIn();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setProfil({
            ...profil,
            [name]: value
        });
    }


    let content = (
        <div className="Bloc">
            <form onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    className="Submit"
                    type="submit"
                    value="Submit"
                />
                <Link
                    id='login'
                    className='RouterLog'
                    to='/register'
                >
                    Create an account !
                    </Link>
            </form>
        </div>
    )

    return content;

}

export { LoginPage }