import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter, Route, Link, Redirect, Switch} from './react-router'

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
            num: 0,
            style: {marginTop: '10rem'}
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
        for(let i = 0; i < 10; i++) {
            // render num = 1
            // this.setState({
            //     num: this.state.num + 1
            // })
            // render num = 1
            this.setState(() => {
               return {
                    num: this.state.num + 1
                }
            })
            // render num = 10
            // this.setState((prevState) => {
            //     return {
            //         num: prevState.num + 1
            //     }
            // })
            console.log(this.state.num)
        }
    }

    handleClick (){
        this.setState({
            num: this.state.num + 1,
            style: {
                marginLeft: '1rem'
            }
        })
    }
    render() {
        const {title, num, style} = this.state
        return (
            <div className={title} style={style}>
                <div className='h2'>{title}, {num}</div>
                <h3>body
                    <div>content</div>
                    <button onClick={this.handleClick.bind(this)}>click</button>
                </h3>
            </div>
        )
    }
}

function Home(props) {
  console.log(props)
  return <div>home</div>
}
function Page1() {
    return <div>page1</div>
}
function Page2() {
    return <div>page2</div>
}


class Root extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <HashRouter>
                <Link to={'/home'}>home </Link>
                <Link to={'/page1'}>page1 </Link>
                <Link to={'/page2'}>page2 </Link>
                <Switch>
                  <Route path={'/home'} component={Home} exact={true} />
                  <Route path={'/home/:id'} component={Home} exact={true} />
                  <Route path={'/page1'} component={Page1} />
                  <Route path={'/page2'} component={Page2} />
                  <Redirect to={'/home'}  />
                </Switch>
            </HashRouter>
        )
    }
}


// ReactDom.render(el, document.getElementById('app'))
// ReactDom.render(<App title='easy react' />, document.getElementById('app'))
ReactDom.render(<Root title='easy react' />, document.getElementById('app'))
