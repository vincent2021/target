import React, { useState } from 'react';

const Notification = (props) => {

    const [Notifications, setNotifications] = useState(['like de machin', 'comment de machine', 'block by trouduc']);

    const exitNotification = e => {
        e.preventDefault();
        setContent(
            <button
                onClick={openNotification}
                className="NotifButton"
            >Notification</button>
        )
    }

    const openNotification = e => {
        e.preventDefault();
        setContent(
            <div className="BlocPageNotif">
                <div className="BlocNotif">
                    <button className="ExitNotif" onClick={exitNotification}>×</button>
                    <div className="BlockTextNotif">
                        {Notifications.map(text => {
                            return (<p>{text}</p>)
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const [Content, setContent] = useState(
        <button
            onClick={openNotification}
            className="NotifButton"
        >Notification</button>
    );
    const [Load, setLoad] = useState(false);

    return Content;
}

export default Notification