// npm install axios --save  >>> for http request
// https://knowbody.github.io/react-router-docs/api/RouteComponents.html
// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/

import './style/App.css';
import React from "react";

// import ReactDOM from "react-dom";
import  AppRouter  from "./MasterPage";


const useStateWithLocalStorage = localStorageKey => {
    console.log(localStorage);
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};


// export default function App(){
//         return (
//             <div>
//                 <AppRouter/>
//             </div>
//         );
// }

export default App;