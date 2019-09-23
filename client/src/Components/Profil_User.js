import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';
import { getAge, resizeImage } from '../Services/Fct';

const ProfilClient = () => {
    const defaultImage = 'https://savoirs.rfi.fr/sites/all/themes/custom/rfi/images/public/default-profile.png';

    const [user, setUser] = useState({
        username: "",
        fistname: "",
        lastname: "",
        email: "",
        password: "",
        age: "",
        user_pic: []
    });

    //default image
    const [images, setImage] = useState([defaultImage]);

    const [IsLoading, setIsLoading] = useState(false);

    if (user.username === '') {
        axios.post(`/login/tokeninfo`)
            .then(res => {
                setUser({
                    ...res.data,
                    age: getAge(res.data.dob),
                    user_pic: images
                })
            })
            .catch(err => {
                //back to the main page
                console.log(err);
            })
        console.log('if : ' + user.username)
    }

    const convertPic = (pic) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = () => res(reader.result);
            reader.onerror = error => rej(error);
        })
    }

    useEffect(() => {
        console.log('Update Image Effect...');
        const block = document.getElementById('BlocImage');
        setUser({ ...user, user_pic: images });
        images.map(img => {
            console.log(img.id);
            let newImage = document.createElement('img');
            newImage.src = img;
            newImage.onLoad = { resizeImage };
            block.appendChild(newImage)
        })
        const fd = new FormData();
        fd.append('image', images);
        axios.post(`/user/image`, fd)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        return (() => {
            // effacer l'image à remplacer
            while (block.firstChild) {
                block.removeChild(block.firstChild);
            }
        })
    }, [images]);

    const infos = () => {
        console.log(images);
        console.log(user);
    }

    const ImportPicture = async e => {
        if (
            e.target.files[0].type === "image/jpeg" ||
            e.target.files[0].type === "image/png"
        ) {
            const img = await convertPic(e.target.files[0])
            setImage([...images, img]);
        }
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
                    <img onLoad={resizeImage} id="ImageUser" alt="profil" src={user.user_pic[0]} className="image"></img>
                </span>
                <div id="BlocImage" className="BlocImage"></div>
                <div className="BlocImport">
                    <input className="modify" onClick={ModifyPicture} type="submit" value="Modify Pics" style={{ backgroundColor: '#f99' }}></input>
                    <input id="ImportPicture" className="ImportPicture" onChange={ImportPicture} type="file" value=""></input>
                    <button onClick={infos}>infos</button>
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