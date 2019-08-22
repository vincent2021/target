// https://knowbody.github.io/react-router-docs/api/RouteComponents.html
// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/

import './style/App.css';
import React from "react";
// import ReactDOM from "react-dom";
import AppRouter from "./Services/MasterPage";


function App(){
        return (
            <div>
                <AppRouter/>
            </div>
        );
}

export default App;