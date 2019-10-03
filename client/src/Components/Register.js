import React, { Component } from 'react';
import axios from '../Services/Axios';
import { Link } from "react-router-dom";

class RegisterPage extends Component {
    state = {
        user: {
            username: "",
            fistname: "",
            lastname: "",
            email: "",
            password: "",
            confPassword: "",
            error: {
                username: false,
                email: false,
                password: false,
            },
            errorMsg: {
                username: "",
                email: "",
                password: "",
            },
            confirm: false
        },
    }

    // Assigne la variable input au component.
    handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => { this.validateData(name, value) });
    }

    // Vérifie les données saisies et affiche un msg d'erreur.
    validateData = (name, value) => {
        const error = this.state.user.error;
        const msg = this.state.user.errorMsg;
        let invalid = false;

        switch (name) {
            case "email":
                error.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null && true;
                msg.email = !error.email ? "Email is invalid" : "";
                break;
            case "username":
                error.username = value.length >= 4;
                msg.username = !error.username ? "Username is invalid" : "";
                break;
            case "password":
                error.password = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/) !== null && true;
                msg.password = !error.password ? "Password is invalid" : "";
                break;
            default:
                break;
        }
        invalid = (!error.email || !error.username || !error.password)
            ? false : true;

        // Supprimer la déclaration pour activer les erreurs
        invalid = true;

        this.setState({
            error: error,
            errorMsg: msg,
            confirm: invalid
        });

    }

    // Envoie les données au serveur si state.confirm est valide.
    handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            confPassword: this.state.confPassword
        };
        if (user.confPassword !== user.password) {
            alert("confirmation password doesn't match");
        }
        else if (user) {
            axios.post(`/login/register`, { user })
                .then(res => {})
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <div className="Bloc">
                <form onSubmit={this.handleSubmit}>
                    <h1>CREATE USER</h1>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <div className={this.state.user.errorMsg.username === "" ? 'is-valid' : 'is-invalid'}>
                        {this.state.user.errorMsg.username}
                    </div>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <div className={this.state.user.errorMsg.email === "" ? 'is-valid' : 'is-invalid'}>
                        {this.state.user.errorMsg.email}
                    </div>
                    <input
                        type="password"
                        className="password__input"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <div className={this.state.user.errorMsg.password === "" ? 'is-valid' : 'is-invalid'}>
                        {this.state.user.errorMsg.password}
                    </div>
                    <input
                        type="password"
                        name="confPassword"
                        placeholder="Confirm Password"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        className={this.state.confirm === false ? 'Submit-invalid' : 'Submit'}
                        type="submit"
                        value="Submit"
                        // impossible de cliquer sans envoyer un formulaire valide
                        disabled={!this.state.confirm}
                    />
                    <Link
                        id='register'
                        className='RouterLog'
                        to='/login'
                    >
                        Sign in !
                    </Link>
                </form>
            </div >
        )
    }
}

export { RegisterPage };


