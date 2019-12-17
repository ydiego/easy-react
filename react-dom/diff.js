import {
    setAttribute,
    setComponentProps,
    createComponent
} from './index'

export function diff(dom, vnode, container) {
    const ret = diffNode(dom, vnode)
    console.log(ret);
    
    if (container) {
        container.appendChild(ret)
    }
    return ret
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

    // 非dom节点
    if (!dom) {
        out = document.createElement(vnode.tag)
    }

    // 比较子节点
    if (vnode.childrens && vnode.childrens.length ||
         (out.childNodes && out.childNodes.length)) {
        diffChildren(out, vnode.childrens)
    }

    diffAttribute(out, vnode)

    return out
}

function diffComponent(dom, vnode) {
    let comp = dom
    // 如果组件没有变化 重新设置props
    if(comp && comp.constructor === vnode.tag) {
        setComponentProps(comp, vnode.attrs)
        dom = comp.base
    } else {
        if (comp) {
            // 移除旧组件
            unmountComponent(comp)
            comp = null
        }
        // 创建新组件  设置属性 挂载
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

// 对比属性
function diffAttribute(dom, vnode) {
    // 记录原有属性
    const oldAttrs = {}
    const newAttrs = vnode.attrs
    // dom为原有节点对象 vnode为虚拟dom
    const domAttrs = dom.attributes
    Array.prototype.slice.call(domAttrs).forEach(item => {
        oldAttrs[item.name] = item.value
    });
   
    // 对比原有属性跟新属性 移除不在新属性中的属性
    for(let key in oldAttrs) {
        if(!(key in newAttrs)) {
            setAttribute(dom, key, undefined)
        }
    }
    
    for(let key in newAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            // 属性值发生变化
            setAttribute(dom, key, newAttrs[key])
        }
    }

}

function diffChildren(dom, vChildren) {
    const domChildren = dom.childNodes
    const children = []
    const keyed = {} // 节点是否带key

    if (domChildren.length) {
        // return domChildren
    }
    if(vChildren && vChildren.length) {
        let min = 0
        let childrenLen = children.length
        Array.prototype.slice.call(vChildren).forEach((vchild, i) => {
            const key = vchild.key
            let child
            if (key) {
                if(keyed[key]) {
                    child = keyed[key]
                    keyed[key] = undefined
                }
            } else if(childrenLen > min){
                // 如果没有key 优先查找类型相同的节点
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
                    console.log(22);
                    console.log(child);
                    
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