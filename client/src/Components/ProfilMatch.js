import React from 'react';
import axios from '../Services/Client';

const profil = { 
    username: "Herta_Swift74",
    firstname: "Herta",
    lastname: "Swift",
    user_pic: "https://s3.amazonaws.com/uifaces/faces/twitter/jydesign/128.jpg"
};

class ProfilMatch extends React.Component {
    state = {
        username: 'test',
        firstname: '',
        user_pic: '',
    };

    handleUser = async (event) => {
        event.preventDefault();
        await axios.post('/getUser').then((res) => {
            this.setState({username:res.data.username, firstname:res.data.firstname, user_pic:res.data.user_pic});
        });
    };

    render() {
        return (
            <div className="Bloc">
               <form onSubmit = {this.handleUser}>
                    {this.state.username}
                    <img src={this.state.user_pic}></img>
                    <p>Say Hello to {this.state.firstname}</p>
                    <input type="submit" value="New Profile"></input>
                </form>
            </div>
        )
    }
}

export { ProfilMatch };