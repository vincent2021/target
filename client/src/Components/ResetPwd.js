import React, { useState } from 'react';
import axios from 'axios';

function ResetPwd(props) {

    const [state, setState] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.email) {
            axios({
                method: 'post',
                url: `http://localhost:8000/login/resetpwd?email=${state.email}`,
              }).then(res => {console.log(res.data);})
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setState({
            [name]: value
        });
    }


    let content = (
        <div className="Bloc">
            <form onSubmit={handleSubmit}>
                <h1>RESET PASSWORD</h1>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    className="Submit"
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    )

    return content;

}

export { ResetPwd }