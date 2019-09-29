import React, { useState, useEffect } from 'react';

const ModifyInfo = (props) => {

    const [content, setContent] = useState('');
    const [interest, setInterest] = useState(['cat', 'painting', 'kardashian', 'murder', 'ocean', 'weirdstuff', 'cul', 'fetishism'])

    const exitInfo = e => {
        e.preventDefault();
        setContent('');
        props.setOpen(false);
    }



    useEffect(() => {
        if (props.open === true) {
            setContent(
                < div className='BlocPageFond' >
                    <div className='BlocPageInfo'>
                        <button className="ExitInfo" onClick={exitInfo}>×</button>
                        <div className='BlocTextInfo'>
                            <div className='BlocContentInfo'>
                                <p>Genre :</p>
                                <div>
                                    <input type="radio" id="grmale" name="genre" value="grmale" />
                                    <label htmlFor="grmale">Male</label>
                                </div>
                                <div>
                                    <input type="radio" id="grfemale" name="genre" value="grfemale" />
                                    <label htmlFor="grfemale">Female</label>
                                </div>
                            </div>
                            <div className='BlocContentInfo'>
                                <p>Looking for :</p>
                                <div>
                                    <input type="radio" id="intmale" name="interest" value="intmale" />
                                    <label htmlFor="intmale">Male</label>
                                </div>
                                <div>
                                    <input type="radio" id="intfemale" name="interest" value="intfemale" />
                                    <label htmlFor="intfemale">Female</label>
                                </div>
                                <div>
                                    <input type="radio" id="intboth" name="interest" value="intboth" />
                                    <label htmlFor="intboth">Both</label>
                                </div>
                            </div>
                            <div className='BlocContentInfo'>
                                <p>Interest in :</p>
                                {interest.map((value, index) => (
                                    <div key={index}>
                                        <input type="checkbox" id={index} value="like" value={value} />
                                        <label htmlFor={value}>{value}</label>
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                        <p>Talk about you :</p>
                        <div className='BlocContentInfo'>
                            <textarea className="Description" maxLength="250"></textarea>
                        </div>
                    </div>
                </div >
            );
        }
    }, [props.open]);

    return content;
}

export default ModifyInfo;