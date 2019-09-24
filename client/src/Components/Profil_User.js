// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';
import { getAge, resizeImage } from '../Services/Fct';
import ImageContainers, { convertPic } from '../Services/ImageUser';

const ProfilClient = () => {

    const defaultImage = 'https://savoirs.rfi.fr/sites/all/themes/custom/rfi/images/public/default-profile.png';
    const [User, setUser] = useState({});
    const [ImagesUser, setImagesUser] = useState([defaultImage]);
    const [IsLoading, setIsLoading] = useState(false);
    const Token = '';

    const getToken = () => {
        console.log("... Get Token ...")
        setIsLoading(true);
        axios.post(`/login/tokeninfo`)
            .then(res => {
                // if !res.user_pic -> default pic
                // else res.user_pic -> fetch pic inside 'ImagesUser'
                const newUser = {
                    uid: res.data.uid,
                    username: res.data.username,
                    user_pic: ImagesUser
                };
                setIsLoading(false);
                setUser(newUser);
            })
            .catch(err => {
                //back to the main page
                console.log(err);
            })
    }

    const ImportPicture = async e => {
        if (
            e.target.files[0].type === "image/jpeg" ||
            e.target.files[0].type === "image/png"
        ) {
            const img = await convertPic(e.target.files[0])
            if (ImagesUser.length < 4) {
                setImagesUser([...ImagesUser, img]);
                console.log('Image imported...')
            }
            else {
                console.log('Too much images...')
                // hide le input
            }
        }
    }

    const ModifyPicture = e => {
        console.log(e.target.value);
    }

    const ModifyInformation = e => {
        console.log(e.target.value);
    }

    useEffect(() => {
        console.log('UseEffect Profil User...');
        getToken();
    }, [Token]);

    let content = <p style={{ fontSize: '40px', position: 'fixed', bottom: '0px' }} >User is loading...</p>;

    if (!IsLoading && User.uid) {
        content =
            <div className="BlocBase">
                <div className="BlocUser">
                    <p className="Titre">LIKED / VISITS</p>
                    <div id="BlocVisits" className="BlocVisits"></div>
                </div >
                <div className="BlocUser">
                    <p className="Titre">{User.username}</p>
                    <ImageContainers User={User} Images={ImagesUser} setImages={setImagesUser} />
                    <div className="BlocImport">
                        <input className="modify" onClick={ModifyPicture} type="submit" value="Modify Pics" style={{ backgroundColor: '#f99' }}></input>
                        <input id="ImportPicture" className="ImportPicture" onChange={ImportPicture} type="file" value=""></input>
                        <label className="modify" htmlFor="ImportPicture" style={{ backgroundColor: '#ff3f' }} >Import Picture</label>
                    </div>
                    <div className="BlocInformations">
                        <p className="BlocTexte">
                            Genre : Male / Female
                            Interest in : Female / Male
                            Both Bio : ...
                            Interest : #blabla
                            localistation: Moscou / Russia
                       </p >
                    </div>
                    <div>
                        <input className="modify" onClick={ModifyInformation} type="submit" value="Modify Informations" style={{ backgroundColor: '#0b3b' }}></input>
                    </div>
                </div >
            </div >;
    }
    else if (!IsLoading && !User.uid) {
        content = <p style={{ fontSize: '40px', position: 'fixed', bottom: '0px' }}> Something is wrong...</p>;
    }

    return content;
}

export default ProfilClient