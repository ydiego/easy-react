import Component from "../react/component"
import {diff} from './diff'

const ReactDom = {
    render
}

function render(vnode, container) {
    // return diff(dom, vnode, container)
    return container.appendChild(_render(vnode))
}

export function createComponent(comp, props) {
    let inst
    if (comp.prototype && comp.prototype.render) {
        // create class component instance and return
        inst = new comp(props)
    } else {
        // transform functional component to class component
        
        inst = new Component(props)
        inst.constructor = comp
        inst.render = function() {
            return this.constructor(props)
        }
    }

    return inst
}

export function setComponentProps(comp, props) {
    if(!comp.base) {
        // life cycle componentWillMount
        if (comp.componentWillMount) comp.componentWillMount()
    } else if(comp.componentWillReceiveProps){
         // life cycle componentWillReceiveProps
        comp.componentWillReceiveProps() 
    }
    comp.props = props
    renderComponent(comp)
}

export function renderComponent(comp) {
    let base
    const renderer = comp.render() // jsx
    // base = _render(renderer)
    base = diff(comp.base, renderer)
    if (comp.base) {
        // life cycle componentWillUpdate
        if (comp.componentWillUpdate) {
            comp.componentWillUpdate()
        }
        // life cycle componentDidUpdate
        if (comp.componentDidUpdate) {
            comp.componentDidUpdate()
        }

        // replace node
        // if(comp.base.parentNode) {
        //     comp.base.parentNode.replaceChild(base, comp.base)
        // }

    } else if (comp.componentDidMount) {
        comp.componentDidMount()
    }
    comp.base = base
}

function _render(vnode) {
    if (vnode === undefined 
        || vnode === null 
        || typeof vnode === 'boolean'
    ) {
        vnode = ''
    }

    if (typeof vnode === 'number') {
        vnode = String(vnode)
    }

    if (typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }

    if (typeof vnode.tag === 'function') {
        const comp = createComponent(vnode.tag, vnode.attrs)
       
        setComponentProps(comp, vnode.attrs)
        return comp.base
    }

    const {tag, attrs, childrens} = vnode
    const dom = document.createElement(tag)
    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key]
            setAttribute(dom, key, value)
        })
    }
    childrens && childrens.forEach(child => render(child, dom))
    
    return dom
}

export function setAttribute(dom, key, value) {
    if( key === 'className') {
        key = 'class'
    }

    if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom[key] = value || ''
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            dom.removeAttribute(key)
            for (let k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px'
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        if(key in dom) {
            dom[key] = value || ''
        }
        if(value) {
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }
    }
}

export default ReactDom