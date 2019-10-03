/* eslint-disable */
import React, { useState, useEffect } from 'react';

const ModifyInfo = (props) => {

    const [content, setContent] = useState('');
    const interest = ['cat', 'painting', 'kardashian', 'murder', 'ocean', 'weirdstuff', 'cul', 'fetishism'];

    const exitInfo = e => {
        e.preventDefault();
        setContent('');
        props.setOpenInfo(false);
    }


    const handleSubmit = async e => {
        e.preventDefault();
        let genre = document.getElementsByName('gender');
        let target = document.getElementsByName('target');
        let interest = document.getElementsByName('interest');
        let text = document.getElementById('TalkAboutYou');
        let list = [];

        genre.forEach(data => {
            if (data.checked)
                genre = data.value;
            // props.setInfo({ ...props.Info, genre: data.value });
        })
        target.forEach(data => {
            if (data.checked)
                target = data.value;
            // props.setInfo({ ...props.Info, target: data.value })
        })
        interest.forEach(data => {
            if (data.checked)
                list.push(data.value);
        })
        if (list.length < 2)
            alert('Check at least two interests');
        else {
            props.setInfo({ gender: genre, target: target, interest: list, text: text.value })
            props.setOpenInfo(false);
            setContent('');
        }
    }

    useEffect(() => {
        if (props.OpenInfo === true) {
            setContent(
                < div className='BlocPageFond' >
                    <div className='BlocPageInfo'>
                        <form onSubmit={handleSubmit}>
                            <button className="ExitInfo" onClick={exitInfo}>×</button>
                            <div className='BlocTextInfo'>
                                <div className='BlocContentInfo'>
                                    <p>Genre :</p>
                                    <div>
                                        <input type="radio" id="grmale" name="gender" value="male" required />
                                        <label htmlFor="grmale">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="grfemale" name="gender" value="female" />
                                        <label htmlFor="grfemale">Female</label>
                                    </div>

                                    <p>Looking for :</p>
                                    <div>
                                        <input type="radio" id="intmale" name="target" value="male" required />
                                        <label htmlFor="intmale">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="intfemale" name="target" value="female" />
                                        <label htmlFor="intfemale">Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="intboth" name="target" value="both" />
                                        <label htmlFor="intboth">Both</label>
                                    </div>
                                </div>
                                <div className='BlocContentInfo'>
                                    <p>Interest in :</p>
                                    {interest.map((value, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={index} value="like" name='interest' value={`#${value}`} />
                                            <label htmlFor={value}>{value}</label>
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                            <textarea onClick={e => { e.target.placeholder = '' }} id='TalkAboutYou' className="Description" maxLength="250" placeholder="Talk about you :" required></textarea>
                            <input
                                className="SubInfo"
                                type="submit"
                                value="Submit"
                            />
                        </form>
                    </div>
                </div >
            );
        }
    }, [props.OpenInfo]);

    return content;
}

export default ModifyInfo;