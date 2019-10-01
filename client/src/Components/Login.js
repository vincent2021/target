import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from '../Services/Axios';
import { getPos } from '../Services/Geo';

function LoginPage(props) {

    const [profil, setProfil] = useState({})


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (pos) {
            const user_loc = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }
            setProfil({
                ...profil,
                user_loc
            });

        });
        console.log(profil);
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (profil.username && profil.password) {
            fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(json => {
                    const user_ip = json.ip;
                    setProfil({
                        ...profil,
                        user_ip
                    });
                });

            const location = getPos();
            console.log(location);

            axios.post(`/login/connect`, profil)
                .then(res => {
                    if (res.data === "Wrong Password" || res.data === "Wrong Username") {
                        alert(res.data);
                    } else {
                        localStorage.setItem('token', res.data);
                        props.loggedIn();
                    }
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