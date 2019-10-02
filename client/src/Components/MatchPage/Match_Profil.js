import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from '../../Services/Axios';
import MatchSearch from './Match_Search';
import { resizeImage } from '../../Services/Fct';
import { decode } from '../../Services/Token';

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
    const [Uid, setUid] = useState(() => {
        try{
            return decode(localStorage.getItem('token').payload.uid);   
        }catch(err){
            return false;
        }
    })

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
        setFilter({
            ...filter,
            range: Score[1]
        })
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

    const settingMatch = (score) => {
        const color = (score >= 50) ? '#35D467' : '#ff5640';
        setBackground({
            number: score + '%',
            width: score + 2 + '%',
            backgroundColor: color,
            value: {
                left: score - 2 + '%'
            }
        });
    }

    // RENVOYER A L ACCUEIL SI PAS DE USER

    const handleUser = async () => {
        await axios.post('/match/filter', filter)
            .then((res, req) => {
                setUser(res.data);
                if (res.data[0])
                    settingMatch(res.data[0].score)
            });
    };

    const handleMatch = e => {
        e.preventDefault();
        if (e.target.value === "Yes") {
            let match = [Uid, user[number].uid];
            if (match[0] && match[1])
                axios.post(`/match/new?uid1=${match[0]}&uid2=${match[1]}`)
                    .then(res => {
                        console.log('match !');
                    })
        }
        else {
            let match = [Uid, user[number].uid];
            if (match[0] && match[1])
                axios.post(`/match/reject?uid=${match[1]}`)
                    .then(res => {
                        console.log('reject !');
                    })
        }
        if (!user[number + 1]){
            setNumber(0);
            settingMatch(user[0].score);
        } else {
            setNumber(number + 1);
            settingMatch(user[number + 1].score);
        }
    }

    useEffect(() => {
        handleUser();
    }, [filter])

    useEffect(() => {
        const Logo = document.getElementById('BigLogo');
        Logo.className = 'HideSvg';
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
                                <img onLoad={e => { resizeImage(e, 300) }} id="imageTarget" alt="" src={user[number].user_pic[0]} className="MatchProfil"></img>
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
        return(() => {
            setContent('');
        })
    }, [background, Age, Localisation, Score, Interest])

    return content;
}

export default ProfilMatch