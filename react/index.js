import Component from './component'
const React = {
    createElement,
    Component
}

function createElement(tag, attrs, ...childrens) {
    let key = null
    if(attrs && attrs.key) key = attrs.key

    return {
        tag,
        attrs,
        childrens,
        key: key
    }
}

export default React