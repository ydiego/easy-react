/**
 * @author ydiego
 * @date on 2019/12/18
 * @org
 * @email
 */
import {renderComponent} from "../react-dom";

const queue = []
const componentRenderQueue = []

function defer(fn) {
    if(Promise) {
        Promise.resolve().then(fn)
    } else {
        setTimeout(() => {
            fn()
        }, 0)
    }
}

export function setStateQueue(stateChange, component) {

    if(queue.length === 0) {
        defer(flush)
    }

    queue.push({
        stateChange,
        component
    })

    let componentExist = componentRenderQueue.some(item => {
        return item === component
    })

    if(!componentExist) {
        componentRenderQueue.push(component)
    }

}

function flush() {
    let item = queue.shift(),
        comp = componentRenderQueue.shift()


    /**
     ...
     this.state = {
         num : 0
     }
     ... 
     // render result num is 10
     for(let i = 0; i < 10; i++) {
         this.steState((prevState) => {
            return {
                num: prevState + 1
            }
         })
     }

     // render result num is 1
     for(let i = 0; i < 10; i++) {
         this.steState(() => {
            return {
                num: this.state.num + 1
            }
         })
     }
     */
    const updater = {}

    while(item) {
        const {stateChange, component} = item
        const componentName = component.constructor.name

        if(!component.prevState) {
            component.prevState = Object.assign({}, component.state)
        }

        const newState = typeof stateChange === 'function' ? stateChange(component.prevState, component.props) : stateChange

        updater[componentName] = {
            component,
            prevState: newState
        }

        component.prevState = newState

        // component.prevState = component.state
        item = queue.shift()

    }

    for(let u in updater) {
        Object.assign(updater[u].component.state, updater[u].prevState)
    }

    while (comp) {
        renderComponent(comp)
        comp = componentRenderQueue.shift()
    }
}