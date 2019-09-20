import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';
import { getAge } from '../Services/Fct';

const ProfilUser = ({ match }) => {

    const [user, setUser] = useState('');
    const [Age, setAge] = useState('')
    const [image, setImage] = useState({ pictures: [] });

    if (user === '') {
        axios.post(`/user/profile?uid=${match.params.uid}`)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
                setAge(getAge(res.data.dob));
            })
            .catch(err => {
                console.log(err);
            })
    }

    const BlockUser = e => {
        console.log(e.target.value);
    }
    const ReportUser = e => {
        console.log(e.target.value);
    }
    const UnlikeUser = e => {
        console.log(e.target.value);
    }
    const LikeUser = e => {
        console.log(e.target.value);
    }
    const ActiveChat = e => {
        console.log(e.target.value);
    }
    const PostComment = e => {
        console.log(e.target.value);
    }

    return (
        <div className="BlocBase">

            <div className="BlocUser">
                <div className="HeaderProfil">
                    <p className="Titre">{user.username} / {Age}</p>
                    <input id="BlockThisUser" onClick={BlockUser} type="submit" value="Block This User" style={{ backgroundColor: '#f55' }}></input>
                    <input id="Report" onClick={ReportUser} type="submit" value="Report" style={{ backgroundColor: '#fb5' }}></input>
                </div>
                <div id="MatchBarre" className="MatchBarre"></div>
                <span>
                    <img alt="profil" src={user.user_pic} className="image"></img>
                </span>
                <div id="BlocImage" className="BlocImage"></div>
                <div className="BlocInformations">
                    <p className="BlocTexte">
                        Genre : Male / Female
                        Interest in : Female / Male
                        Both Bio : ...
                        Interest : #blabla
                        localistation: Moscou / Russia
                    </p >
                </div >
                <div className="UserButton">
                    <input id="Unlike" onClick={UnlikeUser} type="submit" value="Unlike" style={{ backgroundColor: '#fcf' }}></input>
                    <input id="Like" onClick={LikeUser} type="submit" value="Like" style={{ backgroundColor: '#ccf' }}></input>
                    <input id="Chat" onClick={ActiveChat} type="submit" value="Chat" style={{ backgroundColor: '#0b3b' }}></input>
                </div >
            </div >


            <div className="BlocUser">
                <div className="BlocChat"></div >
                <div className="BlocWrite">
                    <textarea></textarea >
                    <input className="send" onClick={PostComment} type="submit" value="Post" style={{ backgroundColor: '#0b3b' }}></input>
                </div>
            </div >

        </div >
    )
}

export default ProfilUser 