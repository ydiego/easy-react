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

const el = (
    <div className="title" style={{marginTop: '10rem'}}>
        <h2>title</h2>
        <h3>body
            <div>content</div>
        </h3>
    </div>
)

// console.log(<App title='123'/>);

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title: 'title',
            num: 1
        }
    }
    componentWillReceiveProps(props) {
        console.log('receive props:' + props)
    }
    componentWillMount() {
        console.log('will mount')
    }
    componentWillUpdate() {
        console.log('will mount')
    }
    componentDidUpdate() {
        console.log('did update')
    }
    componentDidMount() {
        console.log('did mount')
    }

    handleClick (){
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        return (
            <div className="title" style={{marginTop: '10rem'}}>
                <div key={1} className='h2'>{this.state.title}, {this.state.num}</div>
                <h3>body
                    <div>content</div>
                    <button onClick={this.handleClick.bind(this)}>click</button>
                </h3>
            </div>
        )
    }
}


// ReactDom.render(el, document.getElementById('app'))
ReactDom.render(<App title='easy react' />, document.getElementById('app'))
