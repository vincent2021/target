import React from 'react';
import axios from '../Services/Axios';
import auth from '../Services/Token';

class LoginPage extends React.Component {

    state = {
        username: "",
        password: "",
        confirm: false
    }

    handleSubmit = e => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        if (username && password) {
            axios.post(`/login/connect`, { username, password })
                .then(res => {
                    console.log(res);
                    localStorage.setItem('token', res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="Bloc">
                <form onSubmit={this.handleSubmit}>
                    <h1>LOGIN</h1>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
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
    }
}

export { LoginPage };