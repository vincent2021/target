import React from "react";
import AppRouter from './Services/MasterPage'
import './Assets/App.css';

const App = () => {
    const content = (
        <AppRouter />
    )
    return content;

}

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