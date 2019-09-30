import React, { useState, useEffect } from 'react';

const Notification = (props) => {

    const [Notifications, setNotifications] = useState(['like de machin', 'comment de machine', 'block by trouduc', 'comment de machine']);

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