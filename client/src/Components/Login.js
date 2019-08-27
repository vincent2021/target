import React from 'react';
import '../Assets/Connection.css';
import axios from '../Services/Client';

class LoginPage extends React.Component {

    state = {
        user: {
            username: "",
            password: ""
        },
        confirm: false
    }

    handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        if (user) {
            axios.post(`/login`, { user })
                .then(res => {
                    console.log('yeah')
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