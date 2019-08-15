// GET DATA FROM DB 

// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             character: {}
//         }
//     }
    
//     componentDidMount() {
    
//         const request = {
//             method: 'POST',
//             headers:{
//               'Content-Type': 'application/json'
//             },
//         };
          
//         fetch('http://localhost:8000/login', request)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 this.setState({
//                     character: data
//                 })
//             })

//     }
    
//     render() {
//         return (
//             <div>
//                 <p className="test">{this.state.character.name}</p>
//             </div>
//         )
//     }
}
