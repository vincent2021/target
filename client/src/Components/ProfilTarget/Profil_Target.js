/* eslint-disable */
import React, { useState, useEffect, createElement } from 'react';
import ChatBox from '../../Services/Chatbox';
import axios from '../../Services/Axios';
import { getAge, resizeImage } from '../../Services/Fct';

const ProfilUser = ({ match }) => {

    const [user, setUser] = useState('');
    const [Age, setAge] = useState('')
    const [chatison, setChatison] = useState(true);
    const [content, setContent] = useState('');
    const [ImageContainer, setImageContainer] = useState('')

    const SwapPic = e => {
        e.preventDefault();
        document.getElementById('ImageTarget').src = e.target.src;
    }

    useEffect(() => {
        axios.post(`/user/profile?uid=${match.params.uid}`)
            .then(res => {
                setUser(res.data);
                async function blabla() {
                    getAge(res.data.dob).then(res => setAge(res))
                }
                blabla();
            }
            )
            .catch(err => {
                document.location.href = 'http://localhost:3000/login';
                console.log(err);
            })
    }, [])

    const ReportUser = e => {
        e.preventDefault();
        axios.post(`/user/reportuser?uid=${user.uid}`)
            .then(res => {
                //Laisser ce console.log pour obtenir le mail envoye
                console.log(res.data);
            })
    }
    const UnlikeUser = e => {
        e.preventDefault();
        if (e.target.value === 'Unlike') {
            e.target.value = 'Like';
            e.target.style.backgroundColor = '#fcf';
            axios.post(`/match/unlike?uid=${user.uid}`)
                .then(res => {
                })
        }
        else{
            e.target.value = 'Unlike';
            e.target.style.backgroundColor = 'rgb(236, 49, 49)'
            axios.post(`/match/new?&uid2=${match.params.uid}`)
            .then(res => {
            })
        }
    }
    const ActiveChat = e => {
        e.preventDefault();
        chatison === true ? setChatison(false) : setChatison(true);
    }

    useEffect(() => {
        if (user.user_pic) {
            document.getElementById('ImageTarget').src = user.user_pic[0];
            setImageContainer(
                user.user_pic.map((imgs, index) => (
                    <span className='SmallPic' key={index}>
                        <img
                            src={imgs}
                            alt=""
                            onClick={SwapPic}
                            id={'minyou' + index}
                            onLoad={e => { resizeImage(e, 57) }}
                        />
                    </span>)
                )
            );
        }
    }, [user]);

    useEffect(() => {
        setContent(
            <div className="BlocBase">
                <div className="BlocUser">
                    <div className="HeaderProfil">
                        <p className="Titre">{user.username} / age {Age} / score {user.score}</p>
                        <input id="Report User" onClick={ReportUser} type="submit" value="Report" style={{ backgroundColor: '#fb5' }}></input>
                    </div>
                    <div id="MatchBarre" className="MatchBarre"></div>
                    <span className="spanTarget">
                        <img onLoad={e => { resizeImage(e, 300) }} id="ImageTarget" alt="profil" src='' className="imageTarget"></img>
                    </span>
                    <div className="BlocImage">
                        {ImageContainer}
                    </div>
                    <div className="BlocInformations">
                        <p className="BlocTexte">
                            Genre : {user.gender} <br />
                            Interest in : {user.target} <br />
                            Bio : {user.text} <br />
                            Interest : {user.interest} <br />
                            Localisation: {user.city} <br />
                        </p >
                    </div >
                    <div className="UserButton">
                        <input id="Unlike" onClick={UnlikeUser} type="submit" value="Like" style={{ backgroundColor: '#fcf' }}></input>
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

    }, [user.interest, user.text, user.target, user.gender, ImageContainer, Age, chatison])

    return content
}

export default ProfilUser 