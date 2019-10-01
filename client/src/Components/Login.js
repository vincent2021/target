import React, { useState } from 'react';
import axios from '../Services/Axios';
import { getPos } from '../Services/Geo';

function LoginPage(props) {

    const [profil, setProfil] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        if (profil.username && profil.password) {
            axios.post(`/login/connect`, profil)
                .then(res => {
                    if (res.data === "Wrong Password" || res.data === "Wrong Username") {
                        alert(res.data);
                    } else {
                        localStorage.setItem('token', res.data)
                        getPos(res.data);
                        props.loggedIn();
                }})
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