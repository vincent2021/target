// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';
import { getAge, resizeImage } from '../Services/Fct';
import ImageContainers, { convertPic } from '../Services/ImageUser';
import { verify } from '../Services/Token';

const ProfilClient = () => {

    const defaultImage = 'https://savoirs.rfi.fr/sites/all/themes/custom/rfi/images/public/default-profile.png';
    const [User, setUser] = useState({});
    const [ImagesUser, setImagesUser] = useState([defaultImage]);
    const [IsLoading, setIsLoading] = useState(false);
    const [Changes, setChanges] = useState(false);

    const getToken = async () => {
        axios.post('/user/myprofile')
        .then(function (response) {
            setUser({ ...response.data });
            // setImagesUser(response.data.user_pic.split(";"));
            setIsLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    };
       
    const ImportPicture = async e => {
        if (
            e.target.files[0].type === "image/jpeg" ||
            e.target.files[0].type === "image/png"
        ) {
            if (ImagesUser.length < 5) {
                const img = await convertPic(e.target.files[0]);
                let imgFormData = new FormData();
                imgFormData.append('image', img);
                console.log(imgFormData)
                axios({
                    method: 'post',
                    url: 'upload',
                    data: imgFormData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                })
                    .then(res => {
                        setImagesUser([...ImagesUser, res.data]);
                        setUser({ ...User, user_pic: ImagesUser });
                    })
                    .catch(err => {
                        console.log('?' + err);
                    })
                console.log('Image imported...')
                setChanges(Changes === true ? false : true);
            }
            else {
                console.log('Too much images...')
                // hide le input
            }
        }
    }

    const DeletePicture = e => {
        e.preventDefault();
        ImagesUser.find((img, index) => {
            if (img === document.getElementById('ImageUser').src) {
                ImagesUser.splice(index, 1);
                setImagesUser(ImagesUser);
                setChanges(Changes === true ? false : true);
            }
        })
    }

    const ModifyInformation = e => {
        console.log(e.target.value);
    }

    useEffect(() => {
        console.log('UseEffect Profil User...');
        getToken();
    }, []);

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
                    <ImageContainers User={User} Images={ImagesUser} Changes={Changes} />
                    <div className="BlocImport">
                        <button id="DeletePicture" className="modify" onClick={DeletePicture} type="Submit" style={{ backgroundColor: '#f33' }}>Delete Pic</button>
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