import React from 'react'
import RouterContext from './context'

const Redirect = (props) => {
  return (
    <RouterContext.Consumer>
      {
        context => {
          console.log(context)
          context.history.push(props.to)
          return null
        }
      }
    </RouterContext.Consumer>
  )
}

export default Redirect