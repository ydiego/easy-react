import React from 'react'
import RouterContext from './context'
import {pathToRegexp} from 'path-to-regexp'

const Switch = (props) => {
  return (
    <RouterContext.Consumer>
      {
        context => {
          let pathname = context.location.pathname
          let children = props.children

          for(let i = 0, len = children.length; i < len; i++) {
            let child = children[i]
            let {path = '', exact = false} = child.props
            let reg = pathToRegexp(path, [], {end: exact})
            // console.log(pathname, reg.test(pathname))
            if (reg.test(pathname)) {
              return child
            }
          }
          return null
        }
      }
    </RouterContext.Consumer>
  )
}

export default Switch