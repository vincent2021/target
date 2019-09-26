import React, { useState } from 'react';
import axios from '../Services/Axios';
import auth from '../Services/Token';

function LoginPage(props) {

    const [profil, setProfil] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(profil);
        if (profil.username && profil.password) {
            axios.post(`/login/connect`, profil)
                .then(res => {
                    console.log(res);
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
            </form>
        </div>
    )

    return content;

}

export { LoginPage }