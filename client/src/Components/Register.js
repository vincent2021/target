import React from 'react';
import zxcvbn from 'zxcvbn';
import '../style/Register.css';
// import ReactDOM from 'react-dom';

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            type: 'input',
            score: 'null',
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
        this.passwordStrength = this.passwordStrength.bind(this);
    }

    handleChange = (event) => {
        const { value } = event.target
        this.setState({ value })
    }

    passwordStrength(e) {
        if (e.target.value === '') {
            this.setState({
                score: 'null'
            })
        }
        else {
            var pw = zxcvbn(e.target.value);
            this.setState({
                score: pw.score
            });
        }

    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.state.username}
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                />
                <br />
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
                <br />
                <input
                    type="text"
                    value={this.state.email}
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                /><br />
                <input
                    type={this.state.type}
                    value={this.state.password}
                    className="password__input"
                    name="password"
                    placeholder="Password"
                    onChange={this.passwordStrength}
                />
                <br />
                <input
                    type="text"
                    value={this.state.confPassword}
                    name="confPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                />
                <br />
                <input
                    type="submit"
                    value="Send"
                />

            </form>
        )
    }
}

export default Register;


