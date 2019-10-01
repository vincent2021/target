import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from '../../Services/Axios';
import { resizeImage } from '../../Services/Fct';

const ProfilMatch = (props) => {

    const [content, setContent] = useState(<div>{props.MyUid}</div>)
    const [MatchImg, setMatchImg] = useState([]);
    const [MatchLink, setMatchLink] = useState([]);


    async function Mapping(usr) {
        return new Promise((res, rej) => {
            let data = { img: [], lien: [] };
            usr.map(user => {
                data.img.push(user.user_pic[0]);
                data.lien.push(user.uid);
            })
            if (data.img.length > 0)
                res(data);
        })
    }

    useEffect(() => {
        let img = [];
        async function match() {
            axios.post(`/match/fullmatch?uid=${props.MyUid}`)
                .then(async res => {
                    if (res.data.length > 0) {
                        const data = await Mapping(res.data);
                        setMatchImg(data.img);
                        setMatchLink(data.lien);
                    }
                })
        }
        match();
    }, [])

    useEffect(() => {
        if (MatchImg.length > 0 && MatchLink.length > 0) {
            setContent(
                <div className="BlocVisits">
                    {MatchImg.map((img, i) => {
                        return (
                            <Link to={`/user/${MatchLink[i]}`} key={i}>
                                <span >
                                    <img onLoad={e => { resizeImage(e, 100) }} src={img} id={i}></img>
                                </span>
                            </Link>
                        )
                    })}
                </div>
            )
        }
    }, [MatchImg, MatchLink]);

    return content;
}

export default ProfilMatch;
