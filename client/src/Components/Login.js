/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function LoginPage(props) {

    const [profil, setProfil] = useState({});
    const [user_ip, setUser_ip] = useState();
    const [user_loc, setUser_loc] = useState();
    const [Redirection, setRedirection] = useState();

    useEffect(() => {
        //Get geolocalisation from browser
        navigator.geolocation.getCurrentPosition(function (pos) {
            setUser_loc({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            });
        });
        //get IP from the user
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(json => {
                setUser_ip(json.ip);
            });
    }, []);

    useEffect(() => {
        setProfil({
            ...profil,
            user_ip: user_ip,
            user_loc: user_loc
        });
    }, [user_ip, user_loc])

    useEffect(() => {
        if (props.loggedIn === true) 
            document.location.href = 'http://localhost:3000/match';
    }, [props.setloggedIn, props.loggedIn])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (profil.username && profil.password) {
            axios({
                method: 'post',
                url: 'http://localhost:8000/login/connect/',
                data: profil
              }).then(async res => {
                    if (res.data === "Wrong password" || res.data === "Wrong username" || res.data === "Account not activated") {
                        alert(res.data);
                    } else {
                        localStorage.setItem('token', res.data);
                        props.setloggedIn(true)
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
            {Redirection}
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
                <Link
                    id='resetpwd'
                    className='RouterLog'
                    to='/resetpwd'
                >
                    Reset your password
                    </Link>
            </form>
        </div>
    )

    return content;

}

export { LoginPage }