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
        console.log(e);
    }
    const ModifyInformation = e => {
        console.log(e);
    }

    return (
        <div className="BlocBase">

            <div className="BlocUser">
                <p className="Titre">LIKED / VISITS</p>
            </div >

            <div className="BlocUser">
                <p className="Titre">{user.username} / {Age}</p>
                <span>
                    <img alt="profil" src={user.user_pic} className="image"></img>
                </span>
                <div id="BlocImage" className="BlocImage"></div>
                <div className="BlocImport">
                    <input onClick={ModifyPicture} className="modify" type="submit" value="Modify Pics"></input>
                    <input onChange={ImportPicture} className="modify" type="file" value=""></input>
                </div>
                <div className="BlocInformations">
                    <p className="BlocTexte">blablabla</p>
                </div>
                <input onClick={ModifyInformation} className="modify" type="submit" value="Modify Informations"></input>
            </div >

        </div >
    )
}

export default ProfilUser 