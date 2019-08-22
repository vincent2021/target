import React, { Component } from 'react';
import '../style/Connection.css';
// import ReactDOM from 'react-dom';
import axios from 'axios';

class RegisterPage extends Component {
    state = {
        user: {
            username: "",
            fistname: "",
            lastname: "",
            email: "",
            password: "",
            confPassword: ""
        },
        confirm: false
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confPassword: this.state.confPassword
        };
        axios.post('http://localhost:8000/newuser', { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
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
                    />
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input
                        type={this.state.type}
                        className="password__input"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="confPassword"
                        placeholder="Confirm Password"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input
                        className="Submit"
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div >
        )
    }
}

export { RegisterPage };


