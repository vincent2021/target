import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';


const ProfilUser = ({ match }) => {

    const [user, setUser] = useState('');

    if (user === '') {
        axios.post(`/user/profile?uid=${match.params.uid}`)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="BlocUser">
            {user.city}
            <br />
            {user.email}
        </div >
    )
}

export default ProfilUser 