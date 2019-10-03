/* eslint-disable */
import React, { useState, useEffect } from "react";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';


const MatchSlider = withStyles({
    root: {
        color: '#000',
        height: 1,
        padding: '13px 0',
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#ddd',
        border: '1px solid currentColor',
        marginTop: -9,
        marginLeft: -8,
        boxShadow: '#ebebeb 0px 2px 2px',
        '&:focus,&:hover,&$active': {
            boxShadow: 'none',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        color: '#000',
        height: 1,
    },
    rail: {
        opacity: 1,
        height: 1,
    },
})(Slider);


const MatchSearch = (props) => {

    const [content, setContent] = useState(<div>Waiting for slider</div>);

    useEffect(() => {
        setContent(
            <div id="SliderMatch" className="sliderComponent">
                <div>Age : {props.Age[0]}-{props.Age[1]}</div>
                <MatchSlider
                    id="Age"
                    aria-label="Age"
                    onChange={(e, newValue) => { props.setAge(newValue) }}
                    onClickCapture={props.handleAge}
                    defaultValue={props.Age}
                />
                <div>Score : {props.Score[0]}-{props.Score[1]}</div>
                <MatchSlider
                    aria-label="Score"
                    onChange={(e, newValue) => {props.setScore(newValue) }}
                    onClickCapture={props.handleScore}
                    defaultValue={props.Score}
                />
                <div>Localistation : {props.Localisation}km</div>
                <MatchSlider
                    aria-label="Localisation"
                    onChange={(e, newValue) => {props.setLocalisation(newValue) }}
                    onClickCapture={props.handleLocalisation}
                    defaultValue={props.Localisation}
                />
                {/* <div>Interest : {props.Interest}%</div>
                <MatchSlider
                    aria-label="Interest"
                    onChange={(e, newValue) => {props.setInterest(newValue) }}
                    onClickCapture={props.handleInterest}
                    defaultValue={props.Interest}
                /> */}
            </div>
        );
    }, [props])

    return content;
}

export default MatchSearch