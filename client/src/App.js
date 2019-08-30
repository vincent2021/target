import './Assets/App.css';
import React from "react";
// import ReactDOM from "react-dom";
import  AppRouter  from "./Services/MasterPage";

function App(){
<<<<<<< HEAD
    return('Client side');
  }
  
=======
        return (
            <div>
                <AppRouter/>
            </div>
        );
}

>>>>>>> fefe
export default App;

// const useStateWithLocalStorage = localStorageKey => {
//     console.log(localStorage);
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );

//   React.useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };

// const App = () => {
//   const [value, setValue] = useStateWithLocalStorage(
//     'myValueInLocalStorage'
//   );

//   const onChange = event => setValue(event.target.value);

//   return (
//     <div>
//       <h1>Hello React with Local Storage!</h1>

//       <input value={value} type="text" onChange={onChange} />

//       <p>{value}</p>
//     </div>
//   );
// };