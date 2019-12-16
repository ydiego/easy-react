import React from './react/index'
import ReactDom from './react-dom'

// function App({title}){
//    return (
//         <div className="title" style={{marginTop: '10rem'}}>
//             <h2>{title}</h2>
//             <h3>body
//                 <div>content</div>
//             </h3>
//         </div>
//     )
// }
// console.log(<App title='123'/>);

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="title" style={{marginTop: '10rem'}}>
                <h2>{this.props.title}</h2>
                <h3>body
                    <div>content</div>
                </h3>
            </div>
        )
    }
}


ReactDom.render(<App title='react'/>, document.getElementById('app'))
