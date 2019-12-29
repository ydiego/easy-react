import React from 'react'

const ReduxContext = React.createContext(null)

export class Provider extends React.Component {
    constructor(props) {
        super(props)
        const {store} = this.props
        this.state = {store}
    }
    
    render() {
        return (
            <ReduxContext.Provider value={{store: this.state.store}}>
                {this.props.children}
            </ReduxContext.Provider>
        )
    }
}

function subscribe(store, setProps, dispatch, mapStateToProps, mapDispatchToProps) {
    store.subscribe(() => {
        const newStateProps = mapStateToProps(store.getState())
        const newEventProps = mapDispatchToProps(dispatch)
        const newMergedProps = Object.assign({}, newStateProps, newEventProps)
        setProps(newMergedProps)
    }) 
}

export function connect(mapStateToProps, mapDispatchToProps) {
    return ConnectComponent => {
        return function WrapComponent() {
            const {store} = React.useContext(ReduxContext)
            const dispatch = action => {
                store.dispatch(action)
            }

            const stateProps = mapStateToProps(store.getState())
            const eventProps = mapDispatchToProps(dispatch)
            const mergedProps = Object.assign({}, stateProps, eventProps)

            const [props, setProps] = React.useState(mergedProps)
            // todo useMemo
            if(!subscribe.called) {
                subscribe(
                    store,
                    setProps,
                    dispatch,
                    mapStateToProps,
                    mapDispatchToProps
                )
                subscribe.called = true
            }
            
            return <ConnectComponent {...props}></ConnectComponent>
        }
    }
}