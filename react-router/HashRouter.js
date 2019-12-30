import React, {useState, useEffect} from 'react'
import RouterContext from './context'

function getHashName() {
  return window.location.hash.slice(1) || '/'
}

export default function HashRouter (props) {

  const [location, setLocation] = useState(() => {
    const pathname = getHashName()
    return {
      pathname
    }
  })

  const [history] = useState(() => {
    return {
      push(to) {
        window.location.hash = to
      }
    }
  })

  useEffect(() => {
    window.location.hash = window.location.hash || '/'

    function hashChangeListener() {
      const newPathname = getHashName()
      console.log(location)

      if (newPathname !== location.pathname) {
        const newLocation = {
          ...location,
          pathname: newPathname
        }
        setLocation(newLocation)
      }
    }

    window.addEventListener('hashchange', hashChangeListener, false)

    return () => {
      window.removeEventListener('hashchange', hashChangeListener)
    }

  }, [location])


  return (
    <RouterContext.Provider value={{location, history}}>
      {props.children}
    </RouterContext.Provider>
  )
}