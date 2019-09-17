import React, { useState } from 'react';
import { Link, Route } from "react-router-dom";
import axios from '../../Services/Client.js';
import MatchSearch from './Match_Search';
import ProfilUser from '../Profil_User';


// deplacer à l'inscription (calcul de l'age)
const getAge = (date) => {
    const dn = new Date(date)
    const auj = new Date();
    let age_now = (auj.getFullYear() - dn.getFullYear());
    var m = auj.getMonth() - dn.getMonth();
    if (m < 0 || (m === 0 && auj.getDate() < dn.getDate()))
        age_now--;
    return age_now;
}

const ProfilMatch = ({ match }) => {
    const [Age, setAge] = useState([20, 37]);
    const [Score, setScore] = useState([0, 100]);
    const [Localisation, setLocalisation] = useState([100]);
    const [state, setState] = useState({
        id: '',
        username: '',
        firstname: '',
        lastname: '',
        user_pic: '',
    });
    const [user, setUser] = useState({
        number: '',
        width: '',
        backgroundColor: 'white',
        value: {
            left: ''
        }
    });

    const handleAge = (e, newValue) => {
        setAge(newValue);
    };
    const handleScore = (e, newValue) => {
        setScore(newValue);
    };
    const handleLocalisation = (e, newValue) => {
        setLocalisation(newValue);
    };

    const handleUser = async () => {
        await axios.post('/user/getUser').then((res, req) => {
            // faire une requete en fonction de l'age directement
            const ageUser = getAge(res.data.dob);
            setState({ ...res.data, age: ageUser });
        });
        // recuperer le match
        const random = Math.floor(Math.random() * 100);
        const color = (random > 50) ? '#35D467' : '#ff5640';
        setUser({
            number: random + '%',
            width: random + 2 + '%',
            backgroundColor: color,
            value: {
                left: random - 2 + '%'
            }
        });
    };

    const handleMatch = (e) => {
        e.preventDefault();
        if (e.target.value === "Yes")
            console.log(';-D');
        else
            console.log(":'-(");
        handleUser();
    }

    return (
        <div>
            {/* fond de couleur & numero */}
            <div className="matchBack" style={user}></div>
            <p className="matchNumber" style={user.value}>{user.number}</p>
            {/* profil */}

            <div className="CenterMatch">

                <Link to={`/user/${state.username}`}>
                    <img alt="" src={state.user_pic} className="MatchProfil"></img>
                </Link>

                <p>{state.username}</p>

                {/* Bouttons */}
                <div className="MatchButton">
                    <input onClick={handleMatch} style={{ backgroundColor: '#ff5640' }} type="submit" value="No"></input>
                    <input onClick={handleMatch} style={{ backgroundColor: '#35D467' }} type="submit" value="Yes"></input>
                </div>
            </div>
            <MatchSearch
                Age={Age}
                Score={Score}
                Localisation={Localisation}
                handleAge={handleAge}
                handleLocalisation={handleLocalisation}
                handleScore={handleScore} />
        </div>
    )

}

export default ProfilMatch