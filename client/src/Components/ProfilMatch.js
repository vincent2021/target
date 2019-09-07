import React from 'react';
import axios from '../Services/Client';

class ProfilMatch extends React.Component {

    state = {
        username: '',
        firstname: '',
        user_pic: '',
        age: ''
    };

    newUser = axios.post('/user/getUser').then((res) => {
        this.setState({username:res.data.username, firstname:res.data.firstname, user_pic:res.data.user_pic, age:res.data.dob});
    });

    handleUser = async (event) => {
        event.preventDefault();
        await axios.post('/user/getUser').then((res) => {
        this.setState({username:res.data.username, firstname:res.data.firstname, user_pic:res.data.user_pic, age:res.data.dob});
        });
    };

    render() {
        return (
            <div className="Bloc">
               <form onSubmit = {this.handleUser}>
                    {this.state.username}
                    <img height="250px" alt="user-pic" src={this.state.user_pic}></img>
                    <p>Say Hello to {this.state.firstname}, {this.state.age}</p>
                    <input type="submit" value="Match"></input>
                    <input type="submit" value="New Profile"></input>
                </form>
            </div>
        )
    }
}

export { ProfilMatch };