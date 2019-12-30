import React from 'react'
import RouterContext from './context'

const Link = (props) => {

  return (
    <RouterContext.Consumer>
      {
        context => {
          return <a onClick={() => {
            context.history.push(props.to)
          }}>{props.children}</a>
        }
      }
    </RouterContext.Consumer>
  )
}

export default Link