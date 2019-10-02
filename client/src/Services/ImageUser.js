import React, { useState, useEffect } from 'react';
import axios from '../Services/Axios';
import { getAge, resizeImage } from '../Services/Fct';

export const convertPic = (pic) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(pic);
        reader.onload = () => res(reader.result);
        reader.onerror = error => rej(error);
    })
}

const ImageContainers = (props) => {

    const SwapPic = e => {
        e.preventDefault();
        document.getElementById('ImageUser').src = e.target.src;
    }

    const [BlocImages, setBlocImages] = useState();
    
    useEffect(() => {
        console.log('useEffect ImageUser...');
        setBlocImages(
            props.Images.map((imgs, index) => (
                <img
                    src={imgs}
                    key={index}
                    alt=""
                    onClick={SwapPic}
                />
            ))
        )
    }, [props.Changes, props.Images])

    let content = (
        <div>
            <span className="BigPic">
                <img
                    onLoad={e => { resizeImage(e, 300) }}
                    id="ImageUser"
                    alt=""
                    src={props.Images[0]}>
                </img>
            </span>
            <div id="BlocImage" className="BlocImage">
                {BlocImages}
            </div>
        </div>
    )

    return content;

}

export default ImageContainers;