// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import axios from '../../Services/Axios';
import ImageContainers, { convertPic } from '../../Services/ImageUser';
import ModifyInfo from './Modify_Info';
import ProfilMatch from './Match';

const ProfilClient = () => {

    const [User, setUser] = useState({});
    let [ImagesUser, setImagesUser] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [Changes, setChanges] = useState(false);
    const [Info, setInfo] = useState({
        gender: '',
        target: '',
        text: '',
        interest: []
    });
    const [OpenInfo, setOpenInfo] = useState(false);
    const [Page, setPage] = useState('match');

    const getToken = async () => {
        axios.post('/user/myprofile').then(res => {
            setUser({ ...res.data });
            setImagesUser(res.data.user_pic);
            setIsLoading(false);
        })
            .catch(err => {
                console.log(err);
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
                axios({
                    method: 'post',
                    url: 'upload',
                    data: imgFormData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                })
                    .then(res => {
                        setImagesUser([...ImagesUser, res.data]);
                        setUser({ ...User, user_pic: ImagesUser });
                        setChanges(Changes === true ? false : true);
                    })
                    .catch(err => {
                        console.log('?' + err);
                    })
                console.log('Image imported...')
            }
            else
                console.log('Too much images...')
        }
    }

    const DeletePicture = e => {
        e.preventDefault();
        console.log('deleted')
        let MainPicture = document.getElementById('ImageUser');
        ImagesUser.find((img, index) => {
            if (img === MainPicture.src) {
                let images = { img: img}
                axios.post(`user/delpic`, images)
                    .then(res => { console.log('image deleted on db')})
                ImagesUser.splice(index, 1);
                setImagesUser(ImagesUser);
                setChanges(Changes === true ? false : true);
                if (ImagesUser.length > 0)
                    MainPicture.src = ImagesUser[0];
            }
        })
    }

    useEffect(() => {
        // console.log(ImagesUser);
    }, [Changes])

    const ModifyInformation = e => {
        e.preventDefault();
        setOpenInfo(true);
    }

    const ChangeProfils = e => {
        e.preventDefault();
        setPage(e.target.id);
    }

    useEffect(() => {
        // setInfo({...User})
    }, [User])

    useEffect(() => {
        console.log('UseEffect Profil User...');
        getToken();
    }, []);

    useEffect(() => {
        return (() => {
            console.log(Info);
            axios.post(`/user/modifyInfo`, Info)
                .then(res => {
                    console.log(res);
                })
        })
    }, [setInfo])

    let content = <p style={{ fontSize: '40px', position: 'fixed', bottom: '0px' }} >User is loading...</p>;

    if (!IsLoading && User.uid) {
        content =
            <div className="BlocBase">
                <div className="BlocUser">
                    <p className="Titre">{User.username}</p>
                    <ImageContainers User={User} Images={ImagesUser} setImages={setImagesUser} Changes={Changes} />
                    <div className="BlocImport">
                        <button id="DeletePicture" className="modify" onClick={DeletePicture} type="Submit" style={{ backgroundColor: '#f33' }}>Delete Pic</button>
                        <input id="ImportPicture" className="ImportPicture" onChange={ImportPicture} type="file" value=""></input>
                        <label className="modify" htmlFor="ImportPicture" style={{ backgroundColor: '#ff3f' }} >Import Picture</label>
                    </div>
                    <div className="BlocInformations">
                        <p className="BlocTexte">
                            Genre : {Info.gender} <br />
                            Interest in : {Info.target} <br />
                            Bio : {Info.text} <br />
                            Interest : {Info.interest.map(i => (i + ' '))} <br />
                            localistation: Moscou / Russia <br />
                        </p >
                    </div>
                    <div>
                        <ModifyInfo OpenInfo={OpenInfo} setOpenInfo={setOpenInfo} Info={Info} setInfo={setInfo} />
                        <input className="modify" onClick={ModifyInformation} type="submit" value="Modify Informations" style={{ backgroundColor: '#0b3b' }}></input>
                    </div>
                </div >
                <div className="BlocUser">
                    <div className="ChooseProfil">
                        <p className="Titre" onClick={ChangeProfils} id="match">MATCH</p>
                        <p className="Titre" >&nbsp;/&nbsp;</p>
                        <p className="Titre" onClick={ChangeProfils} id="looks">LOOKS</p>
                    </div>
                    <ProfilMatch MyUid={User.uid} Page={Page} />
                </div >
            </div >;
    }
    else if (!IsLoading && !User.uid) {
        content = <p style={{ fontSize: '40px', position: 'fixed', bottom: '0px' }}> Something is wrong...</p>;
    }
    return content;
}

export default ProfilClient