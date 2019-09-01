import React from 'react';
import axios from '../Services/Client';

class ProfilMatch extends React.Component {
    
    newUser = axios.post(`/getUser`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    
    render() {
        return (
            <div className="Bloc">
               <form></form>
            </div>
        )
    }
}

export { ProfilMatch };