import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                username: "",
                fistname: "",
                name: "",
                email: "",
                password: "",
                confPassword: ""
            },
            confirm: false
        }
    }

    handleChange = (event) => {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.state.firstName}
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                />
                <br />
                <input
                    type="text"
                    value={this.state.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                />
            </form>
        )
    }

    export default Login;

