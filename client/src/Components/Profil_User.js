import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';
import { getAge } from '../Services/Fct';

const ProfilClient = () => {

    const [user, setUser] = useState({
        username: "",
        fistname: "",
        lastname: "",
        email: "",
        password: "",
        age: "",
        user_pic: []
    });

    const [image, setImage] = useState({ pictures: [] });

    if (user.username === '') {
        axios.post(`/login/tokeninfo`)
            .then(res => {
                const DefaultPicture = 'https://savoirs.rfi.fr/sites/all/themes/custom/rfi/images/public/default-profile.png'
                setUser({
                    ...res.data,
                    age: getAge(res.data.dob),
                    user_pic: [DefaultPicture]
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        let bloc = document.getElementById('BlocImage');
        const img = document.createElement("img");
        console.log(image.pictures[0]);
        img.src = image.pictures[0];
        bloc.appendChild(img)
    }, [image])

    const ImportPicture = e => {
        const fd = new FormData();
        fd.append('image', e.target.files[0]);
        setImage({ pictures: e.target.files });
    }
    const ModifyPicture = e => {
        console.log(e.target.value);
    }
    const ModifyInformation = e => {
        console.log(e.target.value);
    }


    return (
        <div className="BlocBase">

            <div className="BlocUser">
                <p className="Titre">LIKED / VISITS</p>
                <div id="BlocVisits" className="BlocVisits"></div>
            </div >

            <div className="BlocUser">
                <p className="Titre">{user.username}</p>
                <span>
                    <img alt="profil" src={user.user_pic[0]} className="image"></img>
                </span>
                <div id="BlocImage" className="BlocImage"></div>
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

        </div >
    );
}

export default ProfilClient