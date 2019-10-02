import React, { useState, useEffect } from 'react';
import axios from './Axios';

const Notification = (props) => {
    
    let array =["No Notification :("];

    axios.post('/user/getNotif').then(res => {
        array = res.data;
        setNotifications(array);
    })
        .catch(err => {
            console.log(err);
    })
    
    const [Notifications, setNotifications] = useState([array]);

    useEffect(() => {
        props.loggedIn === true ? setContent(
            <button
                id="Notification"
                onClick={openNotification}
                className="NotifButton"
            >Notification</button>
        ) :
            setContent('')
    }, [props.loggedIn])

    const exitNotification = e => {
        e.preventDefault();
        setContent(
            <button
                id="Notification"
                onClick={openNotification}
                className="NotifButton"
            >Notification</button>
        )
    }

    const openNotification = e => {
        e.preventDefault();
        setContent(
            <div className="BlocPageNotif" id="Notification">
                <div className="BlocNotif">
                    <button className="ExitNotif" onClick={exitNotification}>×</button>
                    <div className="BlockTextNotif">
                        {Notifications.map((text, index) => (
                            <p key={index} >{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const [Content, setContent] = useState(
        <button
            id="Notification"
            onClick={openNotification}
            className="NotifButton"
        >Notification</button>
    );
    const [Load, setLoad] = useState(false);

    return Content;
}

export default Notification