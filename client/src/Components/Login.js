import React from 'react';
// import ReactDOM from 'react-dom';

class Login extends React.Component {

    state = {
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


    handleChange = (event) => {
        const { value } = event.target
        this.setState({ value })
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
                    type="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                />
                <br />
                <button>Connection</button>

            </form>
        )
    }
}

export default Login;

