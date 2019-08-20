// npm install axios --save  >>> for http request
// https://knowbody.github.io/react-router-docs/api/RouteComponents.html
// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/

import './style/App.css';
import React from "react";
// import ReactDOM from "react-dom";
import  AppRouter  from "./MasterPage";

export default function App(){
        return (
            <div>
                <AppRouter/>
            </div>
        );
}


// import axios from 'axios';

// class App extends Component {
//   state = {
//     name: '',
//   }

//   handleChange = event => {
//     this.setState({ name: event.target.value });
//   }

//   handleSubmit = event => {
//     event.preventDefault();

//     const user = {
//       name: this.state.name
//     };

//     axios.post('http://localhost:8000/newuser', { user })
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//       })
//       .catch(err => {
//           console.log(err);
//       })
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Person Name:
//             <input type="text" name="name" onChange={this.handleChange} />
//           </label>
//           <button type="submit">Add</button>
//         </form>
//       </div>
//     )
//   }
// }

