// eslint-disable-next-line
import React, { useState, useEffect, createElement } from 'react';
import axios from '../Services/Axios';
import { getAge, resizeImage } from '../Services/Fct';

const ProfilUser = ({ match }) => {

    const [user, setUser] = useState('');
    const [Age, setAge] = useState('')
    const [image, setImage] = useState({ pictures: [] });

    useEffect(() => {
        axios.post(`/user/profile?uid=${match.params.uid}`)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
                setAge(getAge(res.data.dob));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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
        let text = document.getElementById('Chat').value;
        console.log(text)
        var newDiv = document.createElement("div");
        // let post = document.createElement('P').innerHTML = 'blabla';
        var newContent = document.createTextNode(text);
        newDiv.appendChild(newContent);
        document.getElementById('BlocChat').appendChild(newDiv);

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
                <span className="spanTarget">
                    <img onLoad={resizeImage} id="ImageTarget" alt="profil" src={user.user_pic} className="imageTarget"></img>
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
                <div className="BlocChat" id="BlocChat"></div >
                <div className="BlocWrite">
                    <input type='text' id='Chat' ></input>
                    {/* <textarea id='Chat'></textarea > */}
                    <input className="send" onClick={PostComment} type="submit" value="Post" style={{ backgroundColor: '#0b3b' }}></input>
                </div>
            </div >

        </div >
    )
}

export default ProfilUser 