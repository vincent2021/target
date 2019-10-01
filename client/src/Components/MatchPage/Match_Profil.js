import React, { useState, useEffect } from 'react';
import { Link, Route } from "react-router-dom";
import axios from '../../Services/Axios';
import MatchSearch from './Match_Search';
import { getAge, resizeImage } from '../../Services/Fct';

const ProfilMatch = () => {

    const [user, setUser] = useState([]);
    const [background, setBackground] = useState({
        number: '',
        width: '',
        backgroundColor: 'white',
        value: {
            left: ''
        }
    });
    const [filter, setFilter] = useState({
        uid: '0x134',
        age_min: '20',
        age_max: '40',
        gender: 'female',
        range: '100'
    });
    const [content, setContent] = useState(<div>is loading</div>);
    const [number, setNumber] = useState(0);
    const [Age, setAge] = useState([20, 40]);
    const [Score, setScore] = useState([0, 100]);
    const [Localisation, setLocalisation] = useState([100]);
    const [Interest, setInterest] = useState([100]);

    const handleAge = e => {
        e.preventDefault();
        setFilter({
            ...filter,
            age_min: Age[0],
            age_max: Age[1]
        })
    };

    const handleScore = e => {
        e.preventDefault();
           // setFilter({
        //     ...filter,
        // })
    };

    const handleLocalisation = e => {
        e.preventDefault();
        setFilter({
            ...filter,
            range: Localisation[0]
        })
    };

    const handleInterest = e => {
        e.preventDefault();
        // setFilter({
        //     ...filter,
        // })
    };

    const settingMatch = () => {
        const random = Math.floor(Math.random() * 100);
        const color = (random > 50) ? '#35D467' : '#ff5640';
        setBackground({
            number: random + '%',
            width: random + 2 + '%',
            backgroundColor: color,
            value: {
                left: random - 2 + '%'
            }
        });
    }

    const handleUser = async () => {
        await axios.post('/match/filter', filter)
            .then((res, req) => { setUser(res.data); });
        settingMatch();
    };

    const handleMatch = e => {
        e.preventDefault();
        if (e.target.value === "Yes")
            console.log(';-D');
        else
            console.log(":'-(");
        !user[number + 1] ? setNumber(0) : setNumber(number + 1);;
    }

    useEffect(() => {
        handleUser();
    }, [filter])

    useEffect(() => {
        const Logo = document.getElementById('BigLogo');
        Logo.className = 'HideSvg';
        handleUser();
    }, []);

    useEffect(() => {
        if (user[0])
            setContent(
                <div>
                    {/* fond de couleur & numero */}
                    <div className="matchBack" style={background}></div>
                    <p className="matchNumber" style={background.value}>{background.number}</p>

                    {/* profil */}
                    <div className="CenterMatch">

                        <Link to={`/user/${user[number].uid}`}>
                            <span className="spanMatch">
                                <img onLoad={resizeImage} id="imageTarget" alt="" src={user[number].user_pic[0]} className="MatchProfil"></img>
                            </span>
                        </Link>

                        <p>{user[number].username}</p>

                        {/* Bouttons */}
                        <div className="MatchButton">
                            <input onClick={handleMatch} style={{ backgroundColor: '#ff5640' }} type="submit" value="No"></input>
                            <input onClick={handleMatch} style={{ backgroundColor: '#35D467' }} type="submit" value="Yes"></input>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const tab = document.getElementById("SliderMatch");
                            tab.className = (tab.className === 'sliderComponenthide') ? 'sliderComponent' : 'sliderComponenthide';
                        }}
                        value="Match Search"
                        className="MatchSearchButton"
                    ></button>
                    <MatchSearch
                        Age={Age}
                        Score={Score}
                        Localisation={Localisation}
                        Interest={Interest}
                        setAge={setAge}
                        setScore={setScore}
                        setLocalisation={setLocalisation}
                        setInterest={setInterest}
                        handleAge={handleAge}
                        handleLocalisation={handleLocalisation}
                        handleScore={handleScore}
                        handleInterest={handleInterest}
                    />
                    <div style={{ position: 'fixed', right: '5px', top: 0 }}>{user.length} targets find</div>
                </div>
            );
        else
            setContent(
                <div>
                <MatchSearch
                    Age={Age}
                    Score={Score}
                    Localisation={Localisation}
                    Interest={Interest}
                    setAge={setAge}
                    setScore={setScore}
                    setLocalisation={setLocalisation}
                    setInterest={setInterest}
                    handleAge={handleAge}
                    handleLocalisation={handleLocalisation}
                    handleScore={handleScore}
                    handleInterest={handleInterest}
                />
                <div style={{ position: 'fixed', right: '5px', top: 0 }}>{user.length} targets find</div>
            </div>
            );
    }, [user, background, number, Age, Localisation, Score, Interest])

    return content;
}

export default ProfilMatch