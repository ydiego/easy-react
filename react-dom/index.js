const ReactDom = {
    render
}

function render(vnode, container) {
    console.log(vnode)
    if (vnode === undefined) return 

    if (typeof vnode === 'string') {
        const text = document.createTextNode(vnode)
        return container.appendChild(text)
    }

    const {tag, attrs, childrens} = vnode
    const dom = document.createElement(tag)
    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key]
            setAttribute(dom, key, value)
        })
    }
    childrens.forEach(child => render(child, dom))
    
    return container.appendChild(dom)
}

// 属性设置
function setAttribute(dom, key, value) {
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