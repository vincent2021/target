import React from 'react';
import '../style/Connection.css';
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
            <div className="Bloc">
                <form>
                    <h1>LOGIN</h1>
                    <input
                        type="text"
                        value={this.state.username}
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        value={this.state.password}
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                     <input
                        className="Submit"
                        type="submit"
                        value="Connection"
                    />
                </form>
            </div>
        )
    }
}


export default Login;