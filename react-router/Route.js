import React from 'react'
import RouterContext from './context'
import {pathToRegexp} from 'path-to-regexp'

export default function Route (props) {
  const Comp = props.component

  return (
    <RouterContext.Consumer>
      {
        context => {
          const pathname = context.location.pathname

          const {path, exact = false} = props

          let keys = []

          let reg = pathToRegexp(path, keys, {end: exact})

          keys = keys.map(item => item.name)

          const result = pathname.match(reg)

          const [url, ...values] = result || []

          const match = {
            params: keys.reduce((o, c, i) => {
              o[c] = values[i]
              return o
            }, {})
          }

          if(result) return <Comp {...context} match={match}/>

          return null

        }
      }
    </RouterContext.Consumer>
  )

}