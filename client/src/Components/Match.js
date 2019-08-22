import React, { useState, useEffect } from "react";
import axios from 'axios';

class Match extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.post('http://localhost:8000/login')
            .then(src => {
                this.setState({
                    loading: false,
                    character: src.data
                })
            })
    }

    render() {
        const text = this.state.loading ? "loading..." : this.state.character;
        console.log(text);
        return (
            <div>
                <p>{text.name}</p>
            </div>
        )
    }
}



export default Match;