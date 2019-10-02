import React, { useState, useEffect, createElement } from 'react';
import ChatBox from '../../Services/Chatbox';
import axios from '../../Services/Axios';
import { getAge, resizeImage } from '../../Services/Fct';

const ProfilUser = ({ match }) => {

    const [user, setUser] = useState('');
    const [Age, setAge] = useState('')
    const [image, setImage] = useState({ pictures: [] });
    const [chatison, setChatison] = useState(true);
    const [Info, setInfo] = useState({
        genre: '',
        target: '',
        text: '',
        interest: []
    });
    const [content, setContent] = useState('');

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
    const ActiveChat = e => {
        chatison === true ? setChatison(false) : setChatison(true);
        console.log(chatison);
    }

    useEffect(() => {
        setContent(
            <div className="BlocBase">
            <div className="BlocUser">
                <div className="HeaderProfil">
                    <p className="Titre">{user.username} / {Age}</p>
                    <input id="BlockThisUser" onClick={BlockUser} type="submit" value="Block This User" style={{ backgroundColor: '#f55' }}></input>
                    <input id="Report" onClick={ReportUser} type="submit" value="Report" style={{ backgroundColor: '#fb5' }}></input>
                </div>
                <div id="MatchBarre" className="MatchBarre"></div>
                <span className="spanTarget">
                    <img onLoad={e => { resizeImage(e, 300) }} id="ImageTarget" alt="profil" src={user.user_pic} className="imageTarget"></img>
                </span>
                <div id="BlocImage" className="BlocImage"></div>
                <div className="BlocInformations">
                    <p className="BlocTexte">
                        Genre : {user.gender} <br />
                        Interest in : {user.target} <br />
                        Bio : {user.text} <br />
                        Interest : {user.interest} <br />
                        localistation: Moscou / Russia <br />
                    </p >
                </div >
                <div className="UserButton">
                    <input id="Unlike" onClick={UnlikeUser} type="submit" value="Unlike" style={{ backgroundColor: '#fcf' }}></input>
                    <input id="Chat" onClick={ActiveChat} type="submit" value="Chat" style={{ backgroundColor: '#0b3b' }}></input>
                </div >
            </div >

            <div className="BlocUser">
                <div className="BlocChat" id="BlocChat">
                    <ChatBox chatison={chatison} setChatison={setChatison} />
                </div >
            </div>
        </div >
        )

    }, [user.interest, user.text, user.target, user.gender])

    return content
}

export default ProfilUser 