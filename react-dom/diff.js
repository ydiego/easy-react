import {
    setAttribute,
    setComponentProps,
    createComponent
} from './index'

export function diff(dom, vnode, container) {
    return diffNode(dom, vnode)
}

function diffNode(dom, vnode) {
    let out = dom
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
        if (dom && dom.nodeType === 3) {
            if (dom.textContent !== vnode) {
                dom.textContent = vnode
            }
        } else {
            out = document.createTextNode(vnode)
            if (dom && dom.parentNode) {
                dom.parentNode.replaceNode(out, dom)
            }
        }
        return out
    }

    if (typeof vnode.tag === 'function') {
        return diffComponent(out, vnode)
    }

    if (!dom) {
        out = document.createElement(vnode.tag)
    }

    if (vnode.childrens && vnode.childrens.length ||
         (out.childNodes && out.childNodes.length)) {
        diffChildren(out, vnode.childrens)
    }

    diffAttribute(out, vnode)

    return out
}

function diffComponent(dom, vnode) {
    let comp = dom
    // reset the props if the component does not change
    if(comp && comp.constructor === vnode.tag) {
        setComponentProps(comp, vnode.attrs)
        dom = comp.base
    } else {
        if (comp) {
            // remove old component
            unmountComponent(comp)
        }
        //create new component, set props and mount
        comp = createComponent(vnode.tag, vnode.attrs)

        setComponentProps(comp, vnode.attrs)

        dom = comp.base
    }
    return dom
}

function unmountComponent(comp) {
    removeNode(comp.base)
}

function removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeNode(dom)
    }
}

function diffAttribute(dom, vnode) {

    const oldAttrs = {}
    const newAttrs = vnode.attrs
    const domAttrs = dom.attributes
    Array.prototype.slice.call(domAttrs).forEach(item => {
        let name = item.name
        if(item.name === 'class') name = 'className'
        oldAttrs[name] = item.value
    });

    for(let key in oldAttrs) {
        if(!(key in newAttrs)) {
            setAttribute(dom, key, undefined)
        }
    }
    
    for(let key in newAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            // if attribute value has change
            setAttribute(dom, key, newAttrs[key])
        }
    }

}

function diffChildren(dom, vChildren) {
    const domChildren = dom.childNodes
    const children = []
    const keyed = {} // todo

    if (domChildren.length) {
        for(let i = 0;i<domChildren.length;i++) {
            children.push(domChildren[i])
        }
    }

    if(vChildren && vChildren.length) {
        let min = 0
        let childrenLen = children.length
        Array.prototype.slice.call(vChildren).forEach((vchild, i) => {
            const key = vchild.key
            let child
            if (key) {
                // todo
            } else if(childrenLen > min){

                for(let j = min; j< childrenLen;j ++) {
                    let c = children[j]
                    if(c) {
                        child = c
                        children[j] = undefined
                        if(j === childrenLen - 1) childrenLen --
                        if(j === min) min++
                        break
                    }
                }

            }

            child = diffNode(child, vchild)

            const f = domChildren[i]

            if (child && child !== dom && child !== f) {
                if (!f) {
                    dom.appendChild(child)
                } else if( child === f.nextSibling) {
                    removeNode(f)
                } else {
                    dom.insertBefore(child, f)
                }
            }

        })
    }


} 